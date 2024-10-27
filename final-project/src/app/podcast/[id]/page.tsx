import { PodcastType } from "@/types/podcast";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { PodcastEpisode } from "./episode";

async function getPodcast(params: { id: number }) {
  const response = await fetch(
    "https://podcast-api.netlify.app/id/" + params.id
  );
  if (!response.ok) {
    throw new Error("podcast not found");
  }
  const data = await response.json();
  return data as PodcastType;
}

export default async function Podcast({ params }: { params: { id: number } }) {
  const podcast = await getPodcast(params);
  return (
    <div>
      <h1 className="text-xl font-bold mb-10">Podcast</h1>
      <section className="items-start flex gap-10">
        <Image
          className="rounded-xl"
          height={250}
          width={250}
          src={podcast.image}
          alt={podcast.title}
        ></Image>
        <section className="grid gap-3 items-start justify-items-start">
          <h2 className="text-lg font-bold">{podcast.title}</h2>
          <p>{podcast.description}</p>
        </section>
      </section>
      <section className="flex gap-5 mt-10">
        {podcast.genres &&
          podcast.genres.map((genre, index: number) => (
            <section className="p-2 bg-gray-700 rounded-lg" key={index}>
              {genre}
            </section>
          ))}
      </section>
      <h1 className="text-lg font-bold my-10">Seasons</h1>
      <section className="gap-20 grid">
        {podcast.seasons.map((season, index: number) => (
          <section className="" key={index}>
            <section className="flex gap-7">
              <Image
                className="rounded-xl w-56 h-56"
                height={150}
                width={150}
                src={season.image}
                alt={season.title}
              ></Image>
              <section>
              <section className="grid gap-3 items-start justify-items-start">
                <h2 className="text-xl font-bold">{season.title}</h2>
              </section>

              <h2 className="text-lg font-bold mt-10">{"Episodes"}</h2>
              <section key={index} className="grid gap-5 mt-10">
                {season.episodes.map((episode, index: number) => (
                 <PodcastEpisode key={index} episode={episode}></PodcastEpisode>
                ))}
              </section>
              </section>
            </section>
          </section>
        ))}
      </section>
    </div>
  );
}
