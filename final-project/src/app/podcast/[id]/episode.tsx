"use client";

import { useAudioPlayer } from "@/app/context/audioContext";
import { EpisodeType } from "@/types/episodes";
import { FaPlay, FaStop } from "react-icons/fa";

type PodcastEpisodeProps = { episode: EpisodeType };
export const PodcastEpisode = ({ episode }: PodcastEpisodeProps) => {
  const { play,stop,isPlaying,url } = useAudioPlayer();
  const isPlayingEpisode=isPlaying && url === episode.file
  return (
    <section className="flex gap-3 ">
      {!isPlayingEpisode&&<FaPlay onClick={() => { play(episode.file)}} size={30}></FaPlay>}
      {isPlayingEpisode&&<FaStop onClick={() => { stop()}} size={30}></FaStop>}
      <span className="">{episode.title}</span>
    </section>
  );
};
