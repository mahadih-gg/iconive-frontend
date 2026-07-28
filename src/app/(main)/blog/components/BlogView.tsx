"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// DUMMY_DATA: static blog content — replace with CMS/API later
import { blogContentDummy, blogTabsDummy } from "@/dummy/blogs.dummy";
import { cn } from "@/utils/cn";

export function BlogView() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(1);

  useEffect(() => {
    const show = searchParams.get("show");
    if (show) setActive(Number(show));
  }, [searchParams]);

  const article = blogContentDummy[active] ?? blogContentDummy[1];

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-col flex-wrap justify-center gap-3 px-2 pt-4 pb-2 md:flex-row md:gap-8">
        {blogTabsDummy.map((tab) => (
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
