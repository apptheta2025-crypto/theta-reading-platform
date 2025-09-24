import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, BookOpen } from 'lucide-react';
import { mockEbookDetails } from '@/data/mockData';
import { getPageForAudioTime, getChapterForAudioTime } from '@/data/pageAudioMapping';

const SimpleAudioPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Seamless switching state
  const [initialAudioTime, setInitialAudioTime] = useState<number | null>(null);
  const [initialPage, setInitialPage] = useState<number | null>(null);
  const [currentChapter, setCurrentChapter] = useState<string>('');

  const audiobook = mockEbookDetails.find(book => book.id === id);

  // Get initial position from URL params for seamless switching
  useEffect(() => {
    const audioTime = searchParams.get('audioTime');
    const page = searchParams.get('page');
    const chapter = searchParams.get('chapter');
    
    console.log('URL Search Params:', {
      audioTime,
      page,
      chapter,
      allParams: Object.fromEntries(searchParams.entries())
    });
    
    if (audioTime) {
      const timeValue = parseFloat(audioTime);
      setInitialAudioTime(timeValue);
      console.log('Initial audio time from reading:', timeValue, 'seconds');
    }
    
    if (page) {
      const pageValue = parseInt(page);
      setInitialPage(pageValue);
      console.log('Initial page from reading:', pageValue);
    }
    
    if (chapter) {
      const chapterValue = decodeURIComponent(chapter);
      setCurrentChapter(chapterValue);
      console.log('Current chapter from reading:', chapterValue);
    }
  }, [searchParams]);

  if (!audiobook) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Audiobook Not Found</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      // Update current chapter based on audio time
      const currentAudioTime = audioRef.current.currentTime;
      const newChapter = getChapterForAudioTime(currentAudioTime);
      if (newChapter !== currentChapter) {
        setCurrentChapter(newChapter);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      
      // Set initial audio time if coming from reading
      if (initialAudioTime && initialAudioTime > 0) {
        console.log('Attempting to seek to:', initialAudioTime);
        
        // Try to seek immediately
        audioRef.current.currentTime = initialAudioTime;
        setCurrentTime(initialAudioTime);
        
        // Also try after a small delay to ensure audio is ready
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = initialAudioTime;
            setCurrentTime(initialAudioTime);
            console.log('Secondary seek to:', initialAudioTime);
            
            // Auto-play when coming from seamless switch
            console.log('Auto-playing audio after seamless switch');
            audioRef.current.play().then(() => {
              setIsPlaying(true);
              console.log('Audio started playing automatically');
            }).catch((error) => {
              console.log('Auto-play failed (browser restriction):', error);
              // This is normal - browsers often block auto-play
            });
          }
        }, 100);
        
        console.log('Set audio to initial time:', initialAudioTime);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Switch to reading (seamless switching feature)
  const switchToReading = () => {
    if (audioRef.current && audiobook) {
      const currentAudioTime = audioRef.current.currentTime;
      
      // Get the EXACT page for this audio timestamp using intelligent mapping
      const exactPage = getPageForAudioTime(currentAudioTime);
      const audioChapter = getChapterForAudioTime(currentAudioTime);
      const audioProgress = (currentAudioTime / audioRef.current.duration) * 100;
      
      console.log('Switching to reading with intelligent mapping:', {
        currentAudioTime,
        audioProgress,
        exactPage,
        audioChapter,
        audioTimeFormatted: `${Math.floor(currentAudioTime / 60)}:${Math.floor(currentAudioTime % 60).toString().padStart(2, '0')}`
      });
      
      // Navigate to PDF reader with EXACT page position
      navigate(`/reader/rb1?page=${exactPage}&progress=${audioProgress}&source=audio&audioTime=${currentAudioTime}&chapter=${encodeURIComponent(audioChapter)}`);
    }
  };

  const fullAudioUrl = window.location.origin + audiobook.audioUrl;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(`/ebook/${audiobook.id}`)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Book
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {audiobook.title}
            </h1>
            {currentChapter && (
              <p className="text-sm text-gray-600 mt-1">
                Currently: {currentChapter}
              </p>
            )}
            {initialAudioTime && initialAudioTime > 0 && !isPlaying && (
              <p className="text-sm text-orange-600 mt-1 font-medium">
                🔊 Ready to play from {Math.floor(initialAudioTime / 60)}:{(Math.floor(initialAudioTime % 60)).toString().padStart(2, '0')}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            {initialAudioTime && initialAudioTime > 0 && (
              <>
                <Button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = initialAudioTime;
                      setCurrentTime(initialAudioTime);
                      console.log('Manual seek to:', initialAudioTime);
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Seek to {Math.floor(initialAudioTime / 60)}:{(Math.floor(initialAudioTime % 60)).toString().padStart(2, '0')}
                </Button>
                
                {!isPlaying && (
                  <Button
                    onClick={togglePlayPause}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Playing
                  </Button>
                )}
              </>
            )}
            
            <Button
              onClick={switchToReading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Switch to Reading
            </Button>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="bg-white border rounded-lg shadow-lg p-8 w-full max-w-md">
          {/* Book Cover */}
          <div className="flex justify-center mb-6">
            <img
              src={audiobook.cover}
              alt={audiobook.title}
              className="w-32 h-40 object-cover rounded"
            />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-center mb-2">{audiobook.title}</h2>
          <p className="text-gray-600 text-center mb-6">{audiobook.author}</p>

          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Page indicator */}
            <div className="text-center text-xs text-gray-500 mt-2">
              Estimated Page: {getPageForAudioTime(currentTime)} of {audiobook.totalPages || 149}
            </div>
          </div>

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <Button
              onClick={togglePlayPause}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={fullAudioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default SimpleAudioPlayer;
