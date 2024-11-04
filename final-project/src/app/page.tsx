
import { PodcastList } from "@/components/PodcastList";
import { PodcastPreviewType } from "@/types/preview";

async function getPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app");
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = (await response.json()) as PodcastPreviewType[];
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
