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
  ChevronRight
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
      "h-screen bg-surface-low border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-18" : "w-60"
    )}>
      {/* Header with toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">Θ</span>
            </div>
            <span className="font-semibold text-foreground">Theta</span>
          </div>
        )}
        <button
          onClick={toggleCollapsed}
          className="p-2 hover:bg-surface-mid rounded-lg transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-text-secondary" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {/* Primary navigation */}
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                "hover:bg-surface-mid focus:bg-surface-mid focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
                active && "bg-brand-muted text-brand-primary font-medium",
                !active && "text-text-secondary hover:text-foreground"
              )}
              aria-label={collapsed ? item.label : undefined}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                active && "text-brand-primary"
              )} />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
              {active && !collapsed && (
                <div className="w-1 h-1 bg-brand-primary rounded-full ml-auto" />
              )}
            </NavLink>
          );
        })}

        {/* Separator */}
        <div className="h-px bg-border my-4" />

        {/* Secondary navigation */}
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-surface-mid focus:bg-surface-mid focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
                active && "bg-brand-muted text-brand-primary font-medium",
                !active && "text-text-secondary hover:text-foreground"
              )}
              aria-label={collapsed ? item.label : undefined}
            >
              <Icon className={cn(
                "w-4 h-4 flex-shrink-0 transition-colors",
                active && "text-brand-primary"
              )} />
              {!collapsed && (
                <span className="truncate text-sm">{item.label}</span>
              )}
            </NavLink>
          );
        })}

        {/* Add playlist button */}
        <button
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 w-full",
            "hover:bg-surface-mid focus:bg-surface-mid focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
            "text-text-secondary hover:text-foreground"
          )}
          aria-label={collapsed ? "Create playlist" : undefined}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!collapsed && (
            <span className="truncate text-sm">Create Playlist</span>
          )}
        </button>
      </nav>

      {/* User section - if not collapsed */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">User</p>
              <p className="text-xs text-text-secondary truncate">Free Plan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default NavRail;