import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane, 
  CreditCard, 
  Hotel, 
  Gift, 
  Calendar,
  ArrowLeft,
  Star,
  Coins,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  BookUser,
  Building2,
  Scale,
  Landmark,
  HeartPulse,
  ShieldCheck,
  Users,
  FileText,
  FileCheck,
  FileLock2,
  FileWarning,
  Download,
  Eye,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ... Rewards data & types

interface RewardsAccount {
  id: string;
  name: string;
  type: "airline" | "hotel" | "credit-card" | "retail";
  program: string;
  balance: string;
  value: string;
  expirationWarning?: string;
  monthlyPerks: string[];
  icon: typeof Plane;
}

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

const rewardsAccounts: RewardsAccount[] = [
  {
    id: "1",
    name: "American Airlines",
    type: "airline",
    program: "AAdvantage",
    balance: "47,500 miles",
    value: "~$712",
    monthlyPerks: ["Priority boarding", "Free checked bag", "Admiral's Club access (2 passes/month)"],
    icon: Plane
  },
  {
    id: "2",
    name: "Delta Air Lines",
    type: "airline",
    program: "SkyMiles",
    balance: "32,100 miles",
    value: "~$481",
    expirationWarning: "Miles expire in 18 months without activity",
    monthlyPerks: ["Sky Priority check-in", "Complimentary upgrades when available"],
    icon: Plane
  },
  {
    id: "3",
    name: "Marriott Bonvoy",
    type: "hotel",
    program: "Bonvoy Gold Elite",
    balance: "89,200 points",
    value: "~$623",
    monthlyPerks: ["25% bonus points on stays", "Room upgrade when available", "Late checkout (2pm)", "Welcome gift points"],
    icon: Hotel
  },
  {
    id: "4",
    name: "Chase Sapphire Reserve",
    type: "credit-card",
    program: "Ultimate Rewards",
    balance: "125,000 points",
    value: "~$1,875",
    monthlyPerks: ["$300 annual travel credit", "Priority Pass lounge access", "DoorDash DashPass membership", "$100 Global Entry/TSA credit"],
    icon: CreditCard
  },
  {
    id: "5",
    name: "Hilton Honors",
    type: "hotel",
    program: "Diamond Status",
    balance: "156,800 points",
    value: "~$784",
    monthlyPerks: ["Free breakfast", "Executive lounge access", "5th night free on award stays", "Room upgrade to suites"],
    icon: Hotel
  },
  {
    id: "6",
    name: "Amazon Prime Rewards",
    type: "retail",
    program: "Prime Visa",
    balance: "18,450 points",
    value: "~$184",
    monthlyPerks: ["5% back on Amazon purchases", "2% back at restaurants & gas stations", "No foreign transaction fees"],
    icon: Gift
  }
];

