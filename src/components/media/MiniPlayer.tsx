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
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface-low border-t border-border z-40">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-surface-mid">
        <div 
          className="h-full bg-brand-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between h-full px-4">
        {/* Current media info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img 
            src={state.currentItem.cover} 
            alt={`${state.currentItem.title} cover`}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {state.currentItem.title}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {state.currentItem.author}
            </p>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => skipBackward(15)}
            className="h-10 w-10 p-0 text-text-secondary hover:text-foreground"
            aria-label="Skip backward 15 seconds"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            onClick={togglePlay}
            className="h-10 w-10 p-0 bg-brand-primary hover:bg-brand-glow text-white rounded-full"
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
            className="h-10 w-10 p-0 text-text-secondary hover:text-foreground"
            aria-label="Skip forward 15 seconds"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume and additional controls */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {/* Time display */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-text-secondary">
            <span>{formatTime(state.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(state.currentItem.duration)}</span>
          </div>

          {/* Volume control */}
          <div className="hidden md:flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-text-secondary" />
            <Slider
              value={[state.volume * 100]}
              onValueChange={(value) => setVolume(value[0] / 100)}
              max={100}
              step={1}
              className="w-20"
            />
          </div>

          {/* Additional controls */}
          <div className="hidden lg:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-text-secondary hover:text-foreground"
              aria-label="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-text-secondary hover:text-foreground"
              aria-label="Repeat"
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;