import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (ctaUrl) {
      // If it's an external URL, open in new tab
      if (ctaUrl.startsWith('http')) {
        window.open(ctaUrl, '_blank', 'noopener,noreferrer');
      } else {
        // If it's an internal route, navigate to it
        navigate(ctaUrl);
      }
    } else if (title.includes('Ruskin Bond')) {
      // Special case for Ruskin Bond - navigate to an ebook
      navigate('/ebook/rb1');
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl h-64 w-full group cursor-pointer glass-tile",
      "transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-primary/20",
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
      
      {/* Content Layout - matching reference */}
      <div className="relative h-full flex items-center p-8">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <p className="text-white text-lg font-medium">Start With</p>
            <h3 className="text-4xl font-bold text-black leading-tight">
              Ruskin Bond
            </h3>
          </div>
          
          {/* CTA */}
          <Button
            variant="secondary"
            size="lg"
            className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-6 py-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Explore Collection
          </Button>
        </div>

        {/* Right side - Images */}
        <div className="flex items-center gap-4">
          {/* Book covers */}
          <div className="flex gap-2">
            <div className="w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-black">RUSKIN BOND</span>
            </div>
            <div className="w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-black">The Blue Umbrella</span>
            </div>
          </div>
          
          {/* Author image */}
          <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">RB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsored badge */}
      <div className="absolute top-4 right-4">
        <Badge 
          variant="secondary"
          className="bg-black/20 text-white border-white/20 text-xs px-2 py-1"
        >
          • Sponsored
        </Badge>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
};

export default SponsoredTile;