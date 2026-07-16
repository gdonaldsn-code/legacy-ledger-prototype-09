import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { MessageCircle, Send, Loader2, Sparkles } from "lucide-react";
import { callAiAssistant } from "@/integrations/ai/client";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "What should I do first?",
  "Which of my accounts need attention?",
  "How does executor verification work?",
];

const AIGuidanceChat = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const result = await callAiAssistant<{ reply: string; disclaimer: string }>("chat", {
        message: text,
        history: messages,
      });
      setMessages([...nextMessages, { role: "assistant", content: result.reply }]);
    } catch (error) {
      toast({
        title: "Couldn't reach the assistant",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
      setMessages(messages);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 rounded-full h-14 w-14 shadow-elevated p-0"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex flex-col p-0 w-full sm:max-w-md">
          <SheetHeader className="p-6 pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Guidance Assistant
            </SheetTitle>
            <SheetDescription>
              Ask about your accounts, next steps, or how Legacy Ledger works. General guidance, not
              legal advice.
            </SheetDescription>
          </SheetHeader>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6">
            <div className="space-y-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Try asking:</p>
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="block w-full text-left text-sm p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm rounded-lg p-3 max-w-[85%] whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {sending && (
                <div className="text-sm rounded-lg p-3 bg-muted text-muted-foreground w-fit flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Thinking...
                </div>
              )}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="p-4 border-t border-border flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={sending}
            />
            <Button type="submit" size="icon" disabled={sending || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AIGuidanceChat;
