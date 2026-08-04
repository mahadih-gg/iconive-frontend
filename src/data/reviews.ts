export interface ProductReview {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  images?: string[];
  verified?: boolean;
  location?: string;
  helpful?: number;
}

export const PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: "1",
    name: "Jessica M.",
    initials: "JM",
    avatar: "https://i.pravatar.cc/96?img=5",
    rating: 5,
    date: "Mar 12, 2026",
    title: "Looks completely natural",
    comment:
      "The lace is undetectable and the hair feels so soft. I get compliments every time I wear it. Packaging was beautiful too. The lace is undetectable and the hair feels so soft. I get compliments every time I wear it. Packaging was beautiful too.",
    images: [
      "/Image/Black/1jetblack.webp",
      "/Image/ImagesPage/ladies.webp",
    ],
    verified: true,
    location: "New York, USA",
    helpful: 24,
  },
  {
    id: "2",
    name: "Aisha R.",
    initials: "AR",
    avatar: "https://i.pravatar.cc/96?img=9",
    rating: 5,
    date: "Feb 28, 2026",
    title: "Perfect shade match",
    comment:
      "I ordered Medium Brown and it blends perfectly with my natural hair. Density is full without looking bulky. Worth every penny.",
    images: ["/Image/Brown/4 medium brown.webp"],
    verified: true,
    location: "London, UK",
    helpful: 18,
  },
  {
    id: "3",
    name: "Camille T.",
    initials: "CT",
    avatar: "https://i.pravatar.cc/96?img=20",
    rating: 4,
    date: "Feb 14, 2026",
    title: "Great quality, slight wait",
    comment:
      "Processing took about 18 days as stated, but the quality is premium. Cap fit is comfortable all day. Would reorder in a lighter shade.",
    images: [
      "/Image/Blonde/613 PLATINUM BLONDE.webp",
      "/Image/ImagesPage/why-choose-us.webp",
    ],
    verified: true,
    location: "Toronto, CA",
    helpful: 11,
  },
  {
    id: "4",
    name: "Nina K.",
    initials: "NK",
    avatar: "https://i.pravatar.cc/96?img=32",
    rating: 5,
    date: "Jan 30, 2026",
    title: "Best wig I've owned",
    comment:
      "Soft movement, long-lasting density, and the color is rich. Customer service helped me pick the right length. Highly recommend Iconive.",
    images: ["/Image/Brown/2 DARKEST BROWN.webp"],
    verified: true,
    location: "Dubai, UAE",
    helpful: 32,
  },
  {
    id: "5",
    name: "Priya S.",
    initials: "PS",
    avatar: "https://i.pravatar.cc/96?img=47",
    rating: 5,
    date: "Jan 18, 2026",
    title: "Feels luxurious",
    comment:
      "Stays put all day and looks expensive. The cap size guide was helpful — Medium fits perfectly. Already planning my next order.",
    verified: true,
    location: "Mumbai, IN",
    helpful: 9,
  },
  {
    id: "6",
    name: "Hannah L.",
    initials: "HL",
    avatar: "https://i.pravatar.cc/96?img=12",
    rating: 4,
    date: "Jan 5, 2026",
    title: "Beautiful piece",
    comment:
      "Love the natural hairline. Took a bit of styling out of the box, then it looked flawless. Photos don't do it justice.",
    images: ["/Image/ImagesPage/gents.webp"],
    verified: false,
    location: "Sydney, AU",
    helpful: 6,
  },
];

export function getReviewStats(reviews: ProductReview[] = PRODUCT_REVIEWS) {
  const total = reviews.length;
  const average =
    total === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) / total;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length;
    return {
      stars,
      count,
      percent: total === 0 ? 0 : Math.round((count / total) * 100),
    };
  });

  return { total, average, distribution };
}
