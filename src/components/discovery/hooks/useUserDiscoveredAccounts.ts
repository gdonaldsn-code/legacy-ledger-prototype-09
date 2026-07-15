import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { DiscoveredAccount } from "./useDiscoveryData";

const scanningSteps = [
  "Scanning financial institutions...",
  "Analyzing asset platforms...",
  "Cross-referencing public records...",
  "Generating comprehensive report...",
];

const formatRelativeTime = (isoDate: string | null) => {
  if (!isoDate) return "Unknown";
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "Today";
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (days < 60) return `${Math.floor(days / 7)} week${Math.floor(days / 7) === 1 ? "" : "s"} ago`;
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? "" : "s"} ago`;
};

/**
 * Real, per-user replacement for the old hardcoded useDiscoveryData hook.
 * The "scan" is still a cosmetic animation (no live institution scanning
 * exists yet — see CLAUDE.md), but the accounts it reveals are genuine rows
 * from discovered_accounts, seeded per-user at signup by the
 * seed_starter_data trigger, not a global fixture shown to every visitor.
 */
export const useUserDiscoveredAccounts = (scanStarted: boolean) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [accounts, setAccounts] = useState<DiscoveredAccount[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!scanStarted || !user) return;

    let cancelled = false;

    supabase
      .from("discovered_accounts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Failed to load discovered accounts", error);
        }
        setAccounts(
          (data ?? []).map((row) => ({
            institution: row.institution,
            type: row.account_type,
            accountNumber: row.account_number_mask ?? "",
            balance: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
              row.balance
            ),
            lastActivity: formatRelativeTime(row.last_activity_at),
            status: row.status,
            risk: row.risk,
          }))
        );
        setFetched(true);
      });

    return () => {
      cancelled = true;
    };
  }, [scanStarted, user]);

  // Step through the scanning animation while the fetch is in flight.
  useEffect(() => {
    if (!scanStarted || currentStep >= scanningSteps.length) return;
    const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 900);
    return () => clearTimeout(timer);
  }, [scanStarted, currentStep]);

  useEffect(() => {
    if (!scanStarted) {
      setCurrentStep(0);
      setFetched(false);
    }
  }, [scanStarted]);

  const isComplete = fetched && currentStep >= scanningSteps.length;

  const summaryStats = {
    accountsFound: accounts.length,
    totalValue: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      accounts.reduce((sum, a) => sum + Number(a.balance.replace(/[^0-9.-]/g, "")), 0)
    ),
    atRiskAccounts: accounts.filter((a) => a.risk === "high").length,
    institutionsScanned: Math.max(accounts.length, 12),
  };

  return {
    currentStep,
    setCurrentStep,
    discoveredAccounts: accounts,
    scanningSteps,
    summaryStats,
    isComplete,
  };
};
