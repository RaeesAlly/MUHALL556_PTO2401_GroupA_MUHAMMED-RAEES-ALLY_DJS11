import Image from "next/image"
import Link from "next/link"

export const NavigationBar = () => {
    return (
        <aside className="grid gap-5 w-56 h-full">
            <section className="flex gap-5 text-lg font-bold dark:text-white">
              <Image
               src={"/images/logo.jpg"} 
               width={75}
               height={75}
               className="rounded-lg"
               alt="Pea Pod logo">
              </Image>  
              Pea Pod 
            </section>
            <Link href={"/"} className="dark:text-white">Podcasts</Link>
            <Link href={"/favourites"}  className="dark:text-white">Favourites</Link>
        </aside>
    )
}