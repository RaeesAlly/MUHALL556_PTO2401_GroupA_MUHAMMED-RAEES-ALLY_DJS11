"use client";

import { PodcastType } from "@/types/podcast";
import { PodcastCard } from "../Podcast";
import { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

type PodcastListType = {
  podcastList: PodcastType[];
};
const categories = [
  { id: 1, name: "Personal Growth" },
  { id: 2, name: "Investigative Journalism" },
  { id: 3, name: "History" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Entertainment" },
  { id: 6, name: "Business" },
  { id: 7, name: "Fiction" },
  { id: 8, name: "News" },
  { id: 9, name: "Kids and Family" },
];

export const PodcastList: React.FC<PodcastListType> = ({ podcastList }) => {
  const [isAscending, setIsAscending] = useState(true);
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("Episode title");
  const getSortedAndFilteredPodcastList = () => {
    return podcastList
      .sort((podcastA, podcastB) => {
        if (sortBy==="Updated date"){

          if (isAscending) {
              return podcastA.updated > podcastB.updated ? -1 : 1;
            }
            return podcastA.updated >  podcastB.updated ? 1 : -1;   
      }
      if (isAscending) {
        return podcastA.title <  podcastB.title? -1 : 1;
      }
      return  podcastA.title<  podcastB.title ? 1 : -1;
      })
      .filter((podcast) => {
        if (genre === "") {
          return true;
        }
        return podcast.genres.includes(Number(genre));
      });
  };
  return (
    <section>
      <section className="flex gap-10">
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
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value={""}>All</option>
          {categories.map((genre, index: number) => (
            <option value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </section>
      <section className="mt-10 grid grid-cols-5 gap-20">
        {getSortedAndFilteredPodcastList().map((podcast, index: number) => (
          <PodcastCard key={index} podcast={podcast}></PodcastCard>
        ))}
      </section>
    </section>
  );
};