const contacts: Contact[] = [
  {
    id: "1",
    name: "Margaret Chen, CPA",
    role: "Certified Public Accountant",
    category: "financial",
    firm: "Chen & Associates Tax Advisory",
    phone: "(555) 234-5678",
    email: "m.chen@chenassociates.com",
    address: "450 Financial Plaza, Suite 300, New York, NY 10005",
    notes: "Handles annual tax filings and quarterly estimates. Next appointment: April 15.",
    icon: Building2
  },
  {
    id: "2",
    name: "Robert A. Whitfield, Esq.",
    role: "Estate Planning Attorney",
    category: "legal",
    firm: "Whitfield & Grant LLP",
    phone: "(555) 876-5432",
    email: "rwhitfield@whitfieldgrant.com",
    address: "200 Legal Center Dr, Suite 1200, New York, NY 10006",
    notes: "Last will update: March 2025. Trust review scheduled for Q3.",
    icon: Scale
  },
  {
    id: "3",
    name: "David Kim",
    role: "Financial Advisor (CFP®)",
    category: "financial",
    firm: "Vanguard Wealth Management",
    phone: "(555) 345-6789",
    email: "david.kim@vanguardwm.com",
    address: "800 Investment Blvd, Suite 500, New York, NY 10007",
    notes: "Quarterly portfolio review. Manages retirement and brokerage accounts.",
    icon: Landmark
  },
  {
    id: "4",
    name: "Sarah Mitchell",
    role: "Insurance Agent",
    category: "insurance",
    firm: "Northwestern Mutual",
    phone: "(555) 456-7890",
    email: "s.mitchell@northwesternmutual.com",
    notes: "Handles life insurance, umbrella policy. Annual review in September.",
    icon: ShieldCheck
  },
  {
    id: "5",
    name: "Dr. James Patterson",
    role: "Primary Care Physician",
    category: "medical",
    firm: "NYC Medical Group",
    phone: "(555) 567-8901",
    email: "jpatterson@nycmedgroup.com",
    address: "125 Health Ave, New York, NY 10010",
    notes: "Annual physical due in June. Has complete medical history on file.",
    icon: HeartPulse
  },
  {
    id: "6",
    name: "Linda Vasquez",
    role: "Power of Attorney / Executor",
    category: "personal",
    firm: undefined,
    phone: "(555) 678-9012",
    email: "linda.vasquez@email.com",
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

const getTypeColor = (type: RewardsAccount["type"]) => {
  switch (type) {
    case "airline": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "hotel": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "credit-card": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "retail": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  }
};

const getTypeLabel = (type: RewardsAccount["type"]) => {
  switch (type) {
    case "airline": return "Airline";
    case "hotel": return "Hotel";
    case "credit-card": return "Credit Card";
    case "retail": return "Retail";
  }
};

export default function RewardsPerks() {
  const navigate = useNavigate();

  const totalValue = rewardsAccounts.reduce((sum, account) => {
    const value = parseFloat(account.value.replace(/[^0-9.]/g, ""));
    return sum + value;
  }, 0);

  const totalPerks = rewardsAccounts.reduce((sum, account) => sum + account.monthlyPerks.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Rewards, Perks & Contacts</h1>
              <p className="text-sm text-muted-foreground">Your complete financial overview</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="rewards" className="gap-2">
              <Coins className="h-4 w-4" />
              Rewards & Perks
            </TabsTrigger>
            <TabsTrigger value="rolodex" className="gap-2">
              <BookUser className="h-4 w-4" />
              Rolodex
            </TabsTrigger>
          </TabsList>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/20">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Points Value</p>
                      <p className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-accent/20">
                      <Star className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Accounts</p>
                      <p className="text-2xl font-bold text-foreground">{rewardsAccounts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-secondary/40">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-secondary">
                      <Gift className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Perks</p>
                      <p className="text-2xl font-bold text-foreground">{totalPerks} benefits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Your Rewards Accounts</h2>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Auto-tracked
                </Badge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {rewardsAccounts.map((account) => {
                  const IconComponent = account.icon;
                  return (
                    <Card key={account.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-muted">
                              <IconComponent className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{account.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{account.program}</p>
                            </div>
                          </div>
                          <Badge className={getTypeColor(account.type)} variant="outline">
                            {getTypeLabel(account.type)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="text-sm text-muted-foreground">Balance</p>
                            <p className="font-semibold text-foreground">{account.balance}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Est. Value</p>
                            <p className="font-semibold text-primary">{account.value}</p>
                          </div>
                        </div>
                        {account.expirationWarning && (
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 text-destructive text-sm">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            {account.expirationWarning}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <Gift className="h-4 w-4" />
                            Monthly Perks
                          </p>
                          <ul className="space-y-1.5">
                            {account.monthlyPerks.map((perk, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {perk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Rolodex Tab */}
          <TabsContent value="rolodex" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/20">
                      <BookUser className="h-6 w-6 text-primary" />
                    </div>
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
                    <div className="p-3 rounded-full bg-accent/20">
                      <Scale className="h-6 w-6 text-accent-foreground" />
                    </div>
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
                    <div className="p-3 rounded-full bg-secondary">
                      <ShieldCheck className="h-6 w-6 text-secondary-foreground" />
                    </div>
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
                            <div className="p-2 rounded-lg bg-muted">
                              <IconComponent className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{contact.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{contact.role}</p>
                            </div>
                          </div>
                          <Badge className={getCategoryColor(contact.category)} variant="outline">
                            {getCategoryLabel(contact.category)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {contact.firm && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="h-4 w-4 flex-shrink-0" />
                            {contact.firm}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                            {contact.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors truncate">
                            {contact.email}
                          </a>
                        </div>
                        {contact.address && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            {contact.address}
                          </div>
                        )}
                        {contact.notes && (
                          <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground mt-2">
                            {contact.notes}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
