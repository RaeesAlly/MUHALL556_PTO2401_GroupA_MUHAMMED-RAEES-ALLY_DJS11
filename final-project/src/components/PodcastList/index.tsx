"use client";

import { PodcastType } from "@/types/podcast";
import { PodcastCard } from "../Podcast";
import { useState } from "react";
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

type PodcastListType = {
  podcastList: PodcastType[];
};

export const PodcastList: React.FC<PodcastListType> = ({ podcastList }) => {
  const [isAscending, setIsAscending] = useState(true);
  const getSortedPodcastList = () => {
    return podcastList.sort((podcastA, podcastB) => {
     if (isAscending){
        return podcastA.title < podcastB.title ? -1 : 1;
     }
        return podcastA.title < podcastB.title ? 1 : -1;
    });
  };
  return (
    <section>
        <section>
           {isAscending &&<FaSortAlphaDown size={30} className="cursor-pointer" onClick={()=>setIsAscending(!isAscending)}></FaSortAlphaDown>}
           {!isAscending &&<FaSortAlphaUp size={30} className="cursor-pointer" onClick={()=>setIsAscending(!isAscending)}></FaSortAlphaUp>}
        </section>
      <section className="mt-10 grid grid-cols-5 gap-20">
        {getSortedPodcastList().map((podcast, index: number) => (
          <PodcastCard key={index} podcast={podcast}></PodcastCard>
        ))}
      </section>
    </section>
  );
};
