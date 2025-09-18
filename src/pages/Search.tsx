import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FilterChips from '@/components/ui/FilterChips';
import MediaCard from '@/components/media/MediaCard';
import { allContent } from '@/data/mockData';
import { MediaItem } from '@/contexts/PlayerContext';
import { cn } from '@/lib/utils';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [results, setResults] = useState<{
    books: MediaItem[];
    audiobooks: MediaItem[];
    podcasts: MediaItem[];
  }>({ books: [], audiobooks: [], podcasts: [] });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter and search results
  useEffect(() => {
    let filteredContent = allContent;

    // Apply filter
    if (selectedFilter !== 'All') {
      const filterMap = {
        'Education': ['educational'],
        'Entertainment': ['entertainment', 'fiction'],
        'Thrill': ['thriller', 'mystery'],
        'Romantic': ['romance'],
        'Business': ['business', 'finance']
      };
      
      // This is a simplified filter - in a real app, you'd have proper categories
      filteredContent = allContent.filter(item => 
        item.title.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        item.author.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    // Apply search query
    if (debouncedQuery) {
      filteredContent = filteredContent.filter(item =>
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    // Group by type
    const grouped = {
      books: filteredContent.filter(item => item.type === 'ebook'),
      audiobooks: filteredContent.filter(item => item.type === 'audiobook'),
      podcasts: filteredContent.filter(item => item.type === 'podcast')
    };

    setResults(grouped);
  }, [debouncedQuery, selectedFilter]);

  const hasResults = results.books.length > 0 || results.audiobooks.length > 0 || results.podcasts.length > 0;
  const showEmptyState = debouncedQuery && !hasResults;

  return (
    <main className="pb-24 min-h-screen">
      <div className="px-6 py-8">
        {/* Search header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Search</h1>
          
          {/* Search input */}
          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <Input
              type="search"
              placeholder="What would you like to read or listen to?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cn(
                "pl-12 h-12 text-lg bg-surface-mid border-border",
                "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50"
              )}
              autoFocus
            />
          </div>

          {/* Filter chips */}
          <FilterChips onFilterChange={setSelectedFilter} />
        </div>

        {/* Results */}
        {showEmptyState ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-text-secondary">
              Try adjusting your search or changing the filter
            </p>
          </div>
        ) : !debouncedQuery ? (
          <div className="space-y-8">
            {/* Popular searches or categories when no query */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Popular Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Education', 'Entertainment', 'Business', 'Thrill'].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="h-20 bg-surface-mid border-border hover:border-brand-primary/50"
                    onClick={() => setSelectedFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </section>

            {/* Trending */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Trending Now</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allContent.slice(0, 12).map((item) => (
                  <MediaCard key={item.id} item={item} size="sm" />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results by type */}
            {results.books.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Books ({results.books.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {results.books.map((item) => (
                    <MediaCard key={item.id} item={item} size="sm" />
                  ))}
                </div>
              </section>
            )}

            {results.audiobooks.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Audiobooks ({results.audiobooks.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {results.audiobooks.map((item) => (
                    <MediaCard key={item.id} item={item} size="sm" />
                  ))}
                </div>
              </section>
            )}

            {results.podcasts.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Podcasts ({results.podcasts.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {results.podcasts.map((item) => (
                    <MediaCard key={item.id} item={item} size="sm" />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;