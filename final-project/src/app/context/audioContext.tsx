"use client"
import AudioPlayer from '@/components/AudioPlayer';
import { EpisodeType } from '@/types/episodes';
import { PodcastType } from '@/types/podcast';
import { SeasonType } from '@/types/seasons';
import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    useEffect,
    ReactNode,
  } from 'react';
import { useHistory } from './historyContext';
  type AudioType = {
    podcast:PodcastType;
    season:SeasonType;
    episode:EpisodeType;
  }
  interface AudioPlayerContextType {
    isPlaying: boolean;
    url:string | null;
    audioObject:AudioType|undefined;
    progress: number;
    duration: number;
    play: (audio: AudioType) => void;
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
    const [audioObject, setAudioObject] = useState<AudioType>();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const {trackEpisode,getHistory} = useHistory()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => {
          setProgress(audioRef.current!.currentTime)
          if(!audioObject)return
          const historyId = audioObject?.podcast.id+"-"+audioObject?.season.season+"-"+audioObject?.episode.episode;
          const completed = audioRef.current!.currentTime===duration;
          trackEpisode({
            historyId,
            completed,
            tracker:audioRef.current!.currentTime,
            episode:audioObject.episode,
            season:audioObject.season,
            podcast:audioObject.podcast,
            createdDate:new Date()
          })
        };
        const handleEnded = () => {
          if(!audioObject)return
          const historyId = audioObject?.podcast.id+"-"+audioObject?.season.season+"-"+audioObject?.episode.episode;
          const completed = true;
          trackEpisode({
            historyId,
            completed,
            tracker:0,
            episode:audioObject.episode,
            season:audioObject.season,
            podcast:audioObject.podcast,
            createdDate:new Date()
          })
        };
        const handleLoadedMetadata = () => setDuration(audioRef.current!.duration);
  
        const audio = audioRef.current;
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
  
        return () => {
          audio.removeEventListener('play', handlePlay);
          audio.removeEventListener('pause', handlePause);
          audio.removeEventListener('ended', handleEnded);
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }
    }, [audioUrl]);
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
    const play = useCallback((audioObject: AudioType) => {
      setAudioObject(audioObject)
      setAudioUrl(audioObject.episode.file);
      const historyId = audioObject?.podcast.id+"-"+audioObject?.season.season+"-"+audioObject?.episode.episode;
      const history=getHistory( historyId)
      if(history && audioRef.current&& !history.completed){
        audioRef.current.currentTime=history.tracker;
        setProgress(history.tracker)
      }
    
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
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
    const setAudioProgress = useCallback((value: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value;
       // setProgress(value);
       
        if(!audioObject)return
        const historyId = audioObject?.podcast.id+"-"+audioObject?.season.season+"-"+audioObject?.episode.episode;
        const completed = value===duration;
        trackEpisode({
          historyId,
          completed,
          tracker:value,
          episode:audioObject.episode,
          season:audioObject.season,
          podcast:audioObject.podcast,
          createdDate:new Date()
        })
      }
    }, [audioObject]);
 
  

  
    return (
      <AudioPlayerContext.Provider
        value={{ isPlaying, url:audioUrl, progress,audioObject, duration, play, pause, stop, setProgress: setAudioProgress }}
      >
        {children}
        <AudioPlayer />
      </AudioPlayerContext.Provider>
    );
  };
  
  