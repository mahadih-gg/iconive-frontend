import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { BlogCard } from "@/components/blog/BlogCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, fit advice, and styling ideas to help you choose your Iconive wig with confidence.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Iconive Hair Wigs",
    description:
      "Tips, fit advice, and styling ideas to help you choose your Iconive wig with confidence.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Iconive Hair Wigs",
    description:
      "Tips, fit advice, and styling ideas to help you choose your Iconive wig with confidence.",
  },
};

export default function BlogPage() {
  const posts = getAllBlogs();

  return (
    <div className="w-full pb-16">
      <div className="border-b border-primary-dark/10 bg-[#fffcf8] dark:border-primary-dark/20 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                From The Journal
              </p>
              <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Guides & Inspiration
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                Tips, fit advice, and styling ideas to help you choose your Iconive
                wig with confidence.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3 text-sm text-primary-dark dark:border-primary-dark/30 dark:bg-muted">
              <BookOpen className="size-4 shrink-0" />
              <span className="font-medium">
                {posts.length} {posts.length === 1 ? "guide" : "guides"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No blog posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
