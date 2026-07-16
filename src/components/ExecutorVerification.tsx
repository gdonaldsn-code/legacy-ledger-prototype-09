import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Loader2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

const fileExtension = (file: File) => file.name.split(".").pop() || "pdf";

const statusBadge = {
  not_started: { label: "Not started", icon: Clock, variant: "secondary" as const },
  pending_review: { label: "Pending review", icon: Clock, variant: "secondary" as const },
  verified: { label: "Verified", icon: CheckCircle2, variant: "default" as const },
  rejected: { label: "Needs attention", icon: XCircle, variant: "destructive" as const },
};

const ExecutorVerification = () => {
  const { user } = useAuth();
  const { profile, loading, refetch } = useProfile();
  const { toast } = useToast();
  const [deathCert, setDeathCert] = useState<File | null>(null);
  const [letters, setLetters] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading || !profile) return null;

  // Only relevant to the executor / "find accounts" path.
  if (profile.intent !== "discovery") return null;

  // Nothing left to do once verified.
  if (profile.verification_status === "verified") {
    return (
      <Card className="border-success-green/30 bg-success-green/5 mb-6">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success-green flex-shrink-0" />
            <p className="text-sm font-medium text-foreground">
              Executor authority verified — full account closure support is available.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const status = statusBadge[profile.verification_status];
  const StatusIcon = status.icon;

  const handleSubmit = async () => {
    if (!user || !deathCert) {
      toast({
        title: "Death certificate required",
        description: "Please upload a death certificate to continue.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const deathCertUpload = await supabase.storage
      .from("executor-documents")
      .upload(`${user.id}/death-certificate.${fileExtension(deathCert)}`, deathCert, { upsert: true });

    if (deathCertUpload.error) {
      toast({ title: "Upload failed", description: deathCertUpload.error.message, variant: "destructive" });
      setSubmitting(false);
      return;
    }

    let lettersPath: string | null = null;
    if (letters) {
      const lettersUpload = await supabase.storage
        .from("executor-documents")
        .upload(`${user.id}/letters-testamentary.${fileExtension(letters)}`, letters, { upsert: true });
      if (lettersUpload.error) {
        toast({ title: "Upload failed", description: lettersUpload.error.message, variant: "destructive" });
        setSubmitting(false);
        return;
      }
      lettersPath = lettersUpload.data.path;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        death_certificate_path: deathCertUpload.data.path,
        letters_testamentary_path: lettersPath,
        verification_status: "pending_review",
        verification_submitted_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setSubmitting(false);

    if (error) {
      toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Documents submitted", description: "A specialist will review them shortly." });
    await refetch();
  };

  return (
    <Card className="border-warning-amber/30 bg-warning-amber/5 mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Executor Verification</CardTitle>
            <CardDescription>
              Required before we can act on accounts on your behalf.
            </CardDescription>
          </div>
          <Badge variant={status.variant} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.verification_status === "rejected" && profile.verification_notes && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {profile.verification_notes}
          </div>
        )}

        {profile.verification_status === "pending_review" ? (
          <p className="text-sm text-muted-foreground">
            Your documents were submitted
            {profile.verification_submitted_at
              ? ` on ${new Date(profile.verification_submitted_at).toLocaleDateString()}`
              : ""}{" "}
            and are waiting on review. You can upload replacements below if needed.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            To find and close accounts on someone else's behalf, we need a death certificate and,
            if you have it, Letters Testamentary or Letters of Administration from the court.
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Death Certificate (required)</Label>
            <label className="flex items-center gap-2 border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer bg-background/50">
              <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground truncate">
                {deathCert ? deathCert.name : "Click to upload (PDF or image)"}
              </span>
              <Input
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.size > MAX_FILE_SIZE) {
                    toast({ title: "File too large", description: "Max 10MB.", variant: "destructive" });
                    return;
                  }
                  setDeathCert(file ?? null);
                }}
              />
            </label>
          </div>

          <div className="space-y-2">
            <Label>Letters Testamentary / Administration (optional)</Label>
            <label className="flex items-center gap-2 border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer bg-background/50">
              <Upload className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground truncate">
                {letters ? letters.name : "Click to upload (PDF or image)"}
              </span>
              <Input
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.size > MAX_FILE_SIZE) {
                    toast({ title: "File too large", description: "Max 10MB.", variant: "destructive" });
                    return;
                  }
                  setLetters(file ?? null);
                }}
              />
            </label>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit for Review
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExecutorVerification;
