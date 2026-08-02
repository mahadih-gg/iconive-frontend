export interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Basics",
    title: "Basic Guide to Choosing Your Wig",
    excerpt:
      "Learn the fundamentals of picking and caring for your Iconive wig — from base types to everyday maintenance.",
    image: "/Image/ImagesPage/ladies.webp",
    href: "/blog?show=1",
  },
  {
    id: 3,
    category: "Fit & Wear",
    title: "Wearing & Size Guide",
    excerpt:
      "Measure your head correctly and follow wearing tips for all-day comfort and a natural finish.",
    image: "/Image/ImagesPage/gents.webp",
    href: "/blog?show=3",
  },
  {
    id: 5,
    category: "Color",
    title: "Find Your Perfect Shade",
    excerpt:
      "Explore our color families and shade guidance to choose the tone that flatters your look.",
    image: "/Image/ImagesPage/why-choose-us.webp",
    href: "/blog?show=5",
  },
];
