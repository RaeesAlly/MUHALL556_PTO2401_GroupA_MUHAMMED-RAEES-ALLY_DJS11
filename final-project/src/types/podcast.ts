import { SeasonType } from "./seasons";

export type PodcastType={
    title:string;
    image:string;
    id:string;
    description:string;
    genres:number[];
    seasons:SeasonType[];
    updated:Date;
}