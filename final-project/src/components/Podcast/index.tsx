import { PodcastType } from "@/types/podcast"
import Image from "next/image"
import Link from "next/link"


export const PodcastCard=({podcast}:{podcast:PodcastType})=>{
    return (
        <Link href={"/podcast/"+podcast.id}>
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
        </Link>
    )
}