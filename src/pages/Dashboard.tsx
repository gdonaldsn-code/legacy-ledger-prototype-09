import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, TrendingUp, Shield, Zap, AlertTriangle } from "lucide-react";
import { useUserDiscoveredAccounts } from "@/components/discovery/hooks/useUserDiscoveredAccounts";
import { useReportDownload } from "@/components/discovery/hooks/useReportDownload";
import ScanningProgress from "@/components/discovery/ScanningProgress";
import AccountsList from "@/components/discovery/AccountsList";
import ReportSummary from "@/components/discovery/ReportSummary";
import SiteHeader from "@/components/SiteHeader";
import ExecutorVerification from "@/components/ExecutorVerification";
import AIGuidanceChat from "@/components/AIGuidanceChat";

const Dashboard = () => {
  const [scanStarted, setScanStarted] = useState(false);
  const { currentStep, discoveredAccounts, scanningSteps, summaryStats, isComplete, refetch } = useUserDiscoveredAccounts(scanStarted);
  const { downloadReport } = useReportDownload();

  const accountsNeedingBeneficiary = discoveredAccounts.filter(
    (a) => a.beneficiaryStatus === "missing" || a.beneficiaryStatus === "needs_review"
  ).length;

  const handleDownloadReport = () => {
    downloadReport(summaryStats, discoveredAccounts);
  };

  // Auto-start scan on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setScanStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleScheduleConsultation = () => {
    window.open('https://calendly.com', '_blank');
  };

  return (
    <div className="min-h-screen comfort-gradient">
      <SiteHeader
        actions={
          isComplete && (
            <Button onClick={handleDownloadReport} variant="default" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          )
        }
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">Discovery Dashboard</h1>
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="card-gradient border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to Your Dashboard</CardTitle>
              <CardDescription className="text-base">
                Your discovery scan is {isComplete ? 'complete' : 'in progress'}. Track your discovered accounts and assets below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="p-2 rounded-full bg-electric-blue/10">
                    <Shield className="h-5 w-5 text-electric-blue" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Security</div>
                    <div className="font-semibold">Bank-Level</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="p-2 rounded-full bg-cyber-teal/10">
                    <Zap className="h-5 w-5 text-cyber-teal" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-semibold">{isComplete ? 'Complete' : 'Scanning'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="p-2 rounded-full bg-success-green/10">
                    <TrendingUp className="h-5 w-5 text-success-green" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Accounts Found</div>
                    <div className="font-semibold">{discoveredAccounts.length}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ExecutorVerification />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Scanning Progress or Summary */}
          <div className="lg:col-span-1 space-y-6">
            {!isComplete ? (
              <Card className="card-gradient border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Scan Progress</CardTitle>
                  <CardDescription>
                    Searching your financial network
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-gradient-to-br from-navy-deep to-navy-medium rounded-xl p-4 -mt-2">
                  <ScanningProgress
                    currentStep={currentStep}
                    scanningSteps={scanningSteps}
                    onSkipToResults={() => setScanStarted(false)}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="card-gradient border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Scan Summary</CardTitle>
                  <CardDescription>
                    Your complete discovery report
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-gradient-to-br from-navy-deep to-navy-medium rounded-xl p-4 -mt-2">
                  <ReportSummary summaryStats={summaryStats} />
                </CardContent>
              </Card>
            )}

            {/* Actions Card */}
            {isComplete && (
              <Card className="card-gradient border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleScheduleConsultation}
                    variant="default"
                    className="w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </Button>
                  <Button
                    onClick={handleDownloadReport}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Discovered Accounts */}
          <div className="lg:col-span-2">
            <Card className="card-gradient border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Discovered Accounts</CardTitle>
                <CardDescription>
                  {discoveredAccounts.length > 0 
                    ? `${discoveredAccounts.length} account${discoveredAccounts.length !== 1 ? 's' : ''} found during your discovery scan`
                    : 'Accounts will appear here as they are discovered'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {discoveredAccounts.length > 0 ? (
                  <>
                    {accountsNeedingBeneficiary > 0 && (
                      <div className="flex items-start gap-3 p-4 mb-4 rounded-lg border border-warning-amber/30 bg-warning-amber/10">
                        <AlertTriangle className="h-5 w-5 text-warning-amber mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-foreground">
                            {accountsNeedingBeneficiary} of {discoveredAccounts.length} accounts may need beneficiary attention
                          </p>
                          <p className="text-muted-foreground">
                            Accounts without a current beneficiary or transfer-on-death designation
                            typically go through probate instead of passing directly to your family.
                            Click an account's beneficiary badge below to review it.
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="bg-gradient-to-br from-navy-deep to-navy-medium rounded-xl p-4">
                      <AccountsList discoveredAccounts={discoveredAccounts} onBeneficiaryUpdated={refetch} />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Scanning financial institutions...</p>
                    <p className="text-sm mt-2">Discovered accounts will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8">
          <Card className="border-electric-blue/20 bg-electric-blue/5 backdrop-blur-sm">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-electric-blue mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Your data is secure</p>
                  <p className="text-muted-foreground">
                    All information is encrypted using bank-level security. We never store your credentials 
                    and comply with all applicable privacy regulations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AIGuidanceChat />
    </div>
  );
};

export default Dashboard;
