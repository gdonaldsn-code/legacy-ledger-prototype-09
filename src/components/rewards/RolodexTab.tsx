import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, BookUser, Building2, Scale, Landmark, HeartPulse, ShieldCheck, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

const categoryIcon: Record<Contact["category"], typeof Scale> = {
  legal: Scale,
  financial: Building2,
  insurance: ShieldCheck,
  medical: HeartPulse,
  personal: Users,
};

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
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    supabase
      .from("contacts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Failed to load contacts", error);
        }
        setContacts(data ?? []);
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

  const categoryCount = new Set(contacts.map((c) => c.category)).size;

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
                <p className="text-2xl font-bold text-foreground">{categoryCount} types</p>
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
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <BookUser className="h-10 w-10 mx-auto mb-3 opacity-50" />
              No contacts yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {contacts.map((contact) => {
              const IconComponent = categoryIcon[contact.category];
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
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">{contact.phone}</a>
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors truncate">{contact.email}</a>
                      </div>
                    )}
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
        )}
      </div>
    </div>
  );
}
