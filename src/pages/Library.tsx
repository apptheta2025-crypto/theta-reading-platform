import React, { useState, useEffect } from 'react';
import { Grid, List, Download, User, Search, Filter, Play, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FilterChips from '@/components/ui/FilterChips';
import MediaCard from '@/components/media/MediaCard';
import { allContent } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useMode } from '@/contexts/ModeContext';

interface LibraryProps {
  hideHeader?: boolean;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

const Library: React.FC<LibraryProps> = ({ hideHeader = false, viewMode: externalViewMode, onViewModeChange }) => {
  const [internalViewMode, setInternalViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { mode } = useMode();
  
  // Use external viewMode if provided, otherwise use internal state
  const viewMode = externalViewMode ?? internalViewMode;
  const setViewMode = onViewModeChange ?? setInternalViewMode;

  const filteredContent = allContent.filter(item => {
    // Filter by mode: 'read' shows ebooks only, 'listen' shows audiobooks and podcasts
    const matchesMode = mode === 'read' 
      ? item.type === 'ebook'
      : item.type === 'audiobook' || item.type === 'podcast';
    
    const matchesFilter = selectedFilter === 'All' || 
      item.title.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      item.author.toLowerCase().includes(selectedFilter.toLowerCase());
    
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesMode && matchesFilter && matchesSearch;
  });


  const downloadedItems = allContent.filter(item => {
    // Filter by mode first, then apply download filter
    const matchesMode = mode === 'read' 
      ? item.type === 'ebook'
      : item.type === 'audiobook' || item.type === 'podcast';
    return matchesMode && Math.random() > 0.5; // Mock downloaded items
  });
  
  const authorGroups = filteredContent.reduce((acc, item) => {
    if (!acc[item.author]) {
      acc[item.author] = [];
    }
    acc[item.author].push(item);
    return acc;
  }, {} as Record<string, typeof allContent>);

  return (
    <main className="relative pb-24 min-h-screen">
      <div className="relative px-6 py-8 space-y-8">
        {/* Header Section */}
        {!hideHeader && (
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-foreground tracking-tight">Your Library</h1>
              <p className="text-text-secondary/80 text-lg">Discover and organize your content</p>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary/60" />
            </div>
            <input
              type="search"
              placeholder="Search your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full h-12 pl-12 pr-4 rounded-full backdrop-blur-xl border border-white/30 shadow-2xl text-foreground placeholder:text-text-secondary/60 focus:outline-none focus:border-white/40 focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-black/40 hover:bg-black/50 focus:bg-black/50 transition-all duration-300"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300",
              showFilters && "bg-accent-primary/20 border-accent-primary/50"
            )}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Chips */}
        {showFilters && (
          <div className="glass-panel p-6 animate-in slide-in-from-top-2 duration-300">
            <FilterChips onFilterChange={setSelectedFilter} />
          </div>
        )}

        {/* Tabs with Glass Effect */}
        <Tabs defaultValue="all" className="space-y-8">
          <div className="glass-panel p-2">
            <TabsList className="bg-transparent w-full justify-start">
              <TabsTrigger 
                value="all" 
                className="tab-trigger data-[state=active]:bg-accent-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-primary/25 px-6 py-3 rounded-xl transition-all duration-300"
              >
                All Content
              </TabsTrigger>
              <TabsTrigger 
                value="downloads" 
                className="tab-trigger data-[state=active]:bg-accent-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-primary/25 px-6 py-3 rounded-xl transition-all duration-300"
              >
                Downloads
              </TabsTrigger>
              <TabsTrigger 
                value="authors" 
                className="tab-trigger data-[state=active]:bg-accent-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-primary/25 px-6 py-3 rounded-xl transition-all duration-300"
              >
                By Authors
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All content */}
          <TabsContent value="all" className="space-y-8">
            {/* Content Stats */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{filteredContent.length}</div>
                    <div className="text-sm text-text-secondary">Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{new Set(filteredContent.map(item => item.author)).size}</div>
                    <div className="text-sm text-text-secondary">Authors</div>
                  </div>
                </div>
                <div className="text-sm text-text-secondary/80">
                  {searchQuery && `Search results for "${searchQuery}"`}
                </div>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {filteredContent.map((item, index) => (
                  <div
                    key={item.id}
                    className="group glass-tile p-4 animate-in fade-in duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <MediaCard item={item} size="sm" showProgress />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredContent.map((item, index) => (
                  <div
                    key={item.id}
                    className="group glass-tile flex items-center gap-6 p-6 animate-in slide-in-from-left-2 duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={item.cover}
                        alt={`${item.title} cover`}
                        className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" className="rounded-full w-10 h-10 p-0 bg-accent-primary hover:bg-accent-glow">
                          <Play className="w-4 h-4 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg truncate group-hover:text-accent-primary transition-colors">{item.title}</h3>
                      <p className="text-text-secondary truncate">{item.author}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-accent-primary/20 text-accent-primary px-2 py-1 rounded-full">
                          {item.type}
                        </span>
                        <span className="text-xs text-text-secondary/60">
                          {Math.floor(Math.random() * 60) + 1} min
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Downloads */}
          <TabsContent value="downloads" className="space-y-8">
            {/* Downloads Stats */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-primary/20 rounded-2xl">
                    <Download className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Downloads</h3>
                    <p className="text-text-secondary">{downloadedItems.length} items available offline</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {Math.round((downloadedItems.length / allContent.length) * 100)}%
                  </div>
                  <div className="text-sm text-text-secondary">of library</div>
                </div>
              </div>
            </div>

            {downloadedItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {downloadedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group glass-tile p-4 animate-in fade-in duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <MediaCard item={item} size="sm" showProgress />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel text-center py-16">
                <div className="w-24 h-24 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-12 h-12 text-accent-primary/60" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">No downloads yet</h3>
                <p className="text-text-secondary text-lg mb-6 max-w-md mx-auto">
                  Download content to listen offline and access your library anywhere
                </p>
                <Button className="bg-accent-primary hover:bg-accent-glow text-white px-8 py-3 rounded-2xl">
                  <Download className="w-5 h-5 mr-2" />
                  Start Downloading
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Authors */}
          <TabsContent value="authors" className="space-y-8">
            {/* Authors Stats */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-primary/20 rounded-2xl">
                    <User className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">By Authors</h3>
                    <p className="text-text-secondary">{Object.keys(authorGroups).length} authors in your library</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {Object.keys(authorGroups).length}
                  </div>
                  <div className="text-sm text-text-secondary">unique authors</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(authorGroups).map(([author, items], authorIndex) => (
                <div key={author} className="animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${authorIndex * 100}ms` }}>
                  <div className="glass-panel p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-glow rounded-2xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{author}</h3>
                          <p className="text-text-secondary">{items.length} items</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-accent-primary hover:text-accent-glow">
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                    {items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="group glass-tile p-4 animate-in fade-in duration-300"
                        style={{ animationDelay: `${(authorIndex * 100) + (itemIndex * 50)}ms` }}
                      >
                        <MediaCard item={item} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Library;