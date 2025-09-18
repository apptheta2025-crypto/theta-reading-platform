import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SponsoredTileProps {
  title: string;
  description: string;
  backgroundImage: string;
  backgroundColor?: string;
  ctaText?: string;
  ctaUrl?: string;
  className?: string;
}

const SponsoredTile: React.FC<SponsoredTileProps> = ({
  title,
  description,
  backgroundImage,
  backgroundColor = '#FCD34D', // Default yellow
  ctaText = 'Learn More',
  ctaUrl,
  className
}) => {
  const handleClick = () => {
    if (ctaUrl) {
      window.open(ctaUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl h-48 w-full group cursor-pointer",
      "transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
      className
    )} 
    onClick={handleClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    }}
    aria-label={`Sponsored content: ${title}`}
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor }}
      />
      
      {/* Background image */}
      <div className="absolute inset-0 flex items-center justify-end pr-6">
        <img 
          src={backgroundImage}
          alt=""
          className="h-full w-auto object-cover opacity-90"
          role="presentation"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <Badge 
            variant="secondary"
            className="bg-black/20 text-white border-white/20 text-xs"
          >
            Sponsored
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Play sponsored content"
            onClick={(e) => {
              e.stopPropagation();
              // Handle play action
            }}
          >
            <Play className="w-4 h-4 ml-0.5" />
          </Button>
        </div>

        {/* Title and description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed">
            {description}
          </p>
          
          {/* CTA */}
          <div className="flex items-center gap-2 mt-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-gray-900 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              {ctaText}
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
};

export default SponsoredTile;