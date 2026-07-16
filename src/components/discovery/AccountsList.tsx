import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CreditCard, Coins } from "lucide-react";
import { DiscoveredAccount } from "./hooks/useDiscoveryData";
import BeneficiaryBadge from "./BeneficiaryBadge";
import ClosureChecklist from "./ClosureChecklist";

interface AccountsListProps {
  discoveredAccounts: DiscoveredAccount[];
  onBeneficiaryUpdated?: () => void;
}

const AccountsList = ({ discoveredAccounts, onBeneficiaryUpdated }: AccountsListProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-electric-blue" />
        Discovered Financial Accounts
      </h3>
      
      <div className="space-y-3">
        {discoveredAccounts.map((account, index) => (
          <Card key={index} className="bg-white/5 border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-electric-blue/20 to-cyber-teal/20 rounded-lg flex items-center justify-center">
                  {account.type.includes("Crypto") ? (
                    <Coins className="h-6 w-6 text-cyber-teal" />
                  ) : (
                    <CreditCard className="h-6 w-6 text-electric-blue" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{account.institution}</p>
                  <p className="text-blue-soft text-sm">{account.type} • {account.accountNumber}</p>
                  <p className="text-xs text-blue-soft/70">Last activity: {account.lastActivity}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-white">{account.balance}</p>
                <div className="flex items-center gap-2 justify-end">
                  <Badge
                    variant={account.status === "active" ? "default" : account.status === "dormant" ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {account.status}
                  </Badge>
                  <Badge
                    variant={account.risk === "low" ? "default" : account.risk === "medium" ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {account.risk} risk
                  </Badge>
                </div>
                {account.beneficiaryStatus && (
                  <div className="flex justify-end">
                    <BeneficiaryBadge
                      accountId={account.id}
                      institution={account.institution}
                      status={account.beneficiaryStatus}
                      names={account.beneficiaryNames}
                      onUpdated={onBeneficiaryUpdated}
                    />
                  </div>
                )}
                {account.id && (
                  <div className="flex justify-end">
                    <ClosureChecklist
                      accountId={account.id}
                      institution={account.institution}
                      checklist={account.closureChecklist}
                      onGenerated={onBeneficiaryUpdated}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountsList;