import { Card } from "@/components/ui/card";
import { Building2, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";

interface ReportSummaryProps {
  summaryStats: {
    accountsFound: number;
    totalValue: string;
    atRiskAccounts: number;
    institutionsScanned: number;
  };
}

const ReportSummary = ({ summaryStats }: ReportSummaryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <Card className="bg-white/5 border-white/20 p-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-electric-blue" />
          <div>
            <p className="text-2xl font-bold text-white">{summaryStats.accountsFound}</p>
            <p className="text-blue-soft text-sm">Accounts Found</p>
          </div>
        </div>
      </Card>
      
      <Card className="bg-white/5 border-white/20 p-4">
        <div className="flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-success-green" />
          <div>
            <p className="text-2xl font-bold text-white">$151K</p>
            <p className="text-blue-soft text-sm">Total Value</p>
          </div>
        </div>
      </Card>
      
      <Card className="bg-white/5 border-white/20 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-warning-orange" />
          <div>
            <p className="text-2xl font-bold text-white">{summaryStats.atRiskAccounts}</p>
            <p className="text-blue-soft text-sm">At Risk</p>
          </div>
        </div>
      </Card>
      
      <Card className="bg-white/5 border-white/20 p-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-cyber-teal" />
          <div>
            <p className="text-2xl font-bold text-white">{summaryStats.institutionsScanned}</p>
            <p className="text-blue-soft text-sm">Institutions Scanned</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportSummary;