import React, { useState } from 'react';
import { Grid, List, Download, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FilterChips from '@/components/ui/FilterChips';
import MediaCard from '@/components/media/MediaCard';
import { allContent } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Library: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredContent = selectedFilter === 'All' 
    ? allContent 
    : allContent.filter(item => 
        item.title.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        item.author.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  const downloadedItems = allContent.filter(item => Math.random() > 0.5); // Mock downloaded items
  const authorGroups = allContent.reduce((acc, item) => {
    if (!acc[item.author]) {
      acc[item.author] = [];
    }
    acc[item.author].push(item);
    return acc;
  }, {} as Record<string, typeof allContent>);

  return (
    <main className="pb-24 min-h-screen">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Your Library</h1>
          
          {/* View controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2",
                viewMode === 'grid' ? "bg-brand-primary text-white" : "text-text-secondary"
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
                "p-2",
                viewMode === 'list' ? "bg-brand-primary text-white" : "text-text-secondary"
              )}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-surface-mid">
            <TabsTrigger value="all" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Downloads
            </TabsTrigger>
            <TabsTrigger value="authors" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Authors
            </TabsTrigger>
          </TabsList>

          {/* All content */}
          <TabsContent value="all" className="space-y-6">
            <FilterChips onFilterChange={setSelectedFilter} />
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredContent.map((item) => (
                  <MediaCard key={item.id} item={item} size="sm" showProgress />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredContent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-surface-mid rounded-lg hover:bg-surface-mid/80 transition-colors"
                  >
                    <img
                      src={item.cover}
                      alt={`${item.title} cover`}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                      <p className="text-sm text-text-secondary truncate">{item.author}</p>
                    </div>
                    <div className="text-sm text-text-secondary">
                      {item.type}
                    </div>
                    <Button variant="ghost" size="sm">
                      Play
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Downloads */}
          <TabsContent value="downloads" className="space-y-6">
            <div className="flex items-center gap-2 text-text-secondary mb-4">
              <Download className="w-4 h-4" />
              <span className="text-sm">{downloadedItems.length} items downloaded</span>
            </div>

            {downloadedItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {downloadedItems.map((item) => (
                  <MediaCard key={item.id} item={item} size="sm" showProgress />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Download className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No downloads yet</h3>
                <p className="text-text-secondary">
                  Download content to listen offline
                </p>
              </div>
            )}
          </TabsContent>

          {/* Authors */}
          <TabsContent value="authors" className="space-y-6">
            <div className="flex items-center gap-2 text-text-secondary mb-4">
              <User className="w-4 h-4" />
              <span className="text-sm">{Object.keys(authorGroups).length} authors</span>
            </div>

            <div className="space-y-6">
              {Object.entries(authorGroups).map(([author, items]) => (
                <div key={author}>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{author}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {items.map((item) => (
                      <MediaCard key={item.id} item={item} size="sm" />
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