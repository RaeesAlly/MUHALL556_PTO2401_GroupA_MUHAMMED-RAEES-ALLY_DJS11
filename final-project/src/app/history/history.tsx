"use client";

import Image from "next/image";
import { useHistory } from "../context/historyContext";
import { format, formatDistance } from "date-fns";
import { PodcastEpisode } from "@/components/PodcastEpisode";
import { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

export const HistoryEpisodeList = () => {
  const { history,clearHistory } = useHistory();
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState("Episode title");
  const getSortedhistoryEpisodes = () => {
    return history
      .sort((historyA, historyB) => {
        if (sortBy==="Updated date"){

            if (isAscending) {
                return historyA.podcast.updated > historyB.podcast.updated ? -1 : 1;
              }
              return  historyA.podcast.updated > historyB.podcast.updated ? 1 : -1;   
        }
        if (isAscending) {
          return historyA.episode.title < historyB.episode.title? -1 : 1;
        }
        return  historyA.episode.title< historyB.episode.title ? 1 : -1;
      });
  };
  return (
    <section>
        <section className="flex gap-5 mb-10">
        {isAscending && (
          <FaSortAlphaDown
            size={30}
            className="cursor-pointer"
            onClick={() => setIsAscending(!isAscending)}
          ></FaSortAlphaDown>
        )}
        {!isAscending && (
          <FaSortAlphaUp
            size={30}
            className="cursor-pointer"
            onClick={() => setIsAscending(!isAscending)}
          ></FaSortAlphaUp>
        )}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {["Episode title","Updated date"].map((value, index: number) => (
            <option key={index} value={value}>{value}</option>
          ))}
        </select>
        <button onClick={()=>clearHistory()}>Clear History</button>
        </section>
    <section className="grid gap-10">
      {getSortedhistoryEpisodes().map((history, index: number) => (
        <section key={index}>
          <section className="items-start flex gap-10">
            <Image
              className="rounded-xl"
              height={120}
              width={120}
              src={history.podcast.image}
              alt={history.podcast.title}
            ></Image>
            <section className="grid gap-1 items-start justify-items-start">
              <h2 className="text-xl font-bold">
                Podcast: {history.podcast.title}
              </h2>
              <h3 className="text-lg font-bold">
                Season: {history.season.title}
              </h3>
              <p className="mb-1 text-gray-500">History date: {formatDistance(history.createdDate, new Date())}</p>
              <p className="mb-1 text-gray-500">Play Progress: {history.completed?"Completed":"In Progress"}</p>
              <p className="mb-1 text-gray-500">Podcast updated date: {format(history.podcast.updated,"EEE, d MMM yyyy hh:mm" )}</p>
              <PodcastEpisode
                key={index}
                podcast={history.podcast}
                season={history.season}
                episode={history.episode}
              ></PodcastEpisode>
            </section>
          </section>
        </section>
      ))}
    </section>
    </section>
  );
};
