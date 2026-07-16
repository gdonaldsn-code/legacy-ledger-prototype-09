// Supabase Edge Function: ai-assistant
//
// Single function fronting three AI features, routed by `action` in the
// request body. Keeping them in one function means one secret and one
// deploy for all of it:
//
//   npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   npx supabase functions deploy ai-assistant
//
// Actions:
//   - analyze-document:   reads an uploaded executor document (death cert /
//                         Letters Testamentary) and returns a plain-language
//                         summary of what it appears to be. This is advisory
//                         only — it never changes verification_status; a
//                         human still reviews and approves/rejects.
//   - closure-checklist:  generates a generic step-by-step account-closure
//                         checklist for one discovered account, cached on
//                         the row so we don't re-call the model every view.
//   - chat:               a guidance assistant grounded in the caller's own
//                         profile + discovered accounts (fetched server-side
//                         via their own auth token, never trusted from the
//                         client) to answer "what do I do next" questions.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ANTHROPIC_MODEL = "claude-sonnet-5";

const DISCLAIMER =
  "This is general guidance, not legal advice — requirements vary by state and institution. Confirm specifics with the institution or an estate attorney.";

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function mediaTypeFor(path: string): { block: "image" | "document"; mediaType: string } {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return { block: "document", mediaType: "application/pdf" };
  if (ext === "png") return { block: "image", mediaType: "image/png" };
  if (ext === "webp") return { block: "image", mediaType: "image/webp" };
  return { block: "image", mediaType: "image/jpeg" };
}

async function callClaude(anthropicKey: string, body: Record<string, unknown>) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Claude API error (${response.status}): ${text}`);
  }

  const json = await response.json();
  const textBlock = json.content?.find((block: { type: string }) => block.type === "text");
  return textBlock?.text ?? "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) {
      throw new Error("ANTHROPIC_API_KEY is not configured for this Supabase project.");
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // User-scoped client: every query through this respects RLS as the
    // calling user, so we never need to manually check row ownership.
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const action = body.action as string;

    if (action === "analyze-document") {
      const { bucket, path, documentContext } = body as {
        bucket: string;
        path: string;
        documentContext: "death_certificate" | "letters_testamentary";
      };

      if (bucket !== "executor-documents" || !path.startsWith(`${user.id}/`)) {
        return new Response(JSON.stringify({ error: "Invalid document reference" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Service-role client only to read the private file the user just
      // uploaded (already authorization-checked above via the path prefix).
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const { data: fileBlob, error: downloadError } = await supabaseAdmin.storage
        .from(bucket)
        .download(path);

      if (downloadError || !fileBlob) {
        throw new Error(downloadError?.message ?? "Could not read uploaded document");
      }

      const { block, mediaType } = mediaTypeFor(path);
      const base64 = arrayBufferToBase64(await fileBlob.arrayBuffer());

      const docLabel =
        documentContext === "death_certificate" ? "a death certificate" : "Letters Testamentary or Letters of Administration";

      const reply = await callClaude(anthropicKey, {
        model: ANTHROPIC_MODEL,
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: [
              block === "document"
                ? { type: "document", source: { type: "base64", media_type: mediaType, data: base64 } }
                : { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              {
                type: "text",
                text: `This was uploaded as ${docLabel}. In 2-3 short sentences: (1) say whether it plausibly looks like that document type, (2) note any name/date/issuing authority visible on it, and (3) flag anything that looks missing, illegible, or wrong (e.g. wrong document type, no visible seal, cropped). Be concise and plain-language — this is shown to someone who just lost a family member. Do not invent details you can't actually see.`,
              },
            ],
          },
        ],
      });

      return new Response(JSON.stringify({ summary: reply }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "closure-checklist") {
      const { accountId } = body as { accountId: string };

      const { data: account, error: accountError } = await supabaseUser
        .from("discovered_accounts")
        .select("*")
        .eq("id", accountId)
        .single();

      if (accountError || !account) {
        return new Response(JSON.stringify({ error: "Account not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const reply = await callClaude(anthropicKey, {
        model: ANTHROPIC_MODEL,
        max_tokens: 600,
        messages: [
          {
            role: "user",
            content: `Someone acting as an executor is trying to close or transfer this account:
- Institution: ${account.institution}
- Account type: ${account.account_type}
- Status: ${account.status}
- Beneficiary on file: ${account.beneficiary_status}

Give a short numbered checklist (5-7 steps max) of what they'll typically need to do to close or transfer this specific type of account as an executor. Be concrete about likely required documents (e.g. death certificate, Letters Testamentary, account statements). End with one line noting this varies by institution/state and to confirm directly. Return ONLY the numbered list and that closing line, no preamble.`,
          },
        ],
      });

      const steps = reply
        .split("\n")
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0);

      await supabaseUser
        .from("discovered_accounts")
        .update({ closure_checklist: steps, closure_checklist_generated_at: new Date().toISOString() })
        .eq("id", accountId);

      return new Response(JSON.stringify({ checklist: steps }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "chat") {
      const { message, history } = body as {
        message: string;
        history: Array<{ role: "user" | "assistant"; content: string }>;
      };

      const [{ data: profile }, { data: accounts }] = await Promise.all([
        supabaseUser.from("profiles").select("*").eq("id", user.id).single(),
        supabaseUser.from("discovered_accounts").select("*").eq("user_id", user.id),
      ]);

      const accountsSummary = (accounts ?? [])
        .map(
          (a) =>
            `- ${a.institution} (${a.account_type}), status: ${a.status}, beneficiary: ${a.beneficiary_status}`
        )
        .join("\n");

      const systemPrompt = `You are the guidance assistant inside Legacy Ledger, a product that helps people either (a) plan their own digital estate ahead of time, or (b) find and close a deceased loved one's financial accounts as executor. You are talking to a real user, possibly grieving. Be warm, concise, and practical — this is not the place for hype or long preambles. You are not a lawyer; for anything jurisdiction-specific, say so and suggest confirming with an attorney or the institution directly. Do not fabricate account details beyond what's given below.

User's situation:
- Path: ${profile?.intent ?? "unspecified"}
- Executor verification status: ${profile?.verification_status ?? "not_started"}
- Discovered accounts:
${accountsSummary || "(none yet)"}`;

      const reply = await callClaude(anthropicKey, {
        model: ANTHROPIC_MODEL,
        max_tokens: 500,
        system: systemPrompt,
        messages: [...(history ?? []), { role: "user", content: message }],
      });

      return new Response(JSON.stringify({ reply, disclaimer: DISCLAIMER }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
