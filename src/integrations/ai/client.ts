import { supabase } from "@/integrations/supabase/client";

// Thin wrapper around the ai-assistant Edge Function. Every AI feature in the
// app (document analysis, closure checklists, the guidance chat) goes
// through this one function — see supabase/functions/ai-assistant/index.ts.
export const callAiAssistant = async <T = unknown>(
  action: "analyze-document" | "closure-checklist" | "chat",
  payload: Record<string, unknown>
): Promise<T> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.functions.invoke("ai-assistant", {
    body: { action, ...payload },
    headers: session ? { Authorization: `Bearer ${session.access_token}` } : undefined,
  });

  if (error) {
    // supabase-js collapses non-2xx responses into a generic
    // "Edge Function returned a non-2xx status code" message and puts the
    // actual JSON body (our { error: "..." } payload) on error.context —
    // read that so failures are actually debuggable instead of opaque.
    const context = (error as { context?: Response }).context;
    if (context) {
      try {
        const body = await context.clone().json();
        throw new Error(body?.error ?? error.message ?? "AI request failed");
      } catch {
        // Body wasn't JSON — fall through to the generic message below.
      }
    }
    throw new Error(error.message ?? "AI request failed");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as T;
};
