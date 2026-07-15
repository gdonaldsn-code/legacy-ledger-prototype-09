import { useState, useEffect } from "react";

export interface DiscoveredAccount {
  id?: string;
  institution: string;
  type: string;
  accountNumber: string;
  balance: string;
  lastActivity: string;
  status: "active" | "dormant" | "forgotten";
  risk: "low" | "medium" | "high";
  /** Only populated for real (logged-in) accounts — absent on the public demo data. */
  beneficiaryStatus?: "confirmed" | "needs_review" | "missing" | "unknown";
  beneficiaryNames?: string | null;
  beneficiaryLastReviewed?: string | null;
}

export const useDiscoveryData = (isOpen: boolean) => {
  const [currentStep, setCurrentStep] = useState(0);

  const discoveredAccounts: DiscoveredAccount[] = [
    {
      institution: "Chase Bank",
      type: "Checking Account", 
      accountNumber: "****1234",
      balance: "$12,450.00",
      lastActivity: "3 days ago",
      status: "active",
      risk: "low"
    },
    {
      institution: "Fidelity Investments",
      type: "401(k) Account",
      accountNumber: "****5678", 
      balance: "$127,890.00",
      lastActivity: "1 week ago",
      status: "active",
      risk: "low"
    },
    {
      institution: "Coinbase",
      type: "Cryptocurrency Wallet",
      accountNumber: "****9012",
      balance: "$8,750.00",
      lastActivity: "2 months ago", 
      status: "dormant",
      risk: "medium"
    },
    {
      institution: "Old National Bank",
      type: "Savings Account",
      accountNumber: "****3456",
      balance: "$2,100.00",
      lastActivity: "6 months ago",
      status: "forgotten", 
      risk: "high"
    }
  ];

  const scanningSteps = [
    "Scanning financial institutions...",
    "Analyzing asset platforms...", 
    "Cross-referencing public records...",
    "Generating comprehensive report..."
  ];

  const summaryStats = {
    accountsFound: 4,
    totalValue: "$151,190.00",
    atRiskAccounts: 1,
    institutionsScanned: 12
  };

  // Auto-advance scanning steps
  useEffect(() => {
    if (!isOpen || currentStep >= 4) return;
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1500); // Slightly faster progression
    
    return () => clearTimeout(timer);
  }, [isOpen, currentStep]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setCurrentStep(0);
      }, 300); // Small delay to avoid flash
      
      return () => clearTimeout(resetTimer);
    }
  }, [isOpen]);

  return {
    currentStep,
    setCurrentStep,
    discoveredAccounts,
    scanningSteps,
    summaryStats,
    isComplete: currentStep >= 4
  };
};