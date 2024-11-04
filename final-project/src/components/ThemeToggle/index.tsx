"use client"
import { useTheme } from "next-themes"
import { FaMoon, FaSun } from "react-icons/fa"

export const ThemeToggle = () => {
    const {setTheme} = useTheme()
    return (
        <section className="flex gap-5">
            <FaMoon size={25} onClick={()=>setTheme("dark")} className="cursor-pointer"></FaMoon>
            <FaSun size={25} onClick={()=>setTheme("light")} className="cursor-pointer"></FaSun>
        </section>

    )
}