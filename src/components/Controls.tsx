import { Button } from '@/components/ui/button';
import { RotateCcw, Zap, Gift, Sparkles } from 'lucide-react';

export const Controls = () => {
  const resetCamera = () => {
    // This would reset camera position - implemented in the 3D scene
    window.dispatchEvent(new CustomEvent('resetCamera'));
  };

  const triggerFireworks = () => {
    // Trigger celebration effect
    window.dispatchEvent(new CustomEvent('triggerCelebration'));
  };

  const spawnGifts = () => {
    // Spawn more gift boxes
    window.dispatchEvent(new CustomEvent('spawnGifts'));
  };

  const addSparkles = () => {
    // Add more sparkle effects
    window.dispatchEvent(new CustomEvent('addSparkles'));
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 max-w-screen-sm">
        <Button
          variant="outline"
          size="sm"
          onClick={resetCamera}
          className="bg-transparent border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-smooth hover-glow"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset View
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={triggerFireworks}
          className="bg-transparent border-secondary/20 hover:bg-secondary/20 hover:border-secondary/40 transition-smooth hover-glow"
        >
          <Zap className="h-4 w-4 mr-2" />
          Fireworks
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={spawnGifts}
          className="bg-transparent border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-smooth hover-glow"
        >
          <Gift className="h-4 w-4 mr-2" />
          Gifts
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={addSparkles}
          className="bg-transparent border-purple/20 hover:bg-purple/20 hover:border-purple/40 transition-smooth hover-glow"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Sparkles
        </Button>
      </div>
    </div>
  );
};