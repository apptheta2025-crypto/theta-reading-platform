import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FilterChips from '@/components/ui/FilterChips';
import MediaCard from '@/components/media/MediaCard';
import RailRow from '@/components/media/RailRow';
import { allContent } from '@/data/mockData';
import { MediaItem } from '@/contexts/PlayerContext';
import { useMode } from '@/contexts/ModeContext';
import { cn } from '@/lib/utils';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { mode } = useMode();
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

    // Apply mode filter first: 'read' shows ebooks only, 'listen' shows audiobooks and podcasts
    filteredContent = filteredContent.filter(item => {
      return mode === 'read' 
        ? item.type === 'ebook'
        : item.type === 'audiobook' || item.type === 'podcast';
    });

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
      filteredContent = filteredContent.filter(item => 
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
  }, [debouncedQuery, selectedFilter, mode]);

  const hasResults = results.books.length > 0 || results.audiobooks.length > 0 || results.podcasts.length > 0;
  const showEmptyState = debouncedQuery && !hasResults;

  const categories = [
    {
      name: 'Education',
      image: 'https://images.unsplash.com/photo-1635282950415-0365c1d56cc5?w=800&auto=format&fit=crop&q=60',
    },
    {
      name: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60',
    },
    {
      name: 'Business',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60',
    },
    {
      name: 'Thrill',
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&auto=format&fit=crop&q=60',
    },
    {
      name: 'Romantic',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <main className="pb-24 min-h-screen">
      {/* Hero with aurora background */}
      <div className="relative">
        <div className="aurora-bg" />
        <div className="relative px-6 pt-8 pb-6">
          <div className="flex items-center gap-2 text-brand-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Discover</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Search</h1>
          <p className="text-text-secondary mt-2">Find books, audiobooks, and podcasts across our library</p>

          {/* Search input */}
          <div className="relative mt-6">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <Input
              type="search"
              placeholder="What would you like to read or listen to?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cn(
                'glass-input h-14 pl-12 pr-12 rounded-full text-base md:text-lg',
                'focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 placeholder:text-text-secondary'
              )}
              autoFocus
            />
            <button
              type="button"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Voice search"
            >
              <Mic2 className="w-5 h-5" />
            </button>
          </div>

          {/* Filter chips */}
          <div className="mt-4">
            <FilterChips onFilterChange={setSelectedFilter} />
          </div>
        </div>
      </div>

      <div className="px-6 space-y-10">
        {/* Results */}
        {showEmptyState ? (
          <div className="glass-panel rounded-xl p-8 text-center">
            <SearchIcon className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-60" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-text-secondary mb-6">Try adjusting your search or changing the filter</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Sapiens', 'Atomic Habits', 'The Daily', 'Biology'].map(s => (
                <Button key={s} variant="outline" size="sm" className="bg-surface-mid/50 border-border hover:border-brand-primary/50" onClick={() => setQuery(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ) : !debouncedQuery ? (
          <>
            {/* Browse by Category */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Browse by Category</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedFilter(cat.name)}
                    className="glass-tile relative overflow-hidden h-28 sm:h-36 md:h-40 group"
                    aria-label={`Explore ${cat.name}`}
                  >
                    <img src={cat.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent" />
                    <div className="relative z-10 h-full w-full p-4 flex items-end">
                      <div>
                        <p className="text-xs text-text-secondary">Category</p>
                        <p className="text-lg font-semibold text-foreground">{cat.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Trending rail */}
            <section>
              <RailRow 
                title="Trending Now" 
                items={allContent
                  .filter(item => mode === 'read' 
                    ? item.type === 'ebook'
                    : item.type === 'audiobook' || item.type === 'podcast'
                  )
                  .slice(0, 12)
                } 
              />
            </section>
          </>
        ) : (
          <div className="space-y-8">
            {/* Results summary */}
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>Showing results for</span>
              <span className="px-2 py-1 rounded-full bg-surface-mid text-foreground">{debouncedQuery}</span>
            </div>

            {/* Results by type */}
            {results.books.length > 0 && (
              <section className="glass-panel rounded-xl p-4 md:p-6">
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
              <section className="glass-panel rounded-xl p-4 md:p-6">
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
              <section className="glass-panel rounded-xl p-4 md:p-6">
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