import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { allContent } from '@/data/mockData';

const ReadHome: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState('All');
  const navigate = useNavigate();

  // Filter to show only ebooks
  const ebooks = allContent.filter(item => item.type === 'ebook');

  const handleRuskinBondClick = () => {
    // Navigate to the Ruskin Bond Essential Collection ebook
    navigate('/ebook/rb1'); // Ruskin Bond Essential Collection
  };

  const handleRKNarayanClick = () => {
    // Navigate to another ebook
    navigate('/ebook/4'); // Sapiens is id '4' and is an ebook
  };

  const handleBookClick = (bookTitle: string) => {
    // Navigate to different ebooks based on the book title
    if (bookTitle.includes('The Essential Collection')) {
      navigate('/ebook/rb1'); // Ruskin Bond Essential Collection
    } else if (bookTitle.includes('The Midnight Visitor')) {
      navigate('/ebook/2'); // Atomic Habits
    } else if (bookTitle.includes('The God of Small Things')) {
      navigate('/ebook/4'); // Sapiens
    } else if (bookTitle.includes('Midnight\'s Children')) {
      navigate('/ebook/1'); // The Midnight Library
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

        {/* Featured Ebooks Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Ebooks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {ebooks.slice(0, 6).map((book) => (
              <div
                key={book.id}
                className="group cursor-pointer"
                onClick={() => handleBookClick(book.title)}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={book.cover}
                    alt={book.title}
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
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-1">{book.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ruskin Bond Collection Banner */}
        <section className="mb-12">
          <div 
            className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={handleRuskinBondClick}
          >
            <img
              src="/book banner.jpg"
              alt="Ruskin Bond Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white">
              <h2 className="text-3xl font-bold mb-2">Ruskin Bond Collection</h2>
              <p className="text-lg mb-4 opacity-90">Essential stories for young readers</p>
              <Button className="bg-white text-black hover:bg-gray-200 px-6 py-2">
                Read Now
              </Button>
            </div>
          </div>
        </section>

        {/* R.K. Narayan Banner */}
        <section className="mb-12">
          <div 
            className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={handleRKNarayanClick}
          >
            <img
              src="/rk-narayan.png"
              alt="R.K. Narayan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white">
              <h2 className="text-2xl font-bold mb-2">R.K. Narayan</h2>
              <p className="text-lg mb-4 opacity-90">Classic Indian literature</p>
              <Button className="bg-white text-black hover:bg-gray-200 px-6 py-2">
                Explore
              </Button>
            </div>
          </div>
        </section>

        {/* All Ebooks Grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">All Ebooks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {ebooks.map((book) => (
              <div
                key={book.id}
                className="group cursor-pointer"
                onClick={() => handleBookClick(book.title)}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={book.cover}
                    alt={book.title}
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
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-1">{book.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ReadHome;
