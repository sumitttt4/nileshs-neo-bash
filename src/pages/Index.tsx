import { BirthdayScene } from '@/components/BirthdayScene';

const Index = () => {
  return (
    <div className="relative w-full h-screen">
      <BirthdayScene />
      
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-gradient-rainbow animate-pulse-glow drop-shadow-2xl">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient-primary glow-primary drop-shadow-xl">
            Nilesh
          </h2>
          <p className="text-xl md:text-2xl text-accent animate-sparkle">
            🎉 Click anywhere to celebrate! 🎂
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;