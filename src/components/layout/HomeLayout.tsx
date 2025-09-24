import React, { useState, useRef, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Crown, BookOpen, Headphones, Home as HomeIcon, BookMarked, Volume2, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useMode } from '@/contexts/ModeContext';
import LibraryPanel from './LibraryPanel';
import thetaLogo from '@/assets/theta-logo.png';

const HomeLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [libraryWidth, setLibraryWidth] = useState(350); // Default width in pixels
  const [isResizing, setIsResizing] = useState(false);
  const { mode, setMode } = useMode();
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const resizeRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useAuth();

  // Check if we're on the premium page
  const isPremiumPage = location.pathname === '/premium';

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = async () => {
    await signOut();
    setShowUserPopup(false);
    navigate('/login');
  };

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
    const minWidth = isSidebarCollapsed ? 80 : 250;
    const maxWidth = Math.min(containerRect.width * 0.6, 600);
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setLibraryWidth(newWidth);
    }
  }, [isResizing, isSidebarCollapsed]);

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

  // Close user popup when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserPopup) {
        const target = event.target as Element;
        if (!target.closest('[data-user-popup]')) {
          setShowUserPopup(false);
        }
      }
    };

    if (showUserPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserPopup]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Top Navigation Bar - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-[2.5px] py-[0.3px] mt-1">
          <div className="w-full bg-[#121212] rounded-full px-[2.5px] py-[0.3px] mx-3">
            <div className="flex items-center justify-between">
          {/* Left section - Theta Logo, Home, and Search */}
          <div className="flex items-center gap-2">
            {/* Theta Logo - Top Left */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  navigate('/');
                  setIsLibraryExpanded(false);
                }}
                className="transition-transform duration-200 hover:scale-105"
                aria-label="Go to Home"
              >
                <img 
                  src={thetaLogo}
                  alt="Theta Logo" 
                  className="w-[65px] h-[65px]"
                />
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate('/');
                setIsLibraryExpanded(false);
              }}
              className={`w-12 h-12 rounded-full transition-colors duration-200 border border-[#404040] flex items-center justify-center ${
                location.pathname === '/' && !isLibraryExpanded
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-[#282828] text-white hover:bg-[#404040]'
              }`}
              aria-label="Home"
            >
              <HomeIcon className={`w-5 h-5 ${location.pathname === '/' && !isLibraryExpanded ? 'fill-current text-black' : 'fill-current text-white'}`} />
            </Button>
            
            {/* Search Bar - Next to Home */}
            <div className="relative ml-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A7A7A7]" />
              <Input
                type="search"
                placeholder="Search our enormous library."
                className="pl-12 pr-5 py-5 bg-black border-0 rounded-full text-white placeholder:text-[#A7A7A7] focus:ring-2 focus:ring-[#bc46ea] focus:ring-offset-0 w-80"
              />
            </div>
            
            {/* Read/Listen Mode Toggle - Next to Search */}
            <div className="relative flex bg-[#282828] rounded-full p-1 border border-[#404040] h-12 ml-1">
              {/* Sliding white overlay */}
              <div 
                className={cn(
                  "absolute top-1 bottom-1 bg-white rounded-full transition-all duration-300 ease-in-out z-0",
                  mode === 'read' ? "left-1 w-[calc(50%-4px)]" : "left-[calc(50%-2px)] w-[calc(50%-4px)]"
                )}
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('read')}
                className="px-3 py-5 rounded-xl flex items-center gap-2 z-10 relative transition-all duration-200 h-full hover:bg-transparent flex-1"
              >
                <BookMarked className={cn("w-5 h-5", mode === 'read' ? "fill-current text-black" : "stroke-current text-white fill-none")} />
                <span className={cn("text-base", mode === 'read' ? "font-semibold text-black" : "font-medium text-white")}>Read</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('listen')}
                className="px-3 py-5 rounded-xl flex items-center gap-2 z-10 relative transition-all duration-200 h-full hover:bg-transparent flex-1"
              >
                <Volume2 className={cn("w-5 h-5", mode === 'listen' ? "fill-current text-black" : "stroke-current text-white fill-none")} />
                <span className={cn("text-base", mode === 'listen' ? "font-semibold text-black" : "font-medium text-white")}>Listen</span>
              </Button>
            </div>
          </div>

          {/* Right section - Controls */}
          <div className="flex items-center gap-2">

            {/* Get Premium Button */}
            <Button
              size="sm"
              onClick={() => navigate('/premium')}
              className="bg-white text-black hover:bg-gray-200 px-5 h-12 rounded-full font-inter font-extrabold text-base border border-[#404040] !transition-none hover:!translate-y-0"
            >
              Get Premium
            </Button>

            {/* Support Link */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/support')}
              className="text-[#A7A7A7] hover:text-white hover:bg-transparent px-5 h-12 font-inter font-extrabold"
            >
              Support
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/notifications')}
              className="w-12 h-12 bg-[#282828] hover:bg-[#404040] rounded-full transition-colors duration-200 border border-[#404040] flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-white" />
            </Button>

            {/* Profile Avatar */}
            <div className="relative" data-user-popup>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserPopup(!showUserPopup)}
                className="p-0 h-12 w-12 hover:bg-transparent rounded-full transition-colors duration-200"
                aria-label="User menu"
              >
                <Avatar className="h-12 w-12 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                  <AvatarFallback className="bg-[#bc46ea] text-white font-bold text-lg">
                    {profile?.display_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
              
              {/* User Menu Popup */}
              {showUserPopup && (
                <div 
                  className="absolute top-12 right-0 z-50 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-[#282828] rounded-xl p-4 w-64 shadow-2xl">
                    <div className="space-y-2">
                      {/* User Info */}
                      <div className="px-3 py-2 border-b border-[#404040]">
                        <p className="text-white font-semibold text-sm">
                          {profile?.display_name || 'User'}
                        </p>
                        <p className="text-[#A7A7A7] text-xs">
                          {user?.email}
                        </p>
                      </div>
                      
                      {/* Settings Option */}
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group hover:bg-[#404040]"
                        onClick={() => {
                          navigate('/settings');
                          setShowUserPopup(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                          <Settings className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Settings</h3>
                          <p className="text-[#A7A7A7] text-xs">Manage your preferences</p>
                        </div>
                      </div>

                      {/* Account Option */}
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group hover:bg-[#404040]"
                        onClick={() => {
                          navigate('/account');
                          setShowUserPopup(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Account</h3>
                          <p className="text-[#A7A7A7] text-xs">Manage your account details</p>
                        </div>
                      </div>

                      {/* Upgrade to Premium Option */}
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group hover:bg-[#404040]"
                        onClick={() => {
                          navigate('/premium');
                          setShowUserPopup(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                          <Crown className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Upgrade to Premium</h3>
                          <p className="text-[#A7A7A7] text-xs">Get access to premium features</p>
                        </div>
                      </div>

                      {/* Log Out Option */}
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 group hover:bg-[#404040]"
                        onClick={handleLogout}
                      >
                        <div className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center">
                          <LogOut className="w-5 h-5 text-white group-hover:text-[#bc46ea] transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm group-hover:text-[#bc46ea] transition-colors duration-200">Log Out</h3>
                          <p className="text-[#A7A7A7] text-xs">Sign out of your account</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
            </div>
          </div>
        </div>
      </header>

        {/* Content Area with uniform 8px gaps */}
        <div className="pt-[75px] px-2 pb-6">
        {/* CRITICAL RULES: 
            1. 8px gap between library panel and main content panel - NEVER OVERRIDE
            2. 8px gap between panels and top navigation bar - NEVER OVERRIDE
            3. 8px gap from left and right screen edges - NEVER OVERRIDE
            4. NO BORDERS/STROKES on any panels or navigation - NEVER OVERRIDE */}
        <div className="flex h-[calc(100vh-115px)] bg-[#121212] max-w-full" style={{ gap: isPremiumPage ? '0px' : '8px' }} ref={resizeRef}>
          {/* Floating Library Panel - Hidden on Premium page */}
          {!isPremiumPage && (
            <div 
              className={cn(
                "relative z-40 transition-all duration-300",
                isLibraryExpanded ? "flex-1" : "flex-shrink-0"
              )}
              style={{ width: isLibraryExpanded ? '100%' : (isSidebarCollapsed ? 80 : libraryWidth) }}
            >
              <div className="rounded-xl shadow-2xl h-full w-full p-4" style={{ backgroundImage: 'url(/src/assets/Gemini_Generated_Image_qlzo3qlzo3qlzo3q.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <LibraryPanel 
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={toggleSidebar}
                  isExpanded={isLibraryExpanded}
                  onToggleExpanded={setIsLibraryExpanded}
                />
              </div>
              {/* Invisible resize handle on the right edge */}
              {!isSidebarCollapsed && !isLibraryExpanded && (
                <div
                  className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-50"
                  onMouseDown={handleMouseDown}
                />
              )}
            </div>
          )}

          {/* Floating Main Content Panel - Hidden when library is expanded */}
          {!isLibraryExpanded && (
            <div className={isPremiumPage ? "flex-1 min-w-0" : "flex-1 min-w-0"}>
              <div className="rounded-xl shadow-2xl h-full overflow-hidden w-full p-4" style={{ backgroundImage: 'url(/src/assets/Gemini_Generated_Image_qlzo3qlzo3qlzo3q.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="overflow-auto h-full w-full">
                  <Outlet />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default HomeLayout;
