import { EpisodeType } from "./episodes";

export type SeasonType ={
    season: number;
    title:string;
    image:string;
    episodes:EpisodeType[];
}