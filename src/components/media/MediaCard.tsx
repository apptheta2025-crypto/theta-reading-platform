import React from 'react';
import { Play, Headphones, Book, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { usePlayer, MediaItem } from '@/contexts/PlayerContext';
import { useMode } from '@/contexts/ModeContext';

interface MediaCardProps {
  item: MediaItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({ 
  item, 
  className, 
  size = 'md',
  showProgress = false 
}) => {
  const { play } = usePlayer();
  const { mode } = useMode();

  const handlePlay = () => {
    play(item);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const sizeClasses = {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64'
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case 'audiobook':
        return <Headphones className="w-3 h-3" />;
      case 'podcast':
        return <Headphones className="w-3 h-3" />;
      default:
        return <Book className="w-3 h-3" />;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'audiobook':
        return 'bg-blue-500/20 text-blue-400';
      case 'podcast':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-orange-500/20 text-orange-400';
    }
  };

  return (
    <div className={cn(
      "group relative bg-surface-low rounded-lg overflow-hidden transition-all duration-200",
      "hover:bg-surface-mid focus-within:bg-surface-mid",
      "hover:shadow-lg hover:shadow-brand-primary/10",
      sizeClasses[size],
      className
    )}>
      {/* Cover image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={item.cover} 
          alt={`${item.title} cover`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Type badge */}
        <Badge 
          variant="secondary"
          className={cn(
            "absolute top-2 left-2 text-xs gap-1",
            getTypeColor()
          )}
        >
          {getTypeIcon()}
          {item.type}
        </Badge>

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button
            onClick={handlePlay}
            size="sm"
            className="bg-brand-primary hover:bg-brand-glow text-white rounded-full h-12 w-12 p-0"
            aria-label={`Play ${item.title}`}
          >
            <Play className="w-5 h-5 ml-0.5" />
          </Button>
        </div>

        {/* Progress bar */}
        {showProgress && item.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-brand-primary transition-all duration-300"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-foreground text-sm leading-tight truncate mb-1">
          {item.title}
        </h3>
        <p className="text-text-secondary text-xs truncate mb-2">
          {item.author}
        </p>
        
        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDuration(item.duration)}</span>
          </div>
          
          {/* Rating placeholder */}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-yellow-500" />
            <span>4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;