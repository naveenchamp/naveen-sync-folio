import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const loadingSteps = [
    { text: "Initializing...", delay: 200 },
    { text: "Loading projects...", delay: 400 },
    { text: "Syncing data...", delay: 300 },
    { text: "Preparing experience...", delay: 300 },
    { text: "Almost ready...", delay: 200 }
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;

    const updateLoading = () => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text);
        
        const targetProgress = ((currentStep + 1) / loadingSteps.length) * 100;
        const progressIncrement = (targetProgress - currentProgress) / 20;
        
        const progressTimer = setInterval(() => {
          currentProgress += progressIncrement;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressTimer);
            
            setTimeout(() => {
              currentStep++;
              if (currentStep < loadingSteps.length) {
                updateLoading();
              } else {
                setTimeout(onComplete, 500);
              }
            }, loadingSteps[currentStep].delay);
          }
        }, 50);
      }
    };

    updateLoading();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">Naveen.dev</h1>
          <p className="text-muted-foreground">Full Stack Developer</p>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{loadingText}</span>
            <span className="text-sm text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;