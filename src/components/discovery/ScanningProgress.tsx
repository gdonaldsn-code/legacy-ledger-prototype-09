import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle, Clock } from "lucide-react";

interface ScanningProgressProps {
  currentStep: number;
  scanningSteps: string[];
  onSkipToResults: () => void;
}

const ScanningProgress = ({ currentStep, scanningSteps, onSkipToResults }: ScanningProgressProps) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">AI Discovery in Progress</h3>
        <p className="text-blue-soft">{scanningSteps[currentStep]}</p>
      </div>
      
      <div className="space-y-3">
        {scanningSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            {index < currentStep ? (
              <CheckCircle className="h-5 w-5 text-success-green" />
            ) : index === currentStep ? (
              <div className="w-5 h-5 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
            ) : (
              <Clock className="h-5 w-5 text-blue-soft/50" />
            )}
            <span className={`text-sm ${index <= currentStep ? 'text-white' : 'text-blue-soft/50'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      
      <Progress value={(currentStep + 1) * 25} className="w-full" />
      
      <Button 
        onClick={onSkipToResults} 
        className="w-full mt-4"
        variant="hero"
      >
        Skip to Results
      </Button>
    </div>
  );
};

export default ScanningProgress;