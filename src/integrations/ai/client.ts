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
    throw new Error(error.message ?? "AI request failed");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as T;
};
