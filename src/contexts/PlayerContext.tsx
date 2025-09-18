import React, { createContext, useContext, useState, useRef } from 'react';

export interface MediaItem {
  id: string;
  title: string;
  author: string;
  cover: string;
  duration: number;
  type: 'ebook' | 'audiobook' | 'podcast';
  url?: string;
  chapters?: Chapter[];
  progress?: number;
}

export interface Chapter {
  id: string;
  title: string;
  startTime: number;
  duration: number;
}

interface PlayerState {
  currentItem: MediaItem | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  playbackRate: number;
  queue: MediaItem[];
  queueIndex: number;
  sleepTimer: number | null;
  bookmarks: { time: number; note: string }[];
}

interface PlayerContextType {
  state: PlayerState;
  play: (item?: MediaItem) => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  addToQueue: (item: MediaItem) => void;
  removeFromQueue: (index: number) => void;
  setSleepTimer: (minutes: number | null) => void;
  addBookmark: (note: string) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [state, setState] = useState<PlayerState>({
    currentItem: null,
    isPlaying: false,
    currentTime: 0,
    volume: 1,
    playbackRate: 1,
    queue: [],
    queueIndex: -1,
    sleepTimer: null,
    bookmarks: [],
  });

  const play = (item?: MediaItem) => {
    if (item) {
      setState(prev => ({
        ...prev,
        currentItem: item,
        isPlaying: true,
      }));
    } else {
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const pause = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const seek = (time: number) => {
    setState(prev => ({ ...prev, currentTime: time }));
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipForward = (seconds = 15) => {
    const newTime = Math.min(state.currentTime + seconds, state.currentItem?.duration || 0);
    seek(newTime);
  };

  const skipBackward = (seconds = 15) => {
    const newTime = Math.max(state.currentTime - seconds, 0);
    seek(newTime);
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume }));
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const setPlaybackRate = (rate: number) => {
    setState(prev => ({ ...prev, playbackRate: rate }));
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const addToQueue = (item: MediaItem) => {
    setState(prev => ({
      ...prev,
      queue: [...prev.queue, item],
    }));
  };

  const removeFromQueue = (index: number) => {
    setState(prev => ({
      ...prev,
      queue: prev.queue.filter((_, i) => i !== index),
    }));
  };

  const setSleepTimer = (minutes: number | null) => {
    setState(prev => ({ ...prev, sleepTimer: minutes }));
  };

  const addBookmark = (note: string) => {
    setState(prev => ({
      ...prev,
      bookmarks: [...prev.bookmarks, { time: prev.currentTime, note }],
    }));
  };

  return (
    <PlayerContext.Provider
      value={{
        state,
        play,
        pause,
        togglePlay,
        seek,
        skipForward,
        skipBackward,
        setVolume,
        setPlaybackRate,
        addToQueue,
        removeFromQueue,
        setSleepTimer,
        addBookmark,
        audioRef,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setState(prev => ({ ...prev, currentTime: audioRef.current!.currentTime }));
          }
        }}
        onEnded={() => {
          // Auto-play next in queue
          setState(prev => {
            if (prev.queueIndex < prev.queue.length - 1) {
              return {
                ...prev,
                currentItem: prev.queue[prev.queueIndex + 1],
                queueIndex: prev.queueIndex + 1,
              };
            }
            return { ...prev, isPlaying: false };
          });
        }}
      />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};