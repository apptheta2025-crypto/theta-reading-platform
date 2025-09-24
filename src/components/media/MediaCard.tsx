import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Headphones, Book, Clock, Star, BookOpen } from 'lucide-react';
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
  const navigate = useNavigate();

  const handlePlay = () => {
    if (item.type === 'ebook') {
      navigate(`/ebook/${item.id}`);
    } else {
      play(item);
    }
  };

  const handleCardClick = () => {
    if (item.type === 'ebook') {
      navigate(`/ebook/${item.id}`);
    }
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
    <div 
      className={cn(
        "group relative theta-card transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-1 focus-within:theta-focus",
        sizeClasses[size],
        item.type === 'ebook' && "cursor-pointer",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Cover image - Full bleed, clean */}
      <div className="relative aspect-square overflow-hidden rounded-t">
        <img 
          src={item.cover} 
          alt={`${item.title} cover`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Type badge - Clean and minimal */}
        <div className={cn(
          "absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium",
          getTypeColor()
        )}>
          <div className="flex items-center gap-1">
            {getTypeIcon()}
            <span className="capitalize">{item.type}</span>
          </div>
        </div>

        {/* Action button - Bold and clear */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button
            onClick={handlePlay}
            size="lg"
            className="theta-button-primary px-6 py-3 text-base font-semibold"
            aria-label={item.type === 'ebook' ? `View ${item.title}` : `Play ${item.title}`}
          >
            {item.type === 'ebook' ? (
              <>
                <BookOpen className="w-5 h-5" />
                View Book
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Play Now
              </>
            )}
          </Button>
        </div>

        {/* Progress bar - Clean indicator */}
        {showProgress && item.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div 
              className="h-full bg-theta-purple transition-all duration-300"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content - Clear hierarchy */}
      <div className="p-4 space-y-2">
        <h3 className="font-heading font-semibold text-foreground text-base leading-tight line-clamp-2">
          {item.title}
        </h3>
        <p className="text-text-secondary text-sm line-clamp-1">
          {item.author}
        </p>
        
        {/* Metadata - Clean and organized */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-text-secondary">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(item.duration)}</span>
          </div>
          
          {/* Rating - Clear and accessible */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-theta-gold" />
            <span className="text-text-secondary font-medium">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;