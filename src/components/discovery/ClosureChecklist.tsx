import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ListChecks, Loader2, Sparkles } from "lucide-react";
import { callAiAssistant } from "@/integrations/ai/client";
import { useToast } from "@/hooks/use-toast";

interface ClosureChecklistProps {
  accountId?: string;
  institution: string;
  checklist?: string[] | null;
  onGenerated?: () => void;
}

const ClosureChecklist = ({ accountId, institution, checklist, onGenerated }: ClosureChecklistProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [localChecklist, setLocalChecklist] = useState<string[] | null | undefined>(checklist);

  if (!accountId) return null;

  const handleOpen = (next: boolean) => {
    setOpen(next);
    if (next) setLocalChecklist(checklist);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const result = await callAiAssistant<{ checklist: string[] }>("closure-checklist", { accountId });
      setLocalChecklist(result.checklist);
      onGenerated?.();
    } catch (error) {
      toast({
        title: "Couldn't generate checklist",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs h-7 px-2"
        onClick={() => handleOpen(true)}
      >
        <ListChecks className="h-3 w-3 mr-1" />
        Closure checklist
      </Button>

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Closing your {institution} account
            </DialogTitle>
            <DialogDescription>
              AI-generated guidance based on this account's type and status — confirm specifics with
              the institution directly.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            {localChecklist && localChecklist.length > 0 ? (
              <ol className="space-y-2 text-sm text-foreground list-none">
                {localChecklist.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                No checklist generated yet for this account.
              </p>
            )}
          </div>

          <Button onClick={handleGenerate} disabled={generating} variant="outline" className="w-full">
            {generating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {localChecklist && localChecklist.length > 0 ? "Regenerate" : "Generate checklist"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClosureChecklist;
