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
    <section className={cn("py-6", className)} aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-6">
        <h2 
          id={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}
          className="text-xl font-bold text-foreground"
        >
          {title}
        </h2>
        
        {/* Navigation controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            className="h-8 w-8 p-0 hover:bg-surface-mid text-text-secondary hover:text-foreground"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            className="h-8 w-8 p-0 hover:bg-surface-mid text-text-secondary hover:text-foreground"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Items rail */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pl-6 pr-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="snap-start flex-shrink-0">
            <MediaCard 
              item={item} 
              showProgress={showProgress}
              size="md"
            />
          </div>
        ))}
        
        {/* Show all button */}
        <div className="snap-start flex-shrink-0 w-48 flex items-center justify-center">
          <Button
            variant="outline"
            className="h-full min-h-[280px] border-dashed border-border hover:border-brand-primary/50 text-text-secondary hover:text-foreground"
          >
            Show all
          </Button>
        </div>
      </div>

    </section>
  );
};

export default RailRow;