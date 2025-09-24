import React from 'react';
import { SkipBack, Play, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BottomPlayer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] h-20 flex items-center justify-center z-40">
      <div className="flex items-center gap-4">
        {/* Previous Track */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-[#404040] rounded-lg transition-colors duration-200"
          aria-label="Previous track"
        >
          <SkipBack className="w-5 h-5 text-white fill-current" />
        </Button>

        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-14 h-14 bg-white rounded-full hover:bg-gray-100 hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-200"
          aria-label="Play/Pause"
        >
          <div className="w-0 h-0 border-l-[10px] border-l-black border-y-[8px] border-y-transparent ml-1" />
        </Button>

        {/* Next Track */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-[#404040] rounded-lg transition-colors duration-200"
          aria-label="Next track"
        >
          <SkipForward className="w-5 h-5 text-white fill-current" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#282828]">
        <div className="h-full bg-white w-1/3 relative">
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
