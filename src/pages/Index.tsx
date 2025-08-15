import { BirthdayScene } from '@/components/BirthdayScene';

const Index = () => {
  return (
    <div className="relative w-full h-screen">
      <BirthdayScene />
      
      {/* Text Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
        onClick={() => window.dispatchEvent(new CustomEvent('triggerCelebration'))}
      >
        <div className="text-center space-y-4 pointer-events-none">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gradient-rainbow animate-pulse-glow drop-shadow-2xl">
            Happy Birthday
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient-primary glow-primary drop-shadow-xl">
            Nilesh Motka
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-accent animate-sparkle px-4">
            🎉 Click anywhere to celebrate! 🎂
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;