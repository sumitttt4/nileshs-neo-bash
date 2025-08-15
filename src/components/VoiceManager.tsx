import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Mic } from 'lucide-react';

export const VoiceManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useState<HTMLAudioElement | null>(null)[0];

  const generateSpeech = async () => {
    try {
      setError(null);
      setIsPlaying(true);

      // Create speech synthesis using Web Speech API as fallback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Happy Birthday Nilesh Motkaaaaaaaaaaaaaa!');
        utterance.voice = speechSynthesis.getVoices().find(voice => 
          voice.name.includes('Female') || voice.name.includes('Google')
        ) || speechSynthesis.getVoices()[0];
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        utterance.volume = 0.8;
        
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          setIsPlaying(false);
          setError('Speech synthesis failed');
        };

        speechSynthesis.speak(utterance);
      } else {
        setError('Speech synthesis not supported');
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Speech generation failed:', err);
      setError('Failed to generate speech');
      setIsPlaying(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  // Auto-play birthday message on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      generateSpeech();
    }, 2000); // 2 second delay after page load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 flex gap-2">
      <Button
        variant="neon"
        size="icon"
        onClick={isPlaying ? stopSpeech : generateSpeech}
        className="bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-smooth glow-primary"
        disabled={isPlaying}
      >
        <Mic className="h-4 w-4" />
      </Button>
      
      {error && (
        <div className="text-xs text-destructive bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
};