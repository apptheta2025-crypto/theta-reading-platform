import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavRail from './NavRail';
import GlassHeader from './GlassHeader';
import MiniPlayer from '@/components/media/MiniPlayer';
import { cn } from '@/lib/utils';

const ThetaLayout: React.FC = () => {
  const location = useLocation();
  
  const showSearch = ['/search', '/library', '/students'].includes(location.pathname);
  const showFilters = location.pathname === '/search';

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="flex w-full">
        {/* Navigation Rail */}
        <NavRail />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Glass Header */}
          <GlassHeader 
            showSearch={showSearch}
            showFilters={showFilters}
          />
          
          {/* Page content */}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Mini Player */}
      <MiniPlayer />
    </div>
  );
};

export default ThetaLayout;