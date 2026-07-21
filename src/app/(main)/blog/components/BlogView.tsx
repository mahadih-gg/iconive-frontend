"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/utils/cn";

const TABS = [
  { id: 1, label: "Basic Guide" },
  { id: 2, label: "Base & Hair Guide" },
  { id: 3, label: "Wearing & Size Guide" },
  { id: 4, label: "Hair Wave-Curl & Density Guide" },
  { id: 5, label: "Color Guide" },
] as const;

const CONTENT: Record<number, { title: string; body: string }> = {
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

export function BlogView() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(1);

  useEffect(() => {
    const show = searchParams.get("show");
    if (show) setActive(Number(show));
  }, [searchParams]);

  const article = CONTENT[active] ?? CONTENT[1];

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-col flex-wrap justify-center gap-3 px-2 pt-4 pb-2 md:flex-row md:gap-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "cursor-pointer text-sm md:text-base",
              active === tab.id ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mx-auto max-w-4xl py-10 text-start">
        <h2 className="mb-4 text-2xl font-bold">{article.title}</h2>
        <p className="text-muted-foreground">{article.body}</p>
        <div className="mt-8 rounded border bg-muted p-6 text-sm text-muted-foreground">
          Explore product collections and Guide Me for more personalized recommendations.
        </div>
      </div>
    </div>
  );
}
