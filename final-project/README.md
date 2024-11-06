This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Introduction

Welcome to PeaPods, a web application built with Next.js, TypeScript, and styled with Tailwind CSS. This app offers podcast listeners an engaging platform to explore, play, and organise their favorite podcasts. Leveraging Next.js's App Router for intuitive navigation, PeaPods delivers a smooth, modern experience across both desktop and mobile.

With TypeScript, PeaPods ensures code consistency and reliability, while the use of React Context and useState enables dynamic and responsive state management across pages. Whether users want to browse episodes, sort playlists, or enjoy uninterrupted audio playback, PeaPods makes podcast discovery enjoyable and straightforward.

Check out the live version at: [raeesdjs11.netlify.app](https://raeesdjs11.netlify.app/)

## Getting Started

First, run the development server:

```bash   
npm install   
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code structure
Public Folder: Contains static assets, including images and logos.
src Folder:
components: Holds all React components.
types: Contains TypeScript type definitions, enhancing code safety and consistency.

Routing and Usage:
The app utilises Next.js App Router for file-based routing:
Each page.tsx file represents a unique URL, such as page.tsx

Rendering:
Client-Side Rendering: Renders data dynamically in the browser.
Server-Side Rendering: Pre-renders data on the server to improve load speed for pages.

State Management:
Global State: Managed through React Context, enabling data persistence across pages. For example, the audioContext.tsx file in the context folder helps maintain the state of the audio player across different pages.
Local State: useState is used for managing component-specific states, like sorting the podcast list by ascending or descending order. This keeps state changes isolated to individual components.
React Hooks
useEffect: Executes code when a component or page is first loaded. It’s useful for initializing data or triggering side effects on page load.

## usage examples 

The app supports dynamic sorting, search, and playback features. Users can navigate through various episodes, control playback, and adjust settings as they prefer. Below are a few usage examples:

Browsing Episodes: Episodes are listed by default in a chronological order. Using useState, users can sort episodes in ascending or descending order.
Persistent Audio Playback: The audio player’s state remains consistent as users navigate between pages, thanks to audioContext.

## Contact information
Email:raees_ally@outlook.com



## IMPORTANT
Reason for not being able to implement the confirmation for closing the page while audio is playing: Due to limitations with Next.js App Router 
https://www.reddit.com/r/nextjs/s/aclHWP3Kyz




