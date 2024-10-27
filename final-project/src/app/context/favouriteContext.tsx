'use client'; 

import { PodcastType } from '@/types/podcast';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface FavoritesContextProps {
  favorites: PodcastType[];
  addPodcast: (podcast: PodcastType) => void;
  removePodcast: (podcastId: string) => void;
  clearFavorites: () => void;
  isFavorite: (podcastId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

const FAVORITES_KEY = 'favoritePodcasts';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<PodcastType[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  const addPodcast = (podcast: PodcastType) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === podcast.id)) return prev; // Avoid duplicates
      return [...prev, podcast];
    });
  };

  const removePodcast = (podcastId: string) => {
    setFavorites((prev) => prev.filter((pod) => pod.id !== podcastId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (podcastId: string) => {
    return favorites.some((pod) => pod.id === podcastId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addPodcast, removePodcast, clearFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

