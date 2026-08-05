import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { BlogPostMeta } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPostMeta;
  className?: string;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col border-2 border-primary-dark/20 bg-[#fffcf8] transition-transform duration-500 hover:-translate-y-0.5 dark:border-primary-dark/40 dark:bg-card",
        className,
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-4/3 overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-80"
          aria-hidden
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="font-heading text-[10px] font-semibold tracking-[0.16em] text-primary-dark uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <span
          className="mt-2.5 block h-px w-8 bg-primary-dark/40 transition-all duration-500 group-hover:w-12 group-hover:bg-primary"
          aria-hidden
        />

        <h3 className="font-heading mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-primary-dark"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" aria-hidden />
            {post.readingTime}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="font-heading mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-primary-dark transition-colors group-hover:text-primary"
        >
          Read More
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
