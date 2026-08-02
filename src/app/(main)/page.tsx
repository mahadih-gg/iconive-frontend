import { HERO_VIDEOS } from "@/utils/constants";

import { HomeView } from "./components/HomeView";

export default function HomePage() {
  const initialHeroVideo = HERO_VIDEOS[0];

  return (
    <>
      {/* Preload first hero clip from the server for first paint */}
      <link rel="preload" href={initialHeroVideo} as="video" type="video/webm" />
      <HomeView heroVideos={HERO_VIDEOS} />
    </>
  );
}
