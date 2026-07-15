import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText, FileCheck, FileLock2, FileWarning, Eye, Clock,
  Scale, Landmark, ShieldCheck, MapPin, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type LegalDocument = Database["public"]["Tables"]["legal_documents"]["Row"];

const docTypeIcon: Record<LegalDocument["doc_type"], typeof FileText> = {
  poa: FileLock2,
  will: FileCheck,
  healthcare: FileWarning,
  trust: Landmark,
  contract: FileText,
};

const getDocTypeColor = (type: LegalDocument["doc_type"]) => {
  switch (type) {
    case "poa": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "will": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "healthcare": return "bg-red-500/10 text-red-400 border-red-500/20";
    case "trust": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "contract": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  }
};

const getDocTypeLabel = (type: LegalDocument["doc_type"]) => {
  switch (type) {
    case "poa": return "Power of Attorney";
    case "will": return "Will";
    case "healthcare": return "Healthcare";
    case "trust": return "Trust";
    case "contract": return "Contract";
  }
};

const getStatusColor = (status: LegalDocument["status"]) => {
  switch (status) {
    case "current": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "needs-review": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case "expired": return "bg-red-500/10 text-red-400 border-red-500/20";
  }
};

const getStatusLabel = (status: LegalDocument["status"]) => {
  switch (status) {
    case "current": return "Current";
    case "needs-review": return "Needs Review";
    case "expired": return "Expired";
  }
};

export default function LegalDocumentsTab() {
  const { user } = useAuth();
  const [legalDocuments, setLegalDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    supabase
      .from("legal_documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Failed to load legal documents", error);
        }
        setLegalDocuments(data ?? []);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const currentCount = legalDocuments.filter((d) => d.status === "current").length;
  const reviewCount = legalDocuments.filter((d) => d.status === "needs-review").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20"><FileText className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold text-foreground">{legalDocuments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-emerald-500/20"><FileCheck className="h-6 w-6 text-emerald-400" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-2xl font-bold text-foreground">{currentCount} docs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-yellow-500/20"><FileWarning className="h-6 w-6 text-yellow-400" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Review</p>
                <p className="text-2xl font-bold text-foreground">{reviewCount} doc{reviewCount !== 1 ? "s" : ""}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Legal Documents</h2>
        {legalDocuments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
              No documents on file yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {legalDocuments.map((doc) => {
              const IconComponent = docTypeIcon[doc.doc_type];
              return (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted"><IconComponent className="h-5 w-5 text-foreground" /></div>
                        <div>
                          <CardTitle className="text-base">{doc.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getDocTypeColor(doc.doc_type)} variant="outline">{getDocTypeLabel(doc.doc_type)}</Badge>
                            <Badge className={getStatusColor(doc.status)} variant="outline">{getStatusLabel(doc.status)}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {doc.last_updated && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        Last updated: {doc.last_updated}
                      </div>
                    )}
                    {doc.next_review && (
                      <div className={`flex items-center gap-2 text-sm ${doc.status === "needs-review" ? "text-yellow-400" : "text-muted-foreground"}`}>
                        <Eye className="h-4 w-4 flex-shrink-0" />
                        Next review: {doc.next_review}
                      </div>
                    )}
                    {doc.attorney && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Scale className="h-4 w-4 flex-shrink-0" />
                        {doc.attorney}
                      </div>
                    )}
                    {doc.location && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        {doc.location}
                      </div>
                    )}
                    {doc.notes && (
                      <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">{doc.notes}</div>
                    )}
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Eye className="h-4 w-4 mr-2" />
                      View Document Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
