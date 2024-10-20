import Image from "next/image"
import Link from "next/link"

export const NavigationBar = () => {
    return (
        <aside className="grid gap-5">
            <section className="flex gap-5 text-lg font-bold">
              <Image
               src={"/images/logo.jpg"} 
               width={75}
               height={75}
               className="rounded-lg"
               alt="Pea Pod logo">
              </Image>  
              Pea Pod 
            </section>
            <Link href={""}>Dashboard</Link>
            <Link href={"/search"}>Search</Link>
            <Link href={"/favourites"}>Favourites</Link>
        </aside>
    )
}