import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlogCard } from "@/components/common/BlogCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/data/blogs";
import { cn } from "@/lib/utils";

interface BlogSectionProps {
  className?: string;
}

export function BlogSection({ className }: BlogSectionProps) {
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
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
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
