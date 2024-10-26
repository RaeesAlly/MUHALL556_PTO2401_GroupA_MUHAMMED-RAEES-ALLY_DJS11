import { PodcastCard } from "@/components/Podcast"
import { PodcastType } from "@/types/podcast"


async function getPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app")  
  if(!response.ok){
    throw new Error("Something went wrong")
  }
  const data = await response.json() as PodcastType[]
  const categories = [
    { id: 1, name: "Personal Growth" },
    { id: 2, name: "Investigative Journalism" },
    { id: 3, name: "History" },
    { id: 4, name: "Comedy" },
    { id: 5, name: "Entertainment" },
    { id: 6, name: "Business" },
    { id: 7, name: "Fiction" },
    { id: 8, name: "News" },
    { id: 9, name: "Kids and Family" }
  ];
  return categories.map((category)=>{
    return {
     id:category.id,
     title:category.name,
     podcasts:data.filter((podcast)=>{
      return podcast.genres.includes(category.id)
     })
    }
  }) as {id:number;title:string;podcasts:PodcastType[]}[]
}
export default async function Home() {
  const podcastCategoryList= await getPodcasts()
  return (
    <div>
     <h1 className="text-xl font-bold mb-10">Dashboard</h1>
     <section className="grid gap-20">

     {
      podcastCategoryList.map((podcastCategory,index:number)=>(
        <section key={index}>
          <h2 className="text-lg font-bold mb-10">{podcastCategory.title}</h2>
          <section className="flex gap-10 flex-wrap">
          {
            podcastCategory.podcasts.map((podcast,index:number)=>(
            <PodcastCard key={index}podcast={podcast}></PodcastCard>
            ))
          }
     </section>
        </section>
      )

      )
     }</section>
     
    </div>
  );
}
