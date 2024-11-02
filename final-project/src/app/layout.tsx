import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavigationBar } from "@/components/NavigationBar/Index";
import { Providers } from "@/components/Providers";
import { AudioPlayerProvider } from "./context/audioContext";
import { FavoritesProvider } from "./context/favouriteContext";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pea Pod",
  description: "Pea Pod, a compilation of all podcasts like peas in a pod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <FavoritesProvider >
        <AudioPlayerProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-white h-screen`}
          >
            <div className="flex items-start gap-10 p-10 ">
              <section className="w-56">
                {" "}
                <NavigationBar></NavigationBar>
              </section>
               <Suspense fallback={<Loading></Loading>}>
              <section className="grow">{children}</section>
              </Suspense>
              
            </div>
          </body>
        </AudioPlayerProvider>
        </FavoritesProvider>
      </Providers>
    </html>
  );
}
