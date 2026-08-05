import { HERO_VIDEOS } from "@/utils/constants";
import { getAllBlogs, getFeaturedBlogs } from "@/lib/blogs";

import { HomeView } from "./components/HomeView";

export default function HomePage() {
  const initialHeroVideo = HERO_VIDEOS[0];
  const featured = getFeaturedBlogs();
  const blogPosts = (featured.length > 0 ? featured : getAllBlogs())
    .slice(0, 3)
    .map(({ content: _content, ...post }) => post);

  return (
    <>
      {/* Preload first hero clip from the server for first paint */}
      <link rel="preload" href={initialHeroVideo} as="video" type="video/webm" />
      <HomeView heroVideos={HERO_VIDEOS} blogPosts={blogPosts} />
    </>
  );
}
