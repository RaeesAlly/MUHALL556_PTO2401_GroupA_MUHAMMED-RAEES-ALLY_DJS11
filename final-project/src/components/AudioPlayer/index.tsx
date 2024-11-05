import { useAudioPlayer } from "@/app/context/audioContext";
import React from "react";
import { FaPlay, FaStop } from "react-icons/fa";

const AudioPlayer: React.FC = () => {
  const { isPlaying, progress,audioObject, duration, play, pause, setProgress } =
    useAudioPlayer();
  if (!audioObject) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex items-center space-x-4">
      {!isPlaying && (
        <FaPlay
          onClick={() => {
            play(audioObject);
          }}
          size={30}
        ></FaPlay>
      )}
      {isPlaying && (
        <FaStop
          onClick={() => {
            pause();
          }}
          size={30}
        ></FaStop>
      )}
      <section className="grow">
        <p>Podcast: {audioObject.podcast.title}</p>
        <p>{audioObject.episode.episode}. {audioObject.episode.title}</p>
      </section>
      <input
        type="range"
        min={0}
        max={duration}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="flex-grow"
      />
      <span>
        {Math.floor(progress)} / {Math.floor(duration)} sec
      </span>
    </div>
  );
};

export default AudioPlayer;
