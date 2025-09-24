import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { allContent } from '@/data/mockData';

const ListenHome: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState('All');
  const navigate = useNavigate();

  // Filter to show only audiobooks and podcasts
  const audioContent = allContent.filter(item => item.type === 'audiobook' || item.type === 'podcast');

  const handleContentClick = (contentId: string, contentType: string) => {
    if (contentType === 'audiobook') {
      navigate(`/audio/${contentId}`);
    } else if (contentType === 'podcast') {
      navigate(`/podcast/${contentId}`);
    }
  };
  
  return (
    <>
      {/* Main Content */}
      <main className="px-6 py-6 pb-24">
        {/* Genre Filter Bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide justify-start">
          {['All', 'Education', 'Entertainment', 'Thrill', 'Romantic', 'Business'].map((genre) => (
            <Button
              key={genre}
              variant="ghost"
              onClick={() => setActiveGenre(genre)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-all duration-200 border border-[#404040]",
                activeGenre === genre
                  ? "bg-white text-black hover:bg-gray-100 font-semibold" 
                  : "bg-[#282828] text-white hover:bg-[#404040]"
              )}
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Ruskin Bond Featured Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Start Your Day with Ruskin Bond</h2>
          <div className="relative overflow-hidden rounded-2xl mb-8" style={{ height: '200px' }}>
            <img 
              src="/ruskin-banner.png" 
              alt="Ruskin Bond Essential Collection - Audiobook" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="ml-8 text-white">
                <h3 className="text-3xl font-bold mb-2">The Essential Collection for Young Readers</h3>
                <p className="text-lg mb-4">Listen to timeless stories by India's beloved storyteller</p>
                <Button 
                  onClick={() => navigate('/audio/rb1-audio')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Start Listening
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Audio Content Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Audio Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {audioContent.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => handleContentClick(item.id, item.type)}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l6-5-6-5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Content type badge */}
                  <div className="absolute top-2 right-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      item.type === 'audiobook' 
                        ? "bg-blue-500 text-white" 
                        : "bg-purple-500 text-white"
                    )}>
                      {item.type === 'audiobook' ? 'Audiobook' : 'Podcast'}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-1">{item.author}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {Math.floor(item.duration / 60)} min
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Audiobooks Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Audiobooks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {audioContent.filter(item => item.type === 'audiobook').slice(0, 4).map((audiobook) => (
              <div
                key={audiobook.id}
                className="group cursor-pointer"
                onClick={() => handleContentClick(audiobook.id, audiobook.type)}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={audiobook.cover}
                    alt={audiobook.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l6-5-6-5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                      Audiobook
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {audiobook.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-1">{audiobook.author}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {Math.floor(audiobook.duration / 60)} min
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Podcasts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Podcasts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {audioContent.filter(item => item.type === 'podcast').slice(0, 4).map((podcast) => (
              <div
                key={podcast.id}
                className="group cursor-pointer"
                onClick={() => handleContentClick(podcast.id, podcast.type)}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={podcast.cover}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l6-5-6-5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-purple-500 text-white rounded-full text-xs font-medium">
                      Podcast
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {podcast.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-1">{podcast.author}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {Math.floor(podcast.duration / 60)} min
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* All Audio Content Grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">All Audio Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {audioContent.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => handleContentClick(item.id, item.type)}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l6-5-6-5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Content type badge */}
                  <div className="absolute top-2 right-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      item.type === 'audiobook' 
                        ? "bg-blue-500 text-white" 
                        : "bg-purple-500 text-white"
                    )}>
                      {item.type === 'audiobook' ? 'Audiobook' : 'Podcast'}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-1">{item.author}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {Math.floor(item.duration / 60)} min
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ListenHome;
