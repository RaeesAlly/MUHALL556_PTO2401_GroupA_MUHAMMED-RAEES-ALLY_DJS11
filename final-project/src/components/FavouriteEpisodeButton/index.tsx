"use client";

import { useFavorites } from "@/app/context/favouriteContext";
import { EpisodeType } from "@/types/episodes";
import { PodcastType } from "@/types/podcast";
import { SeasonType } from "@/types/seasons";
import { FaHeart } from "react-icons/fa";

type FavouritePodcastEpisodeButtonProps = {
  podcast: PodcastType;
  season: SeasonType;
  episode: EpisodeType;
};

export const FavouritePodcastEpisodeButton = ({
  podcast,
  season,
  episode,
}: FavouritePodcastEpisodeButtonProps) => {
  const { addEpisode, removeEpisode, isFavorite } = useFavorites();
  const favouriteId = podcast.id + "-" + season.season + "-" + episode.episode;
  return (
    <FaHeart
      onClick={() => {
        if (isFavorite(favouriteId)) {
          removeEpisode(favouriteId);
        } else {
          addEpisode({
            favouriteId,
            podcast,season,episode,
            createdDate: new Date(),
          });
        }
      }}
      color={isFavorite(favouriteId) ? "red" : ""}
      size={30}
    ></FaHeart>
  );
};
