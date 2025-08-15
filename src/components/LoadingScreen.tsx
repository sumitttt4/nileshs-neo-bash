import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-rainbow animate-pulse-glow">
            Preparing Birthday Magic
          </h1>
          <p className="text-xl text-muted-foreground">
            Loading 3D experience for Nilesh...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-primary glow-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Animated Elements */}
        <div className="flex justify-center space-x-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-secondary animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Fun Loading Messages */}
        <div className="text-lg text-primary animate-pulse-glow">
          {progress < 25 && "🎈 Inflating balloons..."}
          {progress >= 25 && progress < 50 && "🎂 Baking the cake..."}
          {progress >= 50 && progress < 75 && "🎉 Setting up confetti..."}
          {progress >= 75 && "✨ Adding birthday sparkles..."}
        </div>
      </div>
    </div>
  );
};