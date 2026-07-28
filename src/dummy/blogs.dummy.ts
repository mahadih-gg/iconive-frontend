// DUMMY_DATA: static blog content — replace with CMS/API later

export const blogTabsDummy = [
  { id: 1, label: "Basic Guide" },
  { id: 2, label: "Base & Hair Guide" },
  { id: 3, label: "Wearing & Size Guide" },
  { id: 4, label: "Hair Wave-Curl & Density Guide" },
  { id: 5, label: "Color Guide" },
] as const;

export const blogContentDummy: Record<number, { title: string; body: string }> = {
  1: {
    title: "Basic Guide",
    body: "Learn the fundamentals of choosing and caring for your Iconive wig — from base types to daily maintenance tips.",
  },
  2: {
    title: "Base & Hair Guide",
    body: "Understand mono, lace, skin, silk, and mix bases, plus remy, virgin, and synthetic hair materials.",
  },
  3: {
    title: "Wearing & Size Guide",
    body: "Measure your head correctly and follow wearing instructions for comfort and a natural look.",
  },
  4: {
    title: "Hair Wave-Curl & Density Guide",
    body: "Explore wave, curl, and density options to match your preferred style and coverage.",
  },
  5: {
    title: "Color Guide",
    body: "Use our color families and shade guidance to pick the right tone for your look.",
  },
};
