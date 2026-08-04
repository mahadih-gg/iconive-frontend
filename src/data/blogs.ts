export interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Basics",
    title: "Basic Guide to Choosing Your Wig",
    excerpt:
      "Learn the fundamentals of picking and caring for your Iconive wig — from base types to everyday maintenance.",
    image: "/Image/ImagesPage/ladies.webp",
    href: "/blog/1",
    body: [
      "Choosing the right wig starts with understanding how it should feel, look, and fit in everyday life. At Iconive, we focus on natural movement, comfort, and materials that hold up to real wear.",
      "Begin with your lifestyle needs: how often you will wear the piece, whether you prefer a lighter base, and how much styling flexibility you want. From there, explore base types, density, and color options that complement your features.",
      "Daily care also matters. Gentle washing, proper storage, and the right products help your wig keep its shape and shine for longer. Use this guide as your starting point, then explore fit, color, and density guides for more detail.",
    ],
  },
  {
    id: 2,
    category: "Materials",
    title: "Base & Hair Guide",
    excerpt:
      "Understand mono, lace, skin, silk, and mix bases, plus remy, virgin, and synthetic hair materials.",
    image: "/Image/ImagesPage/why-choose-us.webp",
    href: "/blog/2",
    body: [
      "Your base and hair material determine comfort, durability, and how natural the finished look appears. Mono, lace, skin, silk, and mix bases each offer different strengths for breathability, parting, and longevity.",
      "Hair options range from remy and virgin human hair to synthetic and blended fibers. Human hair gives the most styling freedom, while synthetic fibers can be easier for ready-to-wear routines.",
      "If you are unsure where to start, match the base to your scalp sensitivity and preferred parting, then choose a hair material that fits how often you style with heat or wash the piece.",
    ],
  },
  {
    id: 3,
    category: "Fit & Wear",
    title: "Wearing & Size Guide",
    excerpt:
      "Measure your head correctly and follow wearing tips for all-day comfort and a natural finish.",
    image: "/Image/ImagesPage/gents.webp",
    href: "/blog/3",
    body: [
      "A well-fitted wig should feel secure without pressure points. Accurate measuring is the foundation of a comfortable wear — circumference, front-to-nape, and ear-to-ear all help determine the right size.",
      "When putting your system on, align the front hairline carefully and secure according to your base type. Take a few minutes to blend and adjust so the edges sit naturally.",
      "For all-day comfort, avoid overtightening, keep the scalp clean, and rotate wear styles if needed. Small adjustments early on make a big difference in confidence and comfort.",
    ],
  },
  {
    id: 4,
    category: "Texture",
    title: "Hair Wave-Curl & Density Guide",
    excerpt:
      "Explore wave, curl, and density options to match your preferred style and coverage.",
    image: "/Image/ImagesPage/ladies.webp",
    href: "/blog/4",
    body: [
      "Wave and curl patterns change the personality of a look — from soft movement to defined texture. Density controls how full the hair appears and how much scalp shows through.",
      "Lower densities often look more natural for fine hair, while medium to higher densities create richer volume. Pair texture and density based on the style you want day to day.",
      "If you like versatility, start with a medium density and a soft wave. You can always add styling for more curl definition or brush through for a looser finish.",
    ],
  },
  {
    id: 5,
    category: "Color",
    title: "Find Your Perfect Shade",
    excerpt:
      "Explore our color families and shade guidance to choose the tone that flatters your look.",
    image: "/Image/ImagesPage/why-choose-us.webp",
    href: "/blog/5",
    body: [
      "Color choice is personal — undertone, skin tone, and the contrast you want all influence what looks most flattering. Iconive shades span deep blacks, warm browns, soft blondes, and dimensional blends.",
      "Natural-looking results often come from matching depth first, then refining undertone. Cool, warm, and neutral families help you narrow the options quickly.",
      "When in doubt, choose a shade close to your current or former hair color, or go one step lighter or darker for a soft change that still feels like you.",
    ],
  },
];

export function getBlogPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}

export function getRelatedBlogPosts(id: number, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.id !== id).slice(0, limit);
}
