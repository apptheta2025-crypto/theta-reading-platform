import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Loader2, Volume2, BookOpen } from 'lucide-react';
import { mockEbookDetails } from '@/data/mockData';
import { getAudioTimeForPage, getChapterForPage } from '@/data/pageAudioMapping';

const SimplePdfReader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [readingProgress, setReadingProgress] = useState(0);
  const [lastReadingPosition, setLastReadingPosition] = useState<string>('');
  
  // Seamless switching state
  const [audioTime, setAudioTime] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const ebook = mockEbookDetails.find(book => book.id === id);

  useEffect(() => {
    if (ebook) {
      console.log('Ebook found:', ebook);
      
      // Check if we have a specific page from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page');
      
      if (ebook.id === 'rb1') {
        // Corrected PDF URL to include the folder path
        let url = '/Ruskin%20Bond%20Essentizls%20to%20Life/The_Essential_Collection_for_Young_Readers_-_Ruskin_Bond.pdf';
        
        // Add page parameter if specified
        if (page) {
          url += `#page=${page}`;
          console.log('Setting PDF URL with page:', url);
        } else {
          console.log('Setting PDF URL:', url);
        }
        
        setPdfUrl(url);
        setIsLoading(false);
      } else if (ebook.pdfUrl) {
        let url = ebook.pdfUrl;
        
        // Add page parameter if specified
        if (page) {
          url += `#page=${page}`;
          console.log('Setting PDF URL with page:', url);
        } else {
          console.log('Setting PDF URL from ebook data:', url);
        }
        
        setPdfUrl(url);
        setIsLoading(false);
      } else {
        setError('PDF URL not found for this book');
        setIsLoading(false);
      }
    } else {
      console.log('No ebook found for id:', id);
      setError('Book not found');
      setIsLoading(false);
    }
  }, [ebook, id]);

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${ebook?.title || 'book'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Track reading progress
  const trackReadingProgress = async (pageNumber: number, progress: number, position?: string) => {
    try {
      // Store progress locally
      localStorage.setItem(`reading-progress-${ebook?.id}`, JSON.stringify({
        pageNumber,
        progress,
        position,
        timestamp: new Date().toISOString()
      }));

      // Send to backend API (you'll need to implement this endpoint)
      const response = await fetch('/api/reading-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: ebook?.id,
          userId: 'current-user-id', // Replace with actual user ID
          pageNumber,
          progress,
          position,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        console.log('Reading progress saved successfully');
      }
    } catch (error) {
      console.error('Failed to save reading progress:', error);
    }
  };

  // Load saved reading progress
  const loadReadingProgress = () => {
    try {
      const savedProgress = localStorage.getItem(`reading-progress-${ebook?.id}`);
      if (savedProgress) {
        const { pageNumber, progress, position } = JSON.parse(savedProgress);
        setCurrentPage(pageNumber);
        setReadingProgress(progress);
        setLastReadingPosition(position || '');
        console.log('Loaded saved progress:', { pageNumber, progress, position });
      }
    } catch (error) {
      console.error('Failed to load reading progress:', error);
    }
  };

  // Switch to audio (seamless switching feature)
  const switchToAudio = () => {
    // Save current reading position
    trackReadingProgress(currentPage, readingProgress, lastReadingPosition);
    
    // Get the EXACT audio timestamp for this page using intelligent mapping
    const exactAudioTime = getAudioTimeForPage(currentPage);
    const currentChapter = getChapterForPage(currentPage);
    
    console.log('Switching to audio with intelligent mapping:', {
      currentPage,
      readingProgress,
      exactAudioTime,
      currentChapter,
      audioTimeFormatted: `${Math.floor(exactAudioTime / 60)}:${Math.floor(exactAudioTime % 60).toString().padStart(2, '0')}`
    });
    
    // Navigate to audio player with EXACT position
    navigate(`/audio/${ebook?.id}?page=${currentPage}&progress=${readingProgress}&audioTime=${exactAudioTime}&chapter=${encodeURIComponent(currentChapter)}`);
  };

  // Listen for PDF page changes (this is a simplified approach)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'PDF_PAGE_CHANGE') {
        const { pageNumber, totalPages, progress } = event.data;
        setCurrentPage(pageNumber);
        setTotalPages(totalPages);
        setReadingProgress(progress);
        
        // Track progress
        trackReadingProgress(pageNumber, progress);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [ebook?.id]);

  // Load progress when component mounts
  useEffect(() => {
    if (ebook) {
      loadReadingProgress();
      
      // Check if coming from audio player
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source');
      const audioTime = urlParams.get('audioTime');
      const page = urlParams.get('page');
      const progress = urlParams.get('progress');
      const chapter = urlParams.get('chapter');
      
      if (source === 'audio' && page && progress) {
        const targetPage = parseInt(page);
        console.log('Coming from audio player with intelligent mapping:', { 
          page: targetPage, 
          progress, 
          audioTime, 
          chapter: chapter ? decodeURIComponent(chapter) : 'Unknown'
        });
        setCurrentPage(targetPage);
        setReadingProgress(parseFloat(progress));
        
        // Update PDF URL to include page parameter for browser PDF viewer
        if (ebook && ebook.pdfUrl) {
          const baseUrl = window.location.origin + ebook.pdfUrl;
          const pdfUrlWithPage = `${baseUrl}#page=${targetPage}`;
          setPdfUrl(pdfUrlWithPage);
          console.log('Updated PDF URL with page:', pdfUrlWithPage);
        }
      }
    }
  }, [ebook]);

  if (!ebook) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Book</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <Loader2 className="w-12 h-12 text-gray-600 mx-auto mb-6 animate-spin" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading PDF...</h1>
          <p className="text-gray-600">Please wait while we load your book</p>
        </div>
      </div>
    );
  }

  const fullPdfUrl = window.location.origin + pdfUrl;

  return (
    <div className="fixed inset-0 bg-white z-[99999]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/ebook/${ebook.id}`)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Book
              </Button>
              
              <div className="text-gray-900 text-lg font-semibold">
                {ebook.title}
              </div>
              
                      {/* Reading Progress */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>Page {currentPage}</span>
                        {totalPages > 1 && <span>of {totalPages}</span>}
                        <span>({Math.round(readingProgress)}%)</span>
                        {getChapterForPage(currentPage) && (
                          <span className="text-purple-600">• {getChapterForPage(currentPage)}</span>
                        )}
                      </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Seamless Switch to Audio Button */}
              <Button
                variant="default"
                size="sm"
                onClick={switchToAudio}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Switch to Audio
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPdf}
                className="text-gray-600 hover:text-gray-900"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div 
        className="absolute inset-0 pt-16"
        style={{
          height: 'calc(100vh - 4rem)',
          width: '100%'
        }}
      >
        <iframe
          ref={iframeRef}
          src={fullPdfUrl}
          className="w-full h-full border-none"
          title={ebook.title}
          onLoad={() => {
            console.log('PDF loaded successfully');
            // Simulate progress tracking (in a real implementation, you'd use PDF.js or similar)
            // For now, we'll use a simple approach with URL parameters
            const url = new URL(window.location.href);
            const savedPage = url.searchParams.get('page');
            const savedProgress = url.searchParams.get('progress');
            
            if (savedPage) {
              setCurrentPage(parseInt(savedPage));
            }
            if (savedProgress) {
              setReadingProgress(parseFloat(savedProgress));
            }
          }}
          onError={(e) => {
            console.error('PDF failed to load:', e);
            setError('Failed to load PDF');
          }}
        />
      </div>

              {/* Debug Info */}
              <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded text-sm">
                <div>PDF URL: {fullPdfUrl}</div>
                <div>Current Page: {currentPage}</div>
                <div>Reading Progress: {Math.round(readingProgress)}%</div>
                <div>Chapter: {getChapterForPage(currentPage)}</div>
              </div>
    </div>
  );
};

export default SimplePdfReader;
