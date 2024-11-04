"use client";

import { useAudioPlayer } from "@/app/context/audioContext";
import { EpisodeType } from "@/types/episodes";
import { PodcastType } from "@/types/podcast";
import { SeasonType } from "@/types/seasons";
import { FaPlay, FaStop } from "react-icons/fa";
import { FavouritePodcastEpisodeButton } from "../FavouriteEpisodeButton";

type PodcastEpisodeProps = {
  podcast: PodcastType;
  season: SeasonType;
  episode: EpisodeType;
};
export const PodcastEpisode = ({
  podcast,
  season,
  episode,
}: PodcastEpisodeProps) => {
  const { play, stop, isPlaying, url } = useAudioPlayer();
  
  const isPlayingEpisode = isPlaying && url === episode.file;
  return (
    <section className="flex gap-3 ">
      {!isPlayingEpisode && (
        <FaPlay
          onClick={() => {
            play({podcast,season,episode});
          }}
          size={30}
        ></FaPlay>
      )}
      {isPlayingEpisode && (
        <FaStop
          onClick={() => {
            stop();
          }}
          size={30}
        ></FaStop>
      )}
      <span className="">{episode.episode}. {episode.title}</span>
      <FavouritePodcastEpisodeButton
        podcast={podcast}
        season={season}
        episode={episode}
      ></FavouritePodcastEpisodeButton>
    </section>
  );
};
