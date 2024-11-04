"use client";

import Image from "next/image";
import { useFavorites } from "../context/favouriteContext";
import { format, formatDistance } from "date-fns";
import { PodcastEpisode } from "@/components/PodcastEpisode";
import { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

export const FavouriteEpisodeList = () => {
  const { favorites } = useFavorites();
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState("Episode title");
  const getSortedFavoriteEpisodes = () => {
    return favorites
      .sort((favoriteA, favoriteB) => {
        if (sortBy==="Updated date"){

            if (isAscending) {
                return favoriteA.podcast.updated > favoriteB.podcast.updated ? -1 : 1;
              }
              return  favoriteA.podcast.updated > favoriteB.podcast.updated ? 1 : -1;   
        }
        if (isAscending) {
          return favoriteA.episode.title < favoriteB.episode.title? -1 : 1;
        }
        return  favoriteA.episode.title< favoriteB.episode.title ? 1 : -1;
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
        </section>
    <section className="grid gap-10">
      {getSortedFavoriteEpisodes().map((favorite, index: number) => (
        <section key={index}>
          <section className="items-start flex gap-10">
            <Image
              className="rounded-xl"
              height={120}
              width={120}
              src={favorite.podcast.image}
              alt={favorite.podcast.title}
            ></Image>
            <section className="grid gap-1 items-start justify-items-start">
              <h2 className="text-xl font-bold">
                Podcast: {favorite.podcast.title}
              </h2>
              <h3 className="text-lg font-bold">
                Season: {favorite.season.title}
              </h3>
              <p className="mb-1">Favorite date: {formatDistance(favorite.createdDate, new Date())}</p>
              <p className="mb-1">Podcast updated date: {format(favorite.podcast.updated,"EEE, d MMM yyyy hh:mm" )}</p>
              <PodcastEpisode
                key={index}
                podcast={favorite.podcast}
                season={favorite.season}
                episode={favorite.episode}
              ></PodcastEpisode>
            </section>
          </section>
        </section>
      ))}
    </section>
    </section>
  );
};
