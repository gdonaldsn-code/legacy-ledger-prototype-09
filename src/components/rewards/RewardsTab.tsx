import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, CreditCard, Hotel, Gift, Calendar, Star, Coins, TrendingUp, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type RewardsAccount = Database["public"]["Tables"]["rewards_accounts"]["Row"];

const typeIcon: Record<RewardsAccount["type"], typeof Plane> = {
  airline: Plane,
  hotel: Hotel,
  "credit-card": CreditCard,
  retail: Gift,
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

export default function RewardsTab() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<RewardsAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    supabase
      .from("rewards_accounts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Failed to load rewards accounts", error);
        }
        setAccounts(data ?? []);
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

  const totalValue = accounts.reduce((sum, account) => sum + Number(account.estimated_value), 0);
  const totalPerks = accounts.reduce((sum, account) => sum + account.monthly_perks.length, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20"><Coins className="h-6 w-6 text-primary" /></div>
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
              <div className="p-3 rounded-full bg-accent/20"><Star className="h-6 w-6 text-accent-foreground" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Active Accounts</p>
                <p className="text-2xl font-bold text-foreground">{accounts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-secondary/40">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-secondary"><Gift className="h-6 w-6 text-secondary-foreground" /></div>
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
          <Badge variant="outline" className="gap-1"><TrendingUp className="h-3 w-3" />Auto-tracked</Badge>
        </div>
        {accounts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Coins className="h-10 w-10 mx-auto mb-3 opacity-50" />
              No rewards accounts yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {accounts.map((account) => {
              const IconComponent = typeIcon[account.type];
              return (
                <Card key={account.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted"><IconComponent className="h-5 w-5 text-foreground" /></div>
                        <div>
                          <CardTitle className="text-base">{account.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{account.program}</p>
                        </div>
                      </div>
                      <Badge className={getTypeColor(account.type)} variant="outline">{getTypeLabel(account.type)}</Badge>
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
                        <p className="font-semibold text-primary">
                          ~${Number(account.estimated_value).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {account.expiration_warning && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 text-destructive text-sm">
                        <Calendar className="h-4 w-4 flex-shrink-0" />{account.expiration_warning}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <Gift className="h-4 w-4" />Monthly Perks
                      </p>
                      <ul className="space-y-1.5">
                        {account.monthly_perks.map((perk, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>{perk}
                          </li>
                        ))}
                      </ul>
                    </div>
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
