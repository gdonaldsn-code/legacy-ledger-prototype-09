import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, BookUser, Building2, Scale, Landmark, HeartPulse, ShieldCheck, Users } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string;
  category: "legal" | "financial" | "insurance" | "medical" | "personal";
  firm?: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
  icon: typeof Scale;
}

const contacts: Contact[] = [
  {
    id: "1", name: "Margaret Chen, CPA", role: "Certified Public Accountant", category: "financial",
    firm: "Chen & Associates Tax Advisory", phone: "(555) 234-5678", email: "m.chen@chenassociates.com",
    address: "450 Financial Plaza, Suite 300, New York, NY 10005",
    notes: "Handles annual tax filings and quarterly estimates. Next appointment: April 15.",
    icon: Building2
  },
  {
    id: "2", name: "Robert A. Whitfield, Esq.", role: "Estate Planning Attorney", category: "legal",
    firm: "Whitfield & Grant LLP", phone: "(555) 876-5432", email: "rwhitfield@whitfieldgrant.com",
    address: "200 Legal Center Dr, Suite 1200, New York, NY 10006",
    notes: "Last will update: March 2025. Trust review scheduled for Q3.",
    icon: Scale
  },
  {
    id: "3", name: "David Kim", role: "Financial Advisor (CFP®)", category: "financial",
    firm: "Vanguard Wealth Management", phone: "(555) 345-6789", email: "david.kim@vanguardwm.com",
    address: "800 Investment Blvd, Suite 500, New York, NY 10007",
    notes: "Quarterly portfolio review. Manages retirement and brokerage accounts.",
    icon: Landmark
  },
  {
    id: "4", name: "Sarah Mitchell", role: "Insurance Agent", category: "insurance",
    firm: "Northwestern Mutual", phone: "(555) 456-7890", email: "s.mitchell@northwesternmutual.com",
    notes: "Handles life insurance, umbrella policy. Annual review in September.",
    icon: ShieldCheck
  },
  {
    id: "5", name: "Dr. James Patterson", role: "Primary Care Physician", category: "medical",
    firm: "NYC Medical Group", phone: "(555) 567-8901", email: "jpatterson@nycmedgroup.com",
    address: "125 Health Ave, New York, NY 10010",
    notes: "Annual physical due in June. Has complete medical history on file.",
    icon: HeartPulse
  },
  {
    id: "6", name: "Linda Vasquez", role: "Power of Attorney / Executor", category: "personal",
    phone: "(555) 678-9012", email: "linda.vasquez@email.com",
    notes: "Designated POA and estate executor. Emergency contact.",
    icon: Users
  }
];

const getCategoryColor = (category: Contact["category"]) => {
  switch (category) {
    case "legal": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "financial": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "insurance": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "medical": return "bg-red-500/10 text-red-400 border-red-500/20";
    case "personal": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  }
};

const getCategoryLabel = (category: Contact["category"]) => {
  switch (category) {
    case "legal": return "Legal";
    case "financial": return "Financial";
    case "insurance": return "Insurance";
    case "medical": return "Medical";
    case "personal": return "Personal";
  }
};

export default function RolodexTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20"><BookUser className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold text-foreground">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-accent/20"><Scale className="h-6 w-6 text-accent-foreground" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-foreground">5 types</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-secondary/40">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-secondary"><ShieldCheck className="h-6 w-6 text-secondary-foreground" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-2xl font-bold text-foreground">All current</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Important Contacts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contacts.map((contact) => {
            const IconComponent = contact.icon;
            return (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted"><IconComponent className="h-5 w-5 text-foreground" /></div>
                      <div>
                        <CardTitle className="text-base">{contact.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                      </div>
                    </div>
                    <Badge className={getCategoryColor(contact.category)} variant="outline">{getCategoryLabel(contact.category)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contact.firm && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4 flex-shrink-0" />{contact.firm}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">{contact.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors truncate">{contact.email}</a>
                  </div>
                  {contact.address && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />{contact.address}
                    </div>
                  )}
                  {contact.notes && (
                    <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground mt-2">{contact.notes}</div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
