"use client";

import { EpisodeType } from "@/types/episodes";
import { PodcastType } from "@/types/podcast";
import { SeasonType } from "@/types/seasons";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
type HistoryEpisodeType = {
  historyId: string;
  episode: EpisodeType;
  podcast: PodcastType;
  season: SeasonType;
  createdDate: Date;
  completed: boolean;
  tracker: number;
};
interface HistoryContextProps {
  history: HistoryEpisodeType[];
  trackEpisode: (episode: HistoryEpisodeType) => void;
  removeEpisode: (historyId: string) => void;
  clearHistory: () => void;
  getHistory: (historyId: string) => HistoryEpisodeType | undefined;
}

const HistoryContext = createContext<HistoryContextProps | undefined>(
  undefined
);

const HISTORY_KEY = "episodeHistory";

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryEpisodeType[]>([]);
  const [isRefreshed, setIsRefreshed] = useState(false);
  useEffect(() => {
    // if (typeof window !== 'undefined') {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
    setIsRefreshed(true);
    // }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isRefreshed) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  }, [history, isRefreshed]);

  const trackEpisode = (historyEpisode: HistoryEpisodeType) => {
    setHistory((prev) => {
      if (prev.some((p) => p.historyId === historyEpisode.historyId)) {
        return prev.map((p) =>
          p.historyId === historyEpisode.historyId ? historyEpisode : p
        );
      }
      return [...prev, historyEpisode];
    });
  };

  const removeEpisode = (historyId: string) => {
    setHistory((prev) => prev.filter((pod) => pod.historyId !== historyId));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getHistory = (historyId: string) => {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      return JSON.parse(storedHistory).find((pod:HistoryEpisodeType) => pod.historyId === historyId);
    }
    return undefined
  };

  return (
    <HistoryContext.Provider
      value={{ history, trackEpisode, removeEpisode, clearHistory, getHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
export const useHistory = () =>
  useContext(HistoryContext) as HistoryContextProps;
