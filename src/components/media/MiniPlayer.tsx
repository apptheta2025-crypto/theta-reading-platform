import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { usePlayer } from '@/contexts/PlayerContext';

const MiniPlayer: React.FC = () => {
  const { 
    state, 
    togglePlay, 
    skipForward, 
    skipBackward, 
    seek, 
    setVolume 
  } = usePlayer();

  if (!state.currentItem) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = state.currentItem.duration > 0 
    ? (state.currentTime / state.currentItem.duration) * 100 
    : 0;

  return (
    <div className="fixed bottom-4 left-4 right-4 h-16 bg-surface-low/95 backdrop-blur-md border border-border/50 rounded-2xl z-40 shadow-lg">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-surface-mid/50 rounded-t-2xl">
        <div 
          className="h-full bg-white transition-all duration-300 rounded-t-2xl"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-center h-full px-6">
        {/* Playback controls - centered */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => skipBackward(15)}
            className="h-8 w-8 p-0 text-text-secondary hover:text-foreground"
            aria-label="Skip backward 15 seconds"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            onClick={togglePlay}
            className="h-8 w-8 p-0 bg-white hover:bg-gray-100 text-black rounded-full"
            aria-label={state.isPlaying ? "Pause" : "Play"}
          >
            {state.isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => skipForward(15)}
            className="h-8 w-8 p-0 text-text-secondary hover:text-foreground"
            aria-label="Skip forward 15 seconds"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;