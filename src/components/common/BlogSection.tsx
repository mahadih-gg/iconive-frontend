import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import type { BlogPostMeta } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogSectionProps {
  posts: BlogPostMeta[];
  className?: string;
}

export function BlogSection({ posts, className }: BlogSectionProps) {
  return (
    <section className={cn("bg-background px-4 py-8 sm:py-10", className)}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          className="mb-10 sm:mb-12"
          label="From The Journal"
          heading="Guides &"
          heading2="Inspiration"
          paragraph="Tips, fit advice, and styling ideas to help you choose with confidence."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button variant="cta" size="cta" iconMotion="right" asChild>
            <Link href="/blog">
              Explore All Guides
              <span data-slot="button-arrow" aria-hidden>
                <ArrowRight />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
