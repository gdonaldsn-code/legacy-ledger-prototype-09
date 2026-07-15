import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type BeneficiaryStatus = "confirmed" | "needs_review" | "missing" | "unknown";

interface BeneficiaryBadgeProps {
  accountId?: string;
  institution: string;
  status?: BeneficiaryStatus;
  names?: string | null;
  onUpdated?: () => void;
}

const statusConfig: Record<BeneficiaryStatus, { label: string; icon: typeof CheckCircle2; variant: "default" | "secondary" | "destructive" }> = {
  confirmed: { label: "Beneficiary confirmed", icon: CheckCircle2, variant: "default" },
  needs_review: { label: "Needs review", icon: AlertTriangle, variant: "secondary" },
  missing: { label: "No beneficiary on file", icon: XCircle, variant: "destructive" },
  unknown: { label: "Not yet reviewed", icon: HelpCircle, variant: "secondary" },
};

const BeneficiaryBadge = ({ accountId, institution, status = "unknown", names, onUpdated }: BeneficiaryBadgeProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draftStatus, setDraftStatus] = useState<BeneficiaryStatus>(status);
  const [draftNames, setDraftNames] = useState(names ?? "");

  const config = statusConfig[status] ?? statusConfig.unknown;
  const Icon = config.icon;

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setDraftStatus(status);
      setDraftNames(names ?? "");
    }
  };

  const handleSave = async () => {
    if (!accountId) return;
    setSaving(true);
    const { error } = await supabase
      .from("discovered_accounts")
      .update({
        beneficiary_status: draftStatus,
        beneficiary_names: draftStatus === "missing" ? null : draftNames || null,
        beneficiary_last_reviewed: new Date().toISOString().slice(0, 10),
      })
      .eq("id", accountId);
    setSaving(false);

    if (error) {
      toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Beneficiary info updated" });
    setOpen(false);
    onUpdated?.();
  };

  return (
    <>
      <Badge
        variant={config.variant}
        className="text-xs cursor-pointer"
        onClick={() => accountId && handleOpenChange(true)}
      >
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Beneficiary on {institution}</DialogTitle>
            <DialogDescription>
              Accounts with a valid beneficiary (or transfer-on-death designation) typically pass
              directly to that person and skip probate. Accounts without one usually don't.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <RadioGroup value={draftStatus} onValueChange={(v) => setDraftStatus(v as BeneficiaryStatus)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confirmed" id="ben-confirmed" />
                <Label htmlFor="ben-confirmed">Confirmed — beneficiary is on file and current</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="needs_review" id="ben-review" />
                <Label htmlFor="ben-review">Needs review — set, but I'm not sure it's current</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="missing" id="ben-missing" />
                <Label htmlFor="ben-missing">Missing — no beneficiary on file</Label>
              </div>
            </RadioGroup>

            {draftStatus !== "missing" && (
              <div className="space-y-2">
                <Label htmlFor="ben-names">Beneficiary name(s)</Label>
                <Input
                  id="ben-names"
                  placeholder="e.g. Jane Doe (spouse)"
                  value={draftNames}
                  onChange={(e) => setDraftNames(e.target.value)}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BeneficiaryBadge;
