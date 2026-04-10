import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane, CreditCard, Hotel, Gift, Calendar, ArrowLeft, Star, Coins, TrendingUp,
  Phone, Mail, MapPin, BookUser, Building2, Scale, Landmark, HeartPulse,
  ShieldCheck, Users, FileText, FileCheck, FileLock2, FileWarning, Eye, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import RewardsTab from "@/components/rewards/RewardsTab";
import RolodexTab from "@/components/rewards/RolodexTab";
import LegalDocumentsTab from "@/components/rewards/LegalDocumentsTab";

export default function RewardsPerks() {
  const navigate = useNavigate();

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
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="rewards" className="gap-2">
              <Coins className="h-4 w-4" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="rolodex" className="gap-2">
              <BookUser className="h-4 w-4" />
              Rolodex
            </TabsTrigger>
            <TabsTrigger value="legal" className="gap-2">
              <FileText className="h-4 w-4" />
              Legal Docs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rewards"><RewardsTab /></TabsContent>
          <TabsContent value="rolodex"><RolodexTab /></TabsContent>
          <TabsContent value="legal"><LegalDocumentsTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
