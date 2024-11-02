import { PodcastCard } from "@/components/Podcast";
import { PodcastList } from "@/components/PodcastList";
import { PodcastType } from "@/types/podcast";

async function getPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app");
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = (await response.json()) as PodcastType[];
  return data;
}
export default async function Home() {
  const podcastList = await getPodcasts();

  return (
    <div>
      <h1 className="text-xl font-bold mb-10">Podcasts</h1>
      <PodcastList podcastList={podcastList}></PodcastList>
    </div>
  );
}
