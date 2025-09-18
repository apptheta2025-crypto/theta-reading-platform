import React, { useState } from 'react';
import { Search, Grid3X3, Bell, User, Crown, Heart, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useMode } from '@/contexts/ModeContext';
import { useAuth } from '@/contexts/AuthContext';
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
  
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="glass-header sticky top-0 z-50 h-16 flex items-center justify-between px-6">
      {/* Left section - Brand */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">Θ</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:block">Theta</span>
        </Link>
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

        {/* Profile/Auth menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.display_name || 'Profile'} />
                  <AvatarFallback className="bg-brand-primary text-white text-sm">
                    {getInitials(profile?.display_name || user.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-popover w-56" align="end" sideOffset={8}>
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.display_name || 'Profile'} />
                  <AvatarFallback className="bg-brand-primary text-white text-sm">
                    {getInitials(profile?.display_name || user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {profile?.display_name || 'User'}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm">
                Sign up
              </Button>
            </Link>
          </div>
        )}

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