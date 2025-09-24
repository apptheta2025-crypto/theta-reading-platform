import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MediaCard from './MediaCard';
import { MediaItem } from '@/contexts/PlayerContext';

interface RailRowProps {
  title: string;
  items: MediaItem[];
  className?: string;
  showProgress?: boolean;
}

const RailRow: React.FC<RailRowProps> = ({ 
  title, 
  items, 
  className,
  showProgress = false 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Approximate width of 2 cards
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={cn("glass-panel p-6", className)} aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 
          id={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}
          className="text-2xl font-bold text-foreground"
        >
          {title}
        </h2>
        
        {/* Navigation controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            className="h-10 w-10 p-0 hover:bg-white/10 text-text-secondary hover:text-foreground rounded-2xl backdrop-blur-sm border border-white/10 transition-all duration-300"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            className="h-10 w-10 p-0 hover:bg-white/10 text-text-secondary hover:text-foreground rounded-2xl backdrop-blur-sm border border-white/10 transition-all duration-300"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Items rail */}
      <div 
        ref={scrollRef}
        className="rail-container flex gap-6 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="rail-item">
            <MediaCard 
              item={item} 
              showProgress={showProgress}
              size="md"
            />
          </div>
        ))}
        
        {/* Show all button */}
        <div className="rail-item w-48 flex items-center justify-center">
          <Button
            variant="outline"
            className="h-full min-h-[280px] border-dashed border-border/50 hover:border-brand-primary/50 text-text-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-xl"
          >
            Show all
          </Button>
        </div>
      </div>

    </section>
  );
};

export default RailRow;