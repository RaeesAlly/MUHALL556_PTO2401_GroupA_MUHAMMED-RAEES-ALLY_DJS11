import { PodcastType } from "@/types/podcast"
import Image from "next/image"


export const PodcastCard=({podcast}:{podcast:PodcastType})=>{
    return (
        <section className="grid gap-2">
            <Image className="rounded-lg"
            width={150}
            height={150}
             alt={podcast.title}
             src={podcast.image}></Image>
            <span>
             {podcast.title
             }
            </span>
        </section>
    )
}