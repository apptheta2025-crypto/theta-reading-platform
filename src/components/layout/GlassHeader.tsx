import React, { useState } from 'react';
import { Search, Grid3X3, Bell, User, Crown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useMode } from '@/contexts/ModeContext';
import ModeToggle from '@/components/ui/ModeToggle';
import FilterChips from '@/components/ui/FilterChips';

interface GlassHeaderProps {
  showSearch?: boolean;
  showFilters?: boolean;
  onMaximizeSearch?: () => void;
}

const GlassHeader: React.FC<GlassHeaderProps> = ({ 
  showSearch = true, 
  showFilters = false,
  onMaximizeSearch 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, title: 'New audiobook added', type: 'update', time: '2h ago' },
    { id: 2, title: 'Your download is complete', type: 'info', time: '4h ago' },
  ]);

  return (
    <header className="glass-header sticky top-0 z-50 h-16 flex items-center justify-between px-6">
      {/* Left section - Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">Θ</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:block">Theta</span>
        </div>
      </div>

      {/* Center section - Search */}
      {showSearch && (
        <div className="flex-1 max-w-2xl mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input
              type="search"
              placeholder="Search our enormous library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 pr-12 bg-surface-mid/50 border-border hover:border-brand-primary/50",
                "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50",
                "placeholder:text-text-secondary"
              )}
            />
            {onMaximizeSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMaximizeSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-brand-primary/10"
                aria-label="Maximize search"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Filter chips - shown conditionally */}
          {showFilters && (
            <div className="mt-3">
              <FilterChips />
            </div>
          )}
        </div>
      )}

      {/* Right section - Actions */}
      <div className="flex items-center gap-2">
        {/* Mode toggle */}
        <ModeToggle />

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative p-2 hover:bg-surface-mid/50"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="glass-popover w-80 p-0" 
            align="end"
            sideOffset={8}
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="p-4 border-b border-border last:border-b-0 hover:bg-surface-mid/30 transition-colors"
                  >
                    <p className="text-sm text-foreground">{notification.title}</p>
                    <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-text-secondary">
                  No notifications
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 hover:bg-surface-mid/50"
              aria-label="Profile menu"
            >
              <User className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="glass-popover w-64 p-0" 
            align="end"
            sideOffset={8}
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">U</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">User</p>
                  <p className="text-sm text-text-secondary">Free Plan</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-text-secondary hover:text-foreground"
              >
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-text-secondary hover:text-foreground"
              >
                <Heart className="w-4 h-4" />
                Liked Items
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* CTA Buttons */}
        <Button 
          variant="outline" 
          size="sm"
          className="hidden sm:flex border-brand-primary/50 text-brand-primary hover:bg-brand-primary/10"
        >
          Support
        </Button>
        
        <Button 
          size="sm"
          className="hidden sm:flex bg-brand-primary hover:bg-brand-glow text-white gap-2"
        >
          <Crown className="w-4 h-4" />
          Get Premium
        </Button>
      </div>
    </header>
  );
};

export default GlassHeader;