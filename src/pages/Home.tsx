import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Home: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState('All');
  const navigate = useNavigate();

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
              style={{ height: '35px' }}
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Start off your day Section */}
        <div className="mb-8">
          <h2 className="font-gilroy font-black text-white mb-6" style={{ fontSize: '40px' }}>
            Start off your day
          </h2>
          <div className="relative overflow-hidden" style={{ width: '562px', height: '250px', borderRadius: '25px' }}>
            <img 
              src="/ruskin-banner.png" 
              alt="Start With Ruskin Bond - Promotional Banner" 
              className="w-full h-full object-cover"
            />
          </div>
          </div>
          
        {/* Popular reading lists Section */}
        <div className="mb-8">
          <h2 className="font-gilroy font-black text-white mb-6" style={{ fontSize: '40px' }}>
            Popular reading lists
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {[
              { 
                authors: ['Ruskin Bond', 'Rabindranath Tagore', 'Chetan Bhagat'], 
                title: 'Feat. Ruskin Bond, Rabindranath Tagore, Chetan Bhagat',
                image: '/image.png'
              },
              { 
                authors: ['R.K. Narayan', 'Vikram Seth', 'Amitav Ghosh'], 
                title: 'Feat. R.K. Narayan, Vikram Seth, Amitav Ghosh and more.',
                image: '/rk-narayan.png'
              }
            ].map((list, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 cursor-pointer group" 
                style={{ width: '175px', height: '260px' }}
                onClick={index === 0 ? handleRuskinBondClick : handleRKNarayanClick}
              >
                <div className="border-2 border-transparent group-hover:border-[#282828] group-hover:bg-[#282828] transition-all duration-200 rounded-lg p-2 flex flex-col items-center" style={{ width: '175px', height: '260px' }}>
                  {list.image ? (
                    <div className="mb-3 flex items-center justify-center" style={{ width: '159px', height: '159px' }}>
                      <img 
                        src={list.image} 
                        alt={list.title}
                        className="object-cover rounded-lg"
                        style={{ width: '159px', height: '159px' }}
                      />
                    </div>
                  ) : (
                    <div className="flex -space-x-2 mb-3">
                      {list.authors.slice(0, 3).map((author, authorIndex) => (
                        <div key={authorIndex} className="w-10 h-10 rounded-full border-2 border-[#181818] overflow-hidden bg-gray-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                <p className="text-sm font-inter font-normal leading-tight px-2" style={{ color: '#b3b5b4' }}>
                  {list.title}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mb-32">
          <h2 className="font-gilroy font-black text-white mb-6" style={{ fontSize: '40px' }}>
            Recommended
          </h2>
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {[
              { title: 'The Essential Collection for Young Readers', author: 'Ruskin Bond', cover: '/book%20banner.jpg' },
              { title: 'The Midnight Visitor', author: 'Shashi Tharoor', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop' },
              { title: 'The God of Small Things', author: 'Arundhati Roy', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
              { title: 'Midnight\'s Children', author: 'Salman Rushdie', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop' }
            ].map((book, index) => {
              // Calculate dimensions based on image aspect ratio
              const getImageDimensions = (title: string, cover: string) => {
                if (title.includes('The Essential Collection')) {
                  return { width: '140px', height: '214px' }; // Bigger size
                } else {
                  return { width: '140px', height: '214px' }; // Same size as Ruskin Bond
                }
              };
              
              const dimensions = getImageDimensions(book.title, book.cover);
              const isRuskinBond = book.title.includes('The Essential Collection');
              
              return (
              <div 
                key={index} 
                className="flex-shrink-0 cursor-pointer group" 
                style={{ width: '175px', height: '320px' }}
                onClick={() => handleBookClick(book.title)}
              >
                <div className="flex flex-col items-center" style={{ width: '175px', height: '320px' }}>
                  <div className="border-2 border-transparent group-hover:border-[#282828] group-hover:bg-[#282828] transition-all duration-200 rounded-lg px-2 py-2 flex flex-col items-center" style={{ width: '156px' }}>
                    <div className="bg-[#333333] rounded-lg mb-1 overflow-hidden" style={{ width: dimensions.width, height: dimensions.height }}>
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left" style={{ width: '140px' }}>
                      <h3 className="text-white font-semibold text-xs mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-[#A7A7A7] text-[10px]">{book.author}</p>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Editor's Choice Section */}
        <div className="mb-8">
          <h2 className="font-gilroy font-black text-white mb-6" style={{ fontSize: '40px' }}>
            Editor's choice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'The Midnight Visitor', author: 'Shashi Tharoor', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop' },
              { title: 'The God of Small Things', author: 'Arundhati Roy', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
              { title: 'Midnight\'s Children', author: 'Salman Rushdie', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop' }
            ].map((book, index) => (
              <div key={index} className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] hover:scale-105 transition-all duration-200 cursor-pointer group border border-[#404040]">
                <div className="aspect-[3/4] bg-[#333333] rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-[#A7A7A7] text-sm">{book.author}</p>
              </div>
            ))}
        </div>
      </div>
    </main>
    </>
  );
};

export default Home;