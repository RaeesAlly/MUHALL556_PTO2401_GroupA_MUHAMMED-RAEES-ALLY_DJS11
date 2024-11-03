'use client'; 

import { EpisodeType } from '@/types/episodes';
import { PodcastType } from '@/types/podcast';
import { SeasonType } from '@/types/seasons';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
type FavouriteEpisodeType = {
  favouriteId:string;
  episode:EpisodeType;
  podcast:PodcastType;
  season:SeasonType;
  createdDate:Date;
}
interface FavoritesContextProps {
  favorites: FavouriteEpisodeType[];
  addEpisode: (episode: FavouriteEpisodeType) => void;
  removeEpisode: (favouriteId: string) => void;
  clearFavorites: () => void;
  isFavorite: (favouriteId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

const FAVORITES_KEY = 'favouriteEpisodes';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavouriteEpisodeType[]>([]);
  const [isRefreshed,setIsRefreshed] =useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      setIsRefreshed(true)
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined'&&isRefreshed) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites,isRefreshed]);

  const addEpisode = (favouriteEpisode: FavouriteEpisodeType) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.favouriteId === favouriteEpisode.favouriteId)) return prev; // Avoid duplicates
      return [...prev, favouriteEpisode];
    });
  };

  const removeEpisode = (favouriteId: string) => {
    setFavorites((prev) => prev.filter((pod) => pod.favouriteId !== favouriteId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (favouriteId: string) => {
    return favorites.some((pod) => pod.favouriteId === favouriteId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addEpisode, removeEpisode, clearFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavorites = () => useContext(FavoritesContext) as FavoritesContextProps


