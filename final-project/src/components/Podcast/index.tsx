import { PodcastPreviewType } from "@/types/preview";
import Image from "next/image";
import Link from "next/link";

export const PodcastCard = ({ podcast }: { podcast: PodcastPreviewType }) => {
  return (
    <Link href={"/podcast/" + podcast.id}>
      <section className="grid gap-2">
        <Image
          className="rounded-lg"
          width={150}
          height={150}
          alt={podcast.title}
          src={podcast.image}
        ></Image>
        <span>{podcast.title}</span>
        <span className="text-gray-500">Seasons: {podcast.seasons}</span>
      </section>
    </Link>
  );
};
