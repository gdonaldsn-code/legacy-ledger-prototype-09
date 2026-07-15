import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  CreditCard, 
  Coins, 
  Shield, 
  TrendingUp, 
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  X,
  Zap,
  Search,
  Database
} from "lucide-react";

interface LiveDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveDemo = ({ isOpen, onClose }: LiveDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [foundAccounts, setFoundAccounts] = useState<any[]>([]);

  const institutions = [
    { name: "Chase Bank", type: "Traditional Banking", scanning: false, found: false },
    { name: "Wells Fargo", type: "Traditional Banking", scanning: false, found: false },
    { name: "Fidelity", type: "Investment Platform", scanning: false, found: false },
    { name: "Coinbase", type: "Cryptocurrency Exchange", scanning: false, found: false },
    { name: "PayPal", type: "Digital Payments", scanning: false, found: false },
    { name: "Venmo", type: "Peer-to-Peer", scanning: false, found: false },
    { name: "Robinhood", type: "Trading Platform", scanning: false, found: false },
    { name: "Square Cash", type: "Digital Wallet", scanning: false, found: false }
  ];

  const [scanningInstitutions, setScanningInstitutions] = useState(institutions);

  const demoAccounts = [
    {
      institution: "Chase Bank",
      type: "Checking Account",
      balance: "$8,430.00", 
      status: "active",
      lastActivity: "2 days ago"
    },
    {
      institution: "Fidelity",
      type: "Investment Account",
      balance: "$45,670.00",
      status: "active", 
      lastActivity: "1 week ago"
    },
    {
      institution: "Coinbase",
      type: "Crypto Wallet",
      balance: "$3,250.00",
      status: "dormant",
      lastActivity: "3 months ago"
    }
  ];

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setFoundAccounts([]);
      setScanningInstitutions(institutions);
      return;
    }
  }, [isOpen]);

  // Progress timer
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Institution scanning logic
  useEffect(() => {
    if (!isOpen || progress >= 100) return;

    const institutionTimer = setInterval(() => {
      setScanningInstitutions(prev => {
        const updated = [...prev];
        const currentScanning = updated.findIndex(inst => inst.scanning);
        
        // Complete current scanning
        if (currentScanning !== -1) {
          updated[currentScanning].scanning = false;
          updated[currentScanning].found = Math.random() > 0.5; // 50% chance to find account
          
          if (updated[currentScanning].found) {
            const account = demoAccounts.find(acc => acc.institution === updated[currentScanning].name);
            if (account) {
              setFoundAccounts(prev => {
                // Avoid duplicates
                if (prev.some(acc => acc.institution === account.institution)) {
                  return prev;
                }
                return [...prev, account];
              });
            }
          }
        }

        // Start next scan if progress < 90%
        const nextToScan = updated.findIndex((inst, index) => 
          !inst.scanning && 
          !inst.found && 
          updated.slice(0, index).every(prevInst => !prevInst.scanning)
        );
        
        if (nextToScan !== -1 && progress < 90) {
          updated[nextToScan].scanning = true;
        }

        return updated;
      });
    }, 2000); // Slower, more realistic timing

    return () => clearInterval(institutionTimer);
  }, [isOpen, progress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-br from-navy-deep to-navy-medium rounded-2xl border border-white/20 w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Live AI Discovery Demo</h2>
              <p className="text-blue-soft text-sm">Watch our AI scan in real-time</p>
            </div>
          </div>
          <Button 
            onClick={onClose}
            variant="ghost" 
            size="sm"
            className="text-blue-soft hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Panel - Scanning Progress */}
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">AI Scanning Financial Networks</h3>
                <Progress value={progress} className="w-full" />
                <p className="text-blue-soft text-sm">{progress}% Complete • {foundAccounts.length} accounts discovered</p>
              </div>

              {/* Institution Scanning List */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Database className="h-5 w-5 text-electric-blue" />
                  Scanning Financial Institutions
                </h4>
                {scanningInstitutions.map((institution, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        institution.scanning ? 'bg-electric-blue/20' : 
                        institution.found ? 'bg-success-green/20' : 'bg-white/10'
                      }`}>
                        {institution.scanning ? (
                          <div className="w-4 h-4 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
                        ) : institution.found ? (
                          <CheckCircle className="h-4 w-4 text-success-green" />
                        ) : (
                          <Building2 className="h-4 w-4 text-blue-soft" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{institution.name}</p>
                        <p className="text-blue-soft text-xs">{institution.type}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={institution.scanning ? "default" : institution.found ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {institution.scanning ? "Scanning..." : institution.found ? "Account Found" : "No Match"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Found Accounts */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyber-teal" />
                Discovered Accounts ({foundAccounts.length})
              </h4>

              {foundAccounts.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <Search className="h-8 w-8 text-blue-soft" />
                  </div>
                  <p className="text-blue-soft">Scanning for accounts...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {foundAccounts.map((account, index) => (
                    <Card key={index} className="bg-white/5 border-white/20 p-4 animate-in slide-in-from-right">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-electric-blue/20 to-cyber-teal/20 rounded-lg flex items-center justify-center">
                            {account.type.includes("Crypto") ? (
                              <Coins className="h-5 w-5 text-cyber-teal" />
                            ) : (
                              <CreditCard className="h-5 w-5 text-electric-blue" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{account.institution}</p>
                            <p className="text-blue-soft text-xs">{account.type}</p>
                            <p className="text-blue-soft/70 text-xs">Last: {account.lastActivity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">{account.balance}</p>
                          <Badge 
                            variant={account.status === "active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {account.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {/* Total Value */}
                  <Card className="bg-gradient-to-r from-electric-blue/10 to-cyber-teal/10 border-electric-blue/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-success-green" />
                        <span className="text-white font-semibold">Total Discovered Value</span>
                      </div>
                      <span className="text-2xl font-bold text-white">
                        ${foundAccounts.reduce((total, account) => {
                          return total + parseFloat(account.balance.replace(/[$,]/g, ''));
                        }, 0).toLocaleString()}
                      </span>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {progress >= 100 && (
            <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-white/20">
              <Button variant="hero" className="flex-1" onClick={() => alert('This would start a real discovery scan for actual users')}>
                <span className="hidden sm:inline">Start Your Real Discovery Scan</span>
                <span className="sm:hidden">Start Real Scan</span>
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => alert('Contact our team to schedule a consultation')}>
                <span className="hidden sm:inline">Schedule Consultation</span>
                <span className="sm:hidden">Schedule Call</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;