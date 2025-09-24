import React, { useMemo, useState } from 'react';
import { Search, Grid3X3, Bell, User, Crown, LogOut, Settings } from 'lucide-react';
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
import { allContent } from '@/data/mockData';

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
  const { mode } = useMode();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [] as { id: string; title: string; author?: string; cover?: string }[];
    return allContent
      .filter((item) => {
        // Filter by mode: 'read' shows ebooks only, 'listen' shows audiobooks and podcasts
        const matchesMode = mode === 'read' 
          ? item.type === 'ebook'
          : item.type === 'audiobook' || item.type === 'podcast';
        
        const matchesSearch = item.title.toLowerCase().includes(q) || item.author?.toLowerCase().includes(q);
        
        return matchesMode && matchesSearch;
      })
      .slice(0, 6)
      .map((i) => ({ id: i.id, title: i.title, author: i.author, cover: i.cover }));
  }, [searchQuery, mode]);

  return (
    <header className="theta-header sticky top-0 z-50 h-20 flex items-center justify-between px-8">
      {/* Left section - Theta Brand */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-theta-purple rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <span className="text-lg font-bold text-white">Θ</span>
          </div>
          <span className="font-heading font-bold text-foreground text-xl hidden sm:block">Theta</span>
        </Link>
      </div>

      {/* Center section - Search */}
      {showSearch && (
        <div className="flex-1 max-w-3xl mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <Input
              type="search"
              placeholder="Search our enormous library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-12 pr-12 h-12 bg-surface-mid border-2 border-border rounded-lg",
                "focus:border-theta-purple focus:ring-0 focus:theta-focus",
                "placeholder:text-text-secondary text-base"
              )}
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 theta-surface-elevated border-2 border-border rounded-lg overflow-hidden z-50 shadow-lg">
                <ul role="listbox">
                  {suggestions.map((s) => (
                    <li key={s.id} role="option">
                      <button
                        className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-surface-mid focus:theta-focus transition-colors"
                        onClick={() => setSearchQuery(s.title)}
                      >
                        {s.cover && (
                          <img src={s.cover} alt="" className="w-10 h-12 object-cover rounded" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{s.title}</p>
                          {s.author && (
                            <p className="text-xs text-text-secondary truncate">{s.author}</p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {onMaximizeSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMaximizeSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface-high"
                aria-label="Maximize search"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Filter chips - shown conditionally */}
          {showFilters && (
            <div className="mt-4">
              <FilterChips />
            </div>
          )}
        </div>
      )}

      {/* Right section - Actions */}
      <div className="flex items-center gap-3">
        {/* Mode toggle */}
        <ModeToggle />

        {/* Notifications */}
        <Link to="/notifications">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative p-3 hover:bg-surface-mid rounded-lg"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full"
              >
                {notifications.length}
              </Badge>
            )}
          </Button>
        </Link>

        {/* Profile/Auth menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-lg p-0 hover:bg-surface-mid">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.display_name || 'Profile'} />
                  <AvatarFallback className="bg-theta-purple text-white text-sm font-semibold">
                    {getInitials(profile?.display_name || user.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="theta-surface-elevated w-64 p-0 border-2 border-border" align="end" sideOffset={8}>
              <div className="flex items-center gap-3 p-4 border-b-2 border-border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.display_name || 'Profile'} />
                  <AvatarFallback className="bg-theta-purple text-white text-sm font-semibold">
                    {getInitials(profile?.display_name || user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {profile?.display_name || 'User'}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-mid">
                  <User className="w-4 h-4" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-mid">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-mid text-red-600">
                <LogOut className="w-4 h-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="px-4 py-2">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm" className="px-4 py-2">
                Sign up
              </Button>
            </Link>
          </div>
        )}

        {/* CTA Buttons - Clear and confident */}
        <Button 
          variant="outline" 
          size="sm"
          className="hidden sm:flex border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white px-4 py-2"
        >
          Support
        </Button>
        
        <Button 
          size="sm"
          className="hidden sm:flex theta-button-primary gap-2 px-4 py-2"
        >
          <Crown className="w-4 h-4" />
          Get Premium
        </Button>
      </div>
    </header>
  );
};

export default GlassHeader;