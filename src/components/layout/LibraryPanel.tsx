import React, { useState } from 'react';
import { Plus, Library, ChevronLeft, ChevronRight, Maximize2, Minimize2, X, Music, Users, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LibraryPanelProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isExpanded?: boolean;
  onToggleExpanded?: (expanded: boolean) => void;
}

const LibraryPanel: React.FC<LibraryPanelProps> = ({ 
  isCollapsed = false, 
  onToggleCollapse,
  isExpanded = false,
  onToggleExpanded
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const filters = ['All', 'Downloads', 'Authors', 'Favorites', 'Recent', 'Playlists', 'Books', 'Audiobooks', 'Podcasts'];

  return (
    <aside className="h-full w-full transition-all duration-300 flex flex-col">
      {/* Library Header - At the top */}
      <div className="p-2 relative">
        <div className={cn(
          "flex items-center mb-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (isExpanded) {
                    onToggleExpanded?.(false);
                    onToggleCollapse?.();
                  } else {
                    onToggleCollapse?.();
                  }
                }}
                className="p-2 hover:bg-transparent rounded transition-colors duration-200 group-hover:scale-110 transition-transform duration-200"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <div className="relative w-7 h-7 flex items-center justify-center">
                  {/* Library Icon - Hidden on hover */}
                  <img 
                    src="/Library icon image.png"
                    alt="Library Icon"
                    className="w-7 h-7 group-hover:opacity-0 transition-opacity duration-200"
                  />
                  {/* Toggle Icon - Visible on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {isCollapsed ? (
                      <ChevronRight className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronLeft className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              </Button>
            </div>
            {!isCollapsed && (
              <span className="text-white font-black font-gilroy-black" style={{ fontSize: '27px' }}>Library</span>
            )}
          </div>
          
          {/* Top Right Buttons */}
          {!isCollapsed && (
            <div className="flex items-center gap-0">
              {/* Create Playlist Button */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreatePopup(!showCreatePopup)}
                  className="p-3 hover:bg-transparent rounded-lg transition-colors duration-200"
                  aria-label="Create Playlist"
                >
                  <div className="w-8 h-8 bg-[#0f0f0f] rounded-full flex items-center justify-center">
                    <div className={`transition-transform duration-200 ${showCreatePopup ? 'rotate-45' : 'rotate-0'}`}>
                      <Plus className="w-4 h-4 text-white font-bold" />
                    </div>
                  </div>
                </Button>
                
              {/* Create Options Popup */}
              {showCreatePopup && (
                <div 
                  className="absolute top-12 left-0 z-50 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                  onClick={(e) => e.stopPropagation()}
                  style={{ transform: 'translateX(-50%)' }}
                >
                    <div className="bg-[#282828] rounded-xl p-4 w-64 shadow-2xl">
                      <div className="space-y-2">
                        {/* Playlist Option */}
                        <div 
                          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group"
                          onClick={() => {
                            // Handle playlist creation logic here
                            setShowCreatePopup(false);
                          }}
                        >
                          <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                            <Music className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Playlist</h3>
                            <p className="text-[#A7A7A7] text-xs">Create a playlist with songs or episodes</p>
                          </div>
                        </div>

                        {/* Blend Option */}
                        <div 
                          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group"
                          onClick={() => {
                            // Handle blend creation logic here
                            setShowCreatePopup(false);
                          }}
                        >
                          <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Blend</h3>
                            <p className="text-[#A7A7A7] text-xs">Combine your friends' tastes into a playlist</p>
                          </div>
                        </div>

                        {/* Folder Option */}
                        <div 
                          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group"
                          onClick={() => {
                            // Handle folder creation logic here
                            setShowCreatePopup(false);
                          }}
                        >
                          <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                            <Folder className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Folder</h3>
                            <p className="text-[#A7A7A7] text-xs">Organize your playlists</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
                  {/* Maximize/Minimize Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleExpanded?.(!isExpanded)}
                    className="p-3 hover:bg-transparent rounded-lg transition-colors duration-200"
                    aria-label={isExpanded ? "Minimize Library" : "Maximize Library"}
                  >
                    {isExpanded ? (
                      <Minimize2 className="w-4 h-4 text-white font-bold" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-white font-bold" />
                    )}
                  </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      {!isCollapsed && (
        <div className="p-4 pt-0 border-b border-[#282828] relative">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide relative">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 border border-[#404040] h-6 whitespace-nowrap",
                  activeFilter === filter
                    ? "bg-white text-black hover:bg-gray-100 font-semibold"
                    : "bg-[#282828] text-white hover:bg-[#404040]"
                )}
              >
                {filter}
              </Button>
            ))}
          </div>
          {/* Fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#181818] via-[#181818]/70 via-[#181818]/40 via-[#181818]/15 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#181818] via-[#181818]/70 via-[#181818]/40 via-[#181818]/15 to-transparent pointer-events-none z-10"></div>
        </div>
      )}

      {/* Library Content */}
      {!isCollapsed && (
        <div className="flex-1 p-2 overflow-y-auto overflow-x-hidden relative">
          <div 
            className="grid gap-2" 
            style={{ 
              gridTemplateColumns: isExpanded 
                ? 'repeat(auto-fit, minmax(120px, 1fr))' 
                : 'repeat(auto-fit, minmax(80px, 1fr))' 
            }}
          >
            {/* Placeholder library items - only avatars/photos */}
              {Array.from({ length: 30 }).map((_, index) => (
                <div key={index} className="flex items-center justify-center p-2 transition-all duration-200 cursor-pointer">
                  <div className={cn(
                    "bg-[#333333] flex-shrink-0 transition-all duration-200 hover:bg-[#404040]",
                    isExpanded ? "w-24 h-24" : "w-20 h-20",
                    index % 3 === 0 ? "rounded-lg" : "rounded-full"
                  )} />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Collapsed state - show only icons */}
      {isCollapsed && (
        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
          {/* Plus icon at the top */}
          <div className="flex items-center justify-center p-1">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreatePopup(!showCreatePopup)}
                className="p-3 hover:bg-transparent rounded-lg transition-colors duration-200"
                aria-label="Create Playlist"
              >
                <div className="w-8 h-8 bg-[#0f0f0f] rounded-full flex items-center justify-center">
                  <div className={`transition-transform duration-200 ${showCreatePopup ? 'rotate-45' : 'rotate-0'}`}>
                    <Plus className="w-4 h-4 text-white font-bold" />
                  </div>
                </div>
              </Button>
              
              {/* Create Options Popup */}
              {showCreatePopup && (
                <div 
                  className="absolute top-12 left-0 z-50 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                  onClick={(e) => e.stopPropagation()}
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <div className="bg-[#181818] rounded-xl p-4 w-64 shadow-2xl border border-[#282828]">
                    <div className="space-y-2">
                      {/* Playlist Option */}
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group"
                        onClick={() => {
                          // Handle playlist creation logic here
                          setShowCreatePopup(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                          <Music className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Playlist</h3>
                          <p className="text-[#A7A7A7] text-xs">Create a playlist with songs or episodes</p>
                        </div>
                      </div>

                      {/* Blend Option */}
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group"
                        onClick={() => {
                          // Handle blend creation logic here
                          setShowCreatePopup(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Blend</h3>
                          <p className="text-[#A7A7A7] text-xs">Combine your friends' tastes into a playlist</p>
                        </div>
                      </div>

                      {/* Folder Option */}
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group"
                        onClick={() => {
                          // Handle folder creation logic here
                          setShowCreatePopup(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                          <Folder className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Folder</h3>
                          <p className="text-[#A7A7A7] text-xs">Organize your playlists</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Library items */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center p-1">
              <div className={cn(
                "w-12 h-12 bg-[#333333] flex-shrink-0 transition-all duration-200 hover:bg-[#404040] cursor-pointer",
                index % 3 === 0 ? "rounded-lg" : "rounded-full"
              )} />
            </div>
          ))}
        </div>
      )}

    </aside>
  );
};

export default LibraryPanel;
