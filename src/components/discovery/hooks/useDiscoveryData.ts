import { useState, useEffect } from "react";

export interface DiscoveredAccount {
  institution: string;
  type: string;
  accountNumber: string;
  balance: string;
  lastActivity: string;
  status: "active" | "dormant" | "forgotten";
  risk: "low" | "medium" | "high";
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
      institution: "Blue Cross Blue Shield",
      type: "Health Savings Account",
      accountNumber: "****7890",
      balance: "$8,650.00",
      lastActivity: "2 weeks ago",
      status: "active",
      risk: "low"
    },
    {
      institution: "UnitedHealth Group",
      type: "Unclaimed Insurance Benefit",
      accountNumber: "****2468",
      balance: "$3,200.00",
      lastActivity: "4 months ago",
      status: "dormant",
      risk: "medium"
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
      institution: "Memorial Hospital",
      type: "Outstanding Medical Debt",
      accountNumber: "****1357",
      balance: "-$4,890.00",
      lastActivity: "8 months ago",
      status: "forgotten", 
      risk: "high"
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
    "Analyzing digital asset platforms...", 
    "Cross-referencing public records...",
    "Generating comprehensive report..."
  ];

  const summaryStats = {
    accountsFound: 7,
    totalValue: "$157,260.00",
    atRiskAccounts: 2,
    institutionsScanned: 41000
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