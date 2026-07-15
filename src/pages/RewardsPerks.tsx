import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, BookUser, FileText } from "lucide-react";
import RewardsTab from "@/components/rewards/RewardsTab";
import RolodexTab from "@/components/rewards/RolodexTab";
import LegalDocumentsTab from "@/components/rewards/LegalDocumentsTab";
import SiteHeader from "@/components/SiteHeader";

export default function RewardsPerks() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Rewards, Perks & Contacts</h1>
          <p className="text-sm text-muted-foreground">Your complete financial overview</p>
        </div>

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
