import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, X } from "lucide-react";
import { useDiscoveryData } from "./hooks/useDiscoveryData";
import { useReportDownload } from "./hooks/useReportDownload";
import ScanningProgress from "./ScanningProgress";
import ReportSummary from "./ReportSummary";
import AccountsList from "./AccountsList";

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiscoveryModal = ({ isOpen, onClose }: DiscoveryModalProps) => {
  const {
    currentStep,
    setCurrentStep,
    discoveredAccounts,
    scanningSteps,
    summaryStats,
    isComplete
  } = useDiscoveryData(isOpen);

  const { downloadReport } = useReportDownload();

  const handleDownload = () => {
    downloadReport(summaryStats, discoveredAccounts);
  };

  const handleSkipToResults = () => {
    setCurrentStep(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-br from-dark-primary to-dark-secondary rounded-2xl border border-white/20 w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Discovery Report</h2>
              <p className="text-blue-soft text-sm">Generated in 47 seconds</p>
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
          {!isComplete ? (
            <ScanningProgress 
              currentStep={currentStep}
              scanningSteps={scanningSteps}
              onSkipToResults={handleSkipToResults}
            />
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <ReportSummary summaryStats={summaryStats} />
              
              <Separator className="bg-white/20" />
              
              <AccountsList discoveredAccounts={discoveredAccounts} />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={handleDownload} variant="hero" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Download Full Report</span>
                  <span className="sm:hidden">Download Report</span>
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => alert('Contact our team to schedule a consultation')}>
                  <span className="hidden sm:inline">Schedule Consultation</span>
                  <span className="sm:hidden">Schedule Call</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryModal;