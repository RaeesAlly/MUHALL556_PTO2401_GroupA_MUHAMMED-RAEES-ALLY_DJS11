"use client"

import { useFavorites } from "@/app/context/favouriteContext"
import { PodcastType } from "@/types/podcast"
import { FaHeart } from "react-icons/fa"

type FavouritePodcastButtonProps={
    podcast:PodcastType
}

export const FavouritePodcastButton=({podcast}:FavouritePodcastButtonProps)=>{
    const { favorites, addPodcast, removePodcast, clearFavorites, isFavorite } = useFavorites();
    return (
        <FaHeart 
        onClick={()=>{
            if(isFavorite(podcast.id)) {
                removePodcast(podcast.id)
            } else {
                addPodcast(podcast)
            }
        }}
        color={isFavorite(podcast.id)?"red":""} size={50}></FaHeart>
    )
}