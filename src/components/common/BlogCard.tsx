import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "@/data/blogs";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={post.href}
      className={cn(
        "group flex flex-col border-2 border-primary-dark/20 bg-[#fffcf8] transition-transform duration-500 hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-80"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase sm:text-xs">
          {post.category}
        </p>
        <span
          className="mt-2.5 block h-px w-8 bg-primary-dark/40 transition-all duration-500 group-hover:w-12 group-hover:bg-primary"
          aria-hidden
        />
        <h3 className="font-heading mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="font-heading mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-primary-dark transition-colors group-hover:text-primary">
          Read Guide
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
