import React, { useState, useRef, useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Library, Plus, Maximize2, Minimize2, Grid, List, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavRail from './NavRail';
import GlassHeader from './GlassHeader';
import Footer from './Footer';
import MiniPlayer from '@/components/media/MiniPlayer';
import LibraryPage from '@/pages/Library';
import { cn } from '@/lib/utils';

const ThetaLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [libraryWidth, setLibraryWidth] = useState(256); // Default width in pixels
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  
  const showSearch = ['/library', '/students'].includes(location.pathname);
  const showFilters = location.pathname === '/search';

  // Resize functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const container = resizeRef.current?.parentElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;
    
    // Set minimum and maximum widths
    const minWidth = isCollapsed ? 72 : 200;
    const maxWidth = Math.min(containerRect.width * 0.6, 500);
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setLibraryWidth(newWidth);
    }
  }, [isResizing, isCollapsed]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add event listeners for mouse move and up
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Theta Header - Solid and confident */}
      <GlassHeader 
        showSearch={showSearch}
        showFilters={showFilters}
      />
      
      <div className={cn("flex gap-6 p-6 bg-background relative min-h-screen", isResizing && "resizing")} ref={resizeRef}>
        {/* Navigation Rail - Always present but hidden when maximized */}
        <div 
          className={cn(
            "relative z-10 flex flex-col resizable-panel",
            isMaximized && "opacity-0 pointer-events-none",
            isResizing && "transition-none"
          )}
          style={{ width: isCollapsed ? 80 : libraryWidth }}
        >
          <NavRail />
        </div>

        {/* Resize Handle - Clean and minimal */}
        {!isMaximized && !isCollapsed && (
          <div
            className="resize-handle w-1 bg-border cursor-col-resize flex items-center justify-center group hover:bg-theta-purple transition-colors duration-200"
            onMouseDown={handleMouseDown}
          >
            <div className="w-0.5 h-8 bg-text-tertiary group-hover:bg-theta-purple rounded-full transition-colors duration-200" />
          </div>
        )}
        
        {/* Main content area - Solid and clean */}
        {!isMaximized && (
          <div className="relative flex-1 flex flex-col min-w-0 overflow-hidden h-full">
            {/* Main Content Panel - Solid background */}
            <div className="relative flex-1 flex flex-col min-w-0 theta-surface rounded-lg border-2 border-border">
              {/* Page content */}
              <main id="main-content" className="flex-1 main-content relative overflow-auto">
                <div className="h-full p-6">
                  <Outlet />
                </div>
              </main>
              
              {/* Footer */}
              <div className="relative z-10 border-t-2 border-border">
                <Footer />
              </div>
            </div>
          </div>
        )}
        
        {/* Maximized Library Overlay - Solid Design */}
        {isMaximized && (
          <div className="absolute inset-0 z-20 overflow-hidden animate-in fade-in duration-500">
            {/* Main Solid Panel */}
            <div className="relative h-full w-full theta-surface-elevated border-2 border-border rounded-lg">
              {/* Solid Header */}
              <div className="relative flex items-center justify-between p-6 border-b-2 border-border bg-surface-mid">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="group p-3 hover:bg-surface-high rounded-lg transition-all duration-200 focus:theta-focus"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    <div className="relative w-6 h-6">
                      <Library className="w-6 h-6 text-theta-purple group-hover:text-theta-purple-dark transition-colors" />
                    </div>
                  </button>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-foreground text-2xl tracking-tight">Your Library</span>
                    <span className="text-sm text-text-secondary">Browse your collection</span>
                  </div>
                </div>
                
                {/* Right Section */}
                <div className="flex items-center gap-4">
                  {/* View Controls */}
                  <div className="flex items-center gap-1 p-1 bg-surface-low rounded-lg border border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        "px-4 py-2 rounded transition-all duration-200",
                        viewMode === 'grid' 
                          ? "bg-theta-purple text-white" 
                          : "text-text-secondary hover:text-foreground hover:bg-surface-mid"
                      )}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={cn(
                        "px-4 py-2 rounded transition-all duration-200",
                        viewMode === 'list' 
                          ? "bg-theta-purple text-white" 
                          : "text-text-secondary hover:text-foreground hover:bg-surface-mid"
                      )}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate('/create-playlist')}
                      className="group p-3 hover:bg-surface-high rounded-lg transition-all duration-200 focus:theta-focus"
                      title="Create Playlist/Reading List"
                    >
                      <Plus className="w-5 h-5 text-text-secondary group-hover:text-theta-purple transition-colors" />
                    </button>
                    <button 
                      onClick={() => setIsMaximized(false)}
                      className="group p-3 hover:bg-surface-high rounded-lg transition-all duration-200 focus:theta-focus"
                      title="Minimize Library"
                    >
                      <Minimize2 className="w-5 h-5 text-text-secondary group-hover:text-theta-purple transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content Area - Solid background */}
              <div className="relative h-full overflow-auto bg-surface-low">
                <div className="p-6">
                  <LibraryPage hideHeader={true} viewMode={viewMode} onViewModeChange={setViewMode} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mini Player */}
      <MiniPlayer />
    </div>
  );
};

export default ThetaLayout;