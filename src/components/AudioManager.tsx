import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Create audio element for background music
    const audio = new Audio();
    // You would replace this with actual audio file
    // audio.src = '/audio/birthday-music.mp3';
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleAudio}
        className="bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-smooth glow-primary"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-smooth glow-primary"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};