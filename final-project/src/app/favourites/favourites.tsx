"use client";

import Image from "next/image";
import { useFavorites } from "../context/favouriteContext";
import { formatDistance } from "date-fns";
import { PodcastEpisode } from "@/components/PodcastEpisode";

export const FavouriteEpisodeList = () => {
  const { favorites } = useFavorites();
  return (
    <section className="grid gap-10">
      {favorites.map((favorite, index: number) => (
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
              <p className="mb-1">{formatDistance(favorite.createdDate, new Date())}</p>
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
  );
};
