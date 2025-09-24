import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  ListMusic, 
  Heart, 
  Radio,
  Clock,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const primaryItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Library', href: '/library', icon: Library },
  { label: 'Playlists', href: '/playlists', icon: ListMusic },
  { label: 'Liked', href: '/liked', icon: Heart },
  { label: 'Episodes', href: '/episodes', icon: Radio },
];

const secondaryItems: NavItem[] = [
  { label: 'Recently Added', href: '/recent', icon: Clock },
  { label: 'Downloaded', href: '/downloads', icon: Download },
];

const NavRail: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={cn(
      "h-screen theta-surface transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header with Theta branding */}
      <div className="flex items-center justify-between p-6 border-b-2 border-theta-purple">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-theta-purple rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">Θ</span>
            </div>
            <span className="font-heading font-bold text-foreground text-lg">Theta</span>
          </div>
        )}
        <button
          onClick={toggleCollapsed}
          className="p-2 hover:bg-surface-mid rounded transition-colors focus:theta-focus"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Primary navigation */}
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group",
                "hover:bg-surface-mid focus:theta-focus",
                active && "bg-theta-purple text-white shadow-sm",
                !active && "text-text-secondary hover:text-foreground hover:bg-surface-mid"
              )}
              aria-label={collapsed ? item.label : undefined}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                active && "text-white",
                !active && "text-text-secondary group-hover:text-foreground"
              )} />
              {!collapsed && (
                <span className="font-medium truncate">{item.label}</span>
              )}
            </NavLink>
          );
        })}

        {/* Separator */}
        <div className="theta-divider my-6" />

        {/* Secondary navigation */}
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-surface-mid focus:theta-focus",
                active && "bg-theta-purple/20 text-theta-purple border border-theta-purple/30",
                !active && "text-text-secondary hover:text-foreground hover:bg-surface-mid"
              )}
              aria-label={collapsed ? item.label : undefined}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                active && "text-theta-purple",
                !active && "text-text-secondary group-hover:text-foreground"
              )} />
              {!collapsed && (
                <span className="font-medium truncate text-sm">{item.label}</span>
              )}
            </NavLink>
          );
        })}


        {/* Add playlist button - Clear CTA */}
        <button
          className={cn(
            "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 w-full",
            "hover:bg-surface-mid focus:theta-focus",
            "text-text-secondary hover:text-foreground hover:bg-surface-mid"
          )}
          aria-label={collapsed ? "Create playlist" : undefined}
        >
          <Plus className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <span className="font-medium truncate text-sm">Create Playlist</span>
          )}
        </button>
      </nav>

      {/* User section - Clean and professional */}
      {!collapsed && (
        <div className="p-6 border-t-2 border-border">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-theta-purple rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">User</p>
              <p className="text-sm text-text-secondary truncate">Free Plan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default NavRail;