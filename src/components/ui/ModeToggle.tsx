import React from 'react';
import { Book, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMode } from '@/contexts/ModeContext';

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useMode();

  console.log('ModeToggle - Component rendered with mode:', mode);

  const handleReadClick = () => {
    console.log('ModeToggle - Read button clicked, current mode:', mode);
    console.log('ModeToggle - Setting mode to read');
    setMode('read');
    console.log('ModeToggle - Mode set to read');
  };

  const handleListenClick = () => {
    console.log('ModeToggle - Listen button clicked, current mode:', mode);
    console.log('ModeToggle - Setting mode to listen');
    setMode('listen');
    console.log('ModeToggle - Mode set to listen');
  };

  return (
    <div className="flex items-center bg-surface-mid rounded-lg p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReadClick}
        className={cn(
          "p-2 h-8 w-8 transition-all duration-200",
          mode === 'read' 
            ? "bg-brand-primary text-white shadow-sm" 
            : "text-text-secondary hover:text-foreground hover:bg-surface-low"
        )}
        aria-label="Read mode"
        aria-pressed={mode === 'read'}
      >
        <Book className="w-4 h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleListenClick}
        className={cn(
          "p-2 h-8 w-8 transition-all duration-200",
          mode === 'listen' 
            ? "bg-brand-primary text-white shadow-sm" 
            : "text-text-secondary hover:text-foreground hover:bg-surface-low"
        )}
        aria-label="Listen mode"
        aria-pressed={mode === 'listen'}
      >
        <Headphones className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ModeToggle;