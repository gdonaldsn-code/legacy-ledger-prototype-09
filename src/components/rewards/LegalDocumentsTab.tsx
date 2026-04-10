import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText, FileCheck, FileLock2, FileWarning, Eye, Clock,
  Scale, Landmark, HeartPulse, ShieldCheck, MapPin, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LegalDocument {
  id: string;
  name: string;
  type: "poa" | "will" | "healthcare" | "trust" | "contract";
  status: "current" | "needs-review" | "expired";
  lastUpdated: string;
  nextReview?: string;
  attorney?: string;
  location: string;
  notes?: string;
  icon: typeof FileText;
}

const legalDocuments: LegalDocument[] = [
  {
    id: "1", name: "Durable Power of Attorney", type: "poa", status: "current",
    lastUpdated: "January 15, 2025", nextReview: "January 2026",
    attorney: "Robert A. Whitfield, Esq.",
    location: "Safe deposit box at Chase Bank, Main St. branch",
    notes: "Designates Linda Vasquez as agent. Covers financial and legal matters.",
    icon: FileLock2
  },
  {
    id: "2", name: "Healthcare Power of Attorney", type: "healthcare", status: "current",
    lastUpdated: "January 15, 2025", nextReview: "January 2026",
    attorney: "Robert A. Whitfield, Esq.",
    location: "Safe deposit box at Chase Bank; copy with Dr. Patterson",
    notes: "Designates Linda Vasquez as healthcare proxy. Includes HIPAA authorization.",
    icon: HeartPulse
  },
  {
    id: "3", name: "Last Will & Testament", type: "will", status: "current",
    lastUpdated: "March 10, 2025", nextReview: "March 2027",
    attorney: "Robert A. Whitfield, Esq.",
    location: "Whitfield & Grant LLP office vault",
    notes: "Updated to include new beneficiary designations. Executor: Linda Vasquez.",
    icon: FileCheck
  },
  {
    id: "4", name: "Advance Healthcare Directive", type: "healthcare", status: "needs-review",
    lastUpdated: "June 5, 2023", nextReview: "Overdue — review recommended",
    attorney: "Robert A. Whitfield, Esq.",
    location: "Safe deposit box; copy with Dr. Patterson and hospital",
    notes: "Living will with end-of-life care preferences. Needs update per new state laws.",
    icon: FileWarning
  },
  {
    id: "5", name: "Revocable Living Trust", type: "trust", status: "current",
    lastUpdated: "March 10, 2025",
    attorney: "Robert A. Whitfield, Esq.",
    location: "Whitfield & Grant LLP office vault; digital copy on secure drive",
    notes: "Includes real estate, investment accounts, and life insurance proceeds. Successor trustee: Linda Vasquez.",
    icon: Landmark
  },
  {
    id: "6", name: "Property Deed & Title", type: "contract", status: "current",
    lastUpdated: "August 20, 2022",
    location: "County Recorder's Office; copy in safe deposit box",
    notes: "Primary residence at 742 Evergreen Terrace. Title held in trust.",
    icon: FileText
  },
  {
    id: "7", name: "Long-Term Care Insurance Policy", type: "contract", status: "current",
    lastUpdated: "November 1, 2024", nextReview: "November 2025",
    location: "Home filing cabinet; digital copy with insurance agent",
    notes: "Policy with Northwestern Mutual. $200/day benefit, 3-year coverage period.",
    icon: ShieldCheck
  },
  {
    id: "8", name: "Prenuptial Agreement", type: "contract", status: "current",
    lastUpdated: "May 12, 2010",
    attorney: "Whitfield & Grant LLP",
    location: "Attorney's office vault",
    notes: "Outlines asset division and spousal support terms.",
    icon: Scale
  }
];

const getDocTypeColor = (type: LegalDocument["type"]) => {
  switch (type) {
    case "poa": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "will": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "healthcare": return "bg-red-500/10 text-red-400 border-red-500/20";
    case "trust": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "contract": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  }
};

const getDocTypeLabel = (type: LegalDocument["type"]) => {
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
  const currentCount = legalDocuments.filter(d => d.status === "current").length;
  const reviewCount = legalDocuments.filter(d => d.status === "needs-review").length;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {legalDocuments.map((doc) => {
            const IconComponent = doc.icon;
            return (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted"><IconComponent className="h-5 w-5 text-foreground" /></div>
                      <div>
                        <CardTitle className="text-base">{doc.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getDocTypeColor(doc.type)} variant="outline">{getDocTypeLabel(doc.type)}</Badge>
                          <Badge className={getStatusColor(doc.status)} variant="outline">{getStatusLabel(doc.status)}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    Last updated: {doc.lastUpdated}
                  </div>
                  {doc.nextReview && (
                    <div className={`flex items-center gap-2 text-sm ${doc.status === "needs-review" ? "text-yellow-400" : "text-muted-foreground"}`}>
                      <Eye className="h-4 w-4 flex-shrink-0" />
                      Next review: {doc.nextReview}
                    </div>
                  )}
                  {doc.attorney && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Scale className="h-4 w-4 flex-shrink-0" />
                      {doc.attorney}
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    {doc.location}
                  </div>
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
      </div>
    </div>
  );
}
