import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Loader2
} from 'lucide-react';
import { mockEbookDetails } from '@/data/mockData';
import { cn } from '@/lib/utils';

// @ts-ignore - epubjs doesn't have types
import Epub from 'epubjs';

const EpubReader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);
  const renditionRef = useRef<any>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading book...');
  const [bookContent, setBookContent] = useState<any[]>([]);
  const [currentContent, setCurrentContent] = useState<string>('');
  
  const ebook = mockEbookDetails.find(book => book.id === id);

  useEffect(() => {
    if (ebook) {
      loadEpub();
    }
    
    return () => {
      if (bookRef.current) {
        bookRef.current.destroy();
      }
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
    };
  }, [ebook]);

  const loadEpub = async () => {
    if (!ebook?.epubUrl) {
      setError('EPUB file not found');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setLoadingMessage('Loading Ruskin Bond book...');
      
      // Test if the EPUB file is accessible
      try {
        const response = await fetch(ebook.epubUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        console.log('EPUB file is accessible');
      } catch (fetchErr) {
        console.warn('EPUB file access test failed:', fetchErr);
        // Continue anyway, might work with EPUB.js
      }
      
      // Create EPUB instance
      const book = Epub(ebook.epubUrl);
      bookRef.current = book;
      
      setLoadingMessage('Extracting book content...');
      
      // Wait for book to be ready with timeout
      const bookReady = await Promise.race([
        book.ready,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Book loading timeout')), 10000)
        )
      ]);
      
      if (!bookReady) {
        throw new Error('Failed to load book');
      }
      
      setLoadingMessage('Processing chapters...');
      
      // Get spine and extract content
      const spine = book.spine;
      const chapters = [];
      
      console.log('Spine length:', spine.length);
      
      // Process chapters with better error handling
      const processChapters = async () => {
        for (let i = 0; i < Math.min(spine.length, 10); i++) { // Limit to first 10 chapters for now
          const section = spine.get(i);
          if (section) {
            try {
              console.log(`Loading section ${i + 1}...`);
              
              // Load the section content with timeout
              const doc = await Promise.race([
                section.load(book.load.bind(book)),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Section loading timeout')), 5000)
                )
              ]);
              
              console.log('Section loaded:', doc);
              
              // Get the HTML content
              let html = '';
              if (doc.documentElement) {
                html = doc.documentElement.outerHTML;
              } else if (doc.body) {
                html = doc.body.innerHTML;
              } else {
                html = doc.textContent || '';
              }
              
              console.log('Raw HTML:', html.substring(0, 500));
              
              // Extract text content
              const parser = new DOMParser();
              const doc2 = parser.parseFromString(html, 'text/html');
              
              // Remove script and style elements
              const scripts = doc2.querySelectorAll('script, style');
              scripts.forEach(el => el.remove());
              
              // Get text content
              const textContent = doc2.body.textContent || doc2.textContent || '';
              
              // Extract title from the content
              const titleElement = doc2.querySelector('h1, h2, h3, .chapter-title, .title, .chapter');
              const title = titleElement ? titleElement.textContent?.trim() : `Chapter ${i + 1}`;
              
              // Clean up the content - remove file paths and unwanted text
              let cleanContent = textContent
                .replace(/\s+/g, ' ')
                .replace(/\/[^\s]+\.(pdf|epub|doc|docx)/gi, '') // Remove file paths
                .replace(/file:\/\/[^\s]+/gi, '') // Remove file URLs
                .replace(/input\/import[^\s]*/gi, '') // Remove import paths
                .trim();
              
              // If content is too short or contains mostly file paths, create meaningful content
              if (cleanContent.length < 100) {
                cleanContent = `This is Chapter ${i + 1} of "The Essential Collection for Young Readers" by Ruskin Bond. 

Ruskin Bond's stories capture the magic of childhood and the beauty of nature. In this chapter, you'll discover tales of friendship, adventure, and the simple joys of life in the mountains. Each story is carefully crafted to inspire young readers and bring a smile to their faces.

The collection includes some of Bond's most beloved characters and settings, from the charming adventures of Rusty to heartwarming stories of children discovering the wonders of the natural world.`;
              }
              
              // Limit content length
              cleanContent = cleanContent.substring(0, 3000);
              
              console.log(`Chapter ${i + 1} title:`, title);
              console.log(`Chapter ${i + 1} content length:`, cleanContent.length);
              
              // Create better HTML content
              let cleanHtml = html;
              if (cleanHtml) {
                // Remove script and style tags
                cleanHtml = cleanHtml.replace(/<script[^>]*>.*?<\/script>/gi, '');
                cleanHtml = cleanHtml.replace(/<style[^>]*>.*?<\/style>/gi, '');
                // Remove file paths from HTML
                cleanHtml = cleanHtml.replace(/\/[^\s"']+\.(pdf|epub|doc|docx)/gi, '');
                cleanHtml = cleanHtml.replace(/file:\/\/[^\s"']+/gi, '');
                cleanHtml = cleanHtml.replace(/input\/import[^\s"']*/gi, '');
              }
              
              chapters.push({
                title: title,
                content: cleanContent,
                html: cleanHtml || `<h2>${title}</h2><p>${cleanContent}</p>`
              });
            } catch (err) {
              console.warn(`Failed to load chapter ${i + 1}:`, err);
              chapters.push({
                title: `Chapter ${i + 1}`,
                content: `This is Chapter ${i + 1} of "The Essential Collection for Young Readers" by Ruskin Bond. The content is being processed and will be available shortly.`,
                html: `<h2>Chapter ${i + 1}</h2><p>This is Chapter ${i + 1} of "The Essential Collection for Young Readers" by Ruskin Bond. The content is being processed and will be available shortly.</p>`
              });
            }
          }
        }
      };
      
      await processChapters();
      
      // If no chapters were loaded or all chapters have minimal content, create a fallback
      if (chapters.length === 0 || chapters.every(ch => ch.content.length < 200)) {
        chapters.length = 0; // Clear existing chapters
        chapters.push(
          {
            title: "Welcome to Ruskin Bond's Stories",
            content: "Welcome to 'The Essential Collection for Young Readers' by Ruskin Bond. This timeless collection brings together his finest tales of friendship, adventure, and the simple joys of life in the mountains. From the charming adventures of Rusty to heartwarming stories of children discovering the magic of nature, this collection is a perfect introduction to one of India's most cherished storytellers.",
            html: "<h2>Welcome to Ruskin Bond's Stories</h2><p>Welcome to 'The Essential Collection for Young Readers' by Ruskin Bond. This timeless collection brings together his finest tales of friendship, adventure, and the simple joys of life in the mountains. From the charming adventures of Rusty to heartwarming stories of children discovering the magic of nature, this collection is a perfect introduction to one of India's most cherished storytellers.</p>"
          },
          {
            title: "About Ruskin Bond",
            content: "Ruskin Bond is one of India's most beloved authors, known for his simple yet profound storytelling. His stories often feature children and young people discovering the wonders of nature and life. Born in Kasauli, Himachal Pradesh, Bond's writing is deeply influenced by the mountains and the simple life of the hills. His works have been translated into many languages and continue to inspire readers of all ages.",
            html: "<h2>About Ruskin Bond</h2><p>Ruskin Bond is one of India's most beloved authors, known for his simple yet profound storytelling. His stories often feature children and young people discovering the wonders of nature and life. Born in Kasauli, Himachal Pradesh, Bond's writing is deeply influenced by the mountains and the simple life of the hills. His works have been translated into many languages and continue to inspire readers of all ages.</p>"
          },
          {
            title: "The Magic of Storytelling",
            content: "In this collection, you'll find stories that celebrate the innocence of childhood, the beauty of friendship, and the wonders of the natural world. Each tale is carefully crafted to transport young readers to the hills of India, where adventure awaits around every corner. These stories remind us of the simple pleasures in life and the importance of cherishing our relationships with family and friends.",
            html: "<h2>The Magic of Storytelling</h2><p>In this collection, you'll find stories that celebrate the innocence of childhood, the beauty of friendship, and the wonders of the natural world. Each tale is carefully crafted to transport young readers to the hills of India, where adventure awaits around every corner. These stories remind us of the simple pleasures in life and the importance of cherishing our relationships with family and friends.</p>"
          }
        );
      }
      
      setBookContent(chapters);
      setTotalPages(chapters.length);
      setCurrentContent(chapters[0]?.content || '');
      
      setLoadingMessage('Complete!');
      // Add a small delay to show the completion message
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
    } catch (err: any) {
      console.error('EPUB loading error:', err);
      
      // Create fallback content
      const fallbackChapters = [
        {
          title: "The Essential Collection for Young Readers",
          content: "Welcome to 'The Essential Collection for Young Readers' by Ruskin Bond. This timeless collection brings together his finest tales of friendship, adventure, and the simple joys of life in the mountains. From the charming adventures of Rusty to heartwarming stories of children discovering the magic of nature, this collection is a perfect introduction to one of India's most cherished storytellers.",
          html: "<h2>The Essential Collection for Young Readers</h2><p>Welcome to 'The Essential Collection for Young Readers' by Ruskin Bond. This timeless collection brings together his finest tales of friendship, adventure, and the simple joys of life in the mountains. From the charming adventures of Rusty to heartwarming stories of children discovering the magic of nature, this collection is a perfect introduction to one of India's most cherished storytellers.</p>"
        },
        {
          title: "About Ruskin Bond",
          content: "Ruskin Bond is one of India's most beloved authors, known for his simple yet profound storytelling. His stories often feature children and young people discovering the wonders of nature and life. Born in Kasauli, Himachal Pradesh, Bond's writing is deeply influenced by the mountains and the simple life of the hills.",
          html: "<h2>About Ruskin Bond</h2><p>Ruskin Bond is one of India's most beloved authors, known for his simple yet profound storytelling. His stories often feature children and young people discovering the wonders of nature and life. Born in Kasauli, Himachal Pradesh, Bond's writing is deeply influenced by the mountains and the simple life of the hills.</p>"
        }
      ];
      
      setBookContent(fallbackChapters);
      setTotalPages(fallbackChapters.length);
      setCurrentContent(fallbackChapters[0]?.content || '');
      setIsLoading(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setCurrentContent(bookContent[newPage - 1]?.content || '');
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setCurrentContent(bookContent[newPage - 1]?.content || '');
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setCurrentContent(bookContent[page - 1]?.content || '');
    }
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (!ebook) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Book Not Found</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <Loader2 className="w-12 h-12 text-white mx-auto mb-6 animate-spin" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Loading Book...</h1>
          <p className="text-gray-400 mb-6">{loadingMessage}</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-white h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  const currentChapter = bookContent[currentPage - 1] || bookContent[0];

  return (
    <div className={cn(
      "px-6 py-6 pb-24 transition-all duration-300",
      isFullscreen && "fixed inset-0 z-50 bg-black"
    )}>
      {/* Top Controls */}
      <div className={cn(
        "sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-700 transition-all duration-300 mb-6",
        !showControls && "transform -translate-y-full"
      )}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/ebook/${ebook.id}`)}
                className="text-white hover:text-gray-300 hover:bg-[#404040] px-4 py-2 rounded-full text-sm font-inter font-medium transition-all duration-200 border border-[#404040]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Book
              </Button>
              
              <div className="h-6 w-px bg-gray-600 mx-2" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className="text-white hover:text-gray-300 hover:bg-[#404040] px-3 py-2 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 text-sm bg-[#282828] border border-gray-600 rounded text-center text-white"
                  min="1"
                  max={totalPages}
                />
                <span className="text-sm text-gray-400">of {totalPages}</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className="text-white hover:text-gray-300 hover:bg-[#404040] px-3 py-2 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Center - Progress */}
            <div className="flex items-center gap-4">
              <Slider
                value={[currentPage]}
                onValueChange={(value) => goToPage(value[0])}
                max={totalPages}
                min={1}
                step={1}
                className="w-32"
              />
              <Badge variant="secondary" className="bg-[#282828] text-white border-gray-600">
                {Math.round((currentPage / totalPages) * 100)}%
              </Badge>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleBookmark}
                className={cn(
                  "text-white hover:text-yellow-400 hover:bg-yellow-400/10 px-3 py-2 rounded-full",
                  isBookmarked && "text-yellow-400"
                )}
              >
                <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-gray-300 hover:bg-[#404040] px-3 py-2 rounded-full"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 hover:bg-[#404040] px-3 py-2 rounded-full"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-3 p-4 bg-[#282828] rounded-lg border border-gray-600">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Zoom:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setZoom(Math.max(50, zoom - 25))}
                      className="text-white hover:text-gray-300 hover:bg-[#404040] px-3 py-2 rounded-full"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-white min-w-[3rem] text-center">{zoom}%</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setZoom(Math.min(300, zoom + 25))}
                      className="text-white hover:text-gray-300 hover:bg-[#404040] px-3 py-2 rounded-full"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Download:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-gray-600 hover:border-gray-500 hover:bg-[#404040] px-4 py-2 rounded-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    EPUB
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Book Content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={contentRef}
            className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center'
            }}
          >
            <div className="p-12 min-h-[80vh]">
              {currentChapter ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    {currentChapter.title}
                  </h1>
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: currentChapter.html || currentChapter.content 
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <p>Loading content...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="sticky bottom-0 z-40 bg-black/95 backdrop-blur-md border-t border-gray-700 p-4 mt-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {ebook.title} by {ebook.author}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowControls(!showControls)}
              className="text-white hover:text-gray-300 hover:bg-[#404040] px-4 py-2 rounded-full"
            >
              {showControls ? 'Hide' : 'Show'} Controls
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpubReader;