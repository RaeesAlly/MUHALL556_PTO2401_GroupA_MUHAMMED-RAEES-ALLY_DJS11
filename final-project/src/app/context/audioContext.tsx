"use client"
import AudioPlayer from '@/components/AudioPlayer';
import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    useEffect,
    ReactNode,
  } from 'react';
  
  interface AudioPlayerContextType {
    isPlaying: boolean;
    url:string | null;
    progress: number;
    duration: number;
    play: (url: string) => void;
    pause: () => void;
    stop: () => void;
    setProgress: (value: number) => void;
  }
  
  const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);
  
  export const useAudioPlayer = () => {
    const context = useContext(AudioPlayerContext);
    if (!context) {
      throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
    }
    return context;
  };
  
  export const AudioPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    useEffect(() => {
      if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
  
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => setProgress(audioRef.current!.currentTime);
        const handleLoadedMetadata = () => setDuration(audioRef.current!.duration);
  
        const audio = audioRef.current;
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
  
        return () => {
          audio.removeEventListener('play', handlePlay);
          audio.removeEventListener('pause', handlePause);
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }
    }, [audioUrl]);
  
    const play = useCallback((url: string) => {
      setAudioUrl(url);
      audioRef.current?.play();
    }, []);
  
    const pause = useCallback(() => {
      audioRef.current?.pause();
    }, []);
  
    const stop = useCallback(() => {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
      setIsPlaying(false);
    }, []);
  
    const setAudioProgress = useCallback((value: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value;
        setProgress(value);
      }
    }, []);
  
    return (
      <AudioPlayerContext.Provider
        value={{ isPlaying, url:audioUrl, progress, duration, play, pause, stop, setProgress: setAudioProgress }}
      >
        {children}
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );
  };
  
  