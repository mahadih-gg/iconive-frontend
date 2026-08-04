"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { BlogCard } from "@/components/common/BlogCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOG_POSTS } from "@/data/blogs";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "All";

export function BlogView() {
  const [category, setCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(BLOG_POSTS.map((post) => post.category)));
    return [ALL_CATEGORY, ...unique];
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      [ALL_CATEGORY]: BLOG_POSTS.length,
    };
    for (const post of BLOG_POSTS) {
      counts[post.category] = (counts[post.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredPosts = useMemo(() => {
    if (category === ALL_CATEGORY) return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === category);
  }, [category]);

  return (
    <div className="w-full pb-16">
      <div className="border-b border-primary-dark/10 bg-[#fffcf8]">
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
            <div className="inline-flex items-center gap-2 border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3 text-sm text-primary-dark">
              <BookOpen className="size-4 shrink-0" />
              <span className="font-medium">{filteredPosts.length} guides</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">
        <div className="mb-5 lg:hidden">
          <p className="font-heading mb-2 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase">
            Category
          </p>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11 w-full rounded-none border-primary-dark/20 bg-[#fffcf8]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item} ({categoryCounts[item] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:p-5">
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                Categories
              </p>
              <nav className="mt-4" aria-label="Blog categories">
                <ul className="space-y-0">
                  {categories.map((item) => {
                    const isActive = category === item;
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => setCategory(item)}
                          className={cn(
                            "relative flex w-full items-center justify-between gap-3 border-b border-primary-dark/10 py-3 pr-3 pl-1 text-left text-sm transition-colors last:border-b-0",
                            isActive
                              ? "font-semibold text-primary"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <span>{item}</span>
                          <span
                            className={cn(
                              "inline-flex min-w-5 items-center justify-center px-1.5 py-0.5 text-[10px] font-bold",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-primary/10 text-primary-dark",
                            )}
                          >
                            {categoryCounts[item] ?? 0}
                          </span>
                          {isActive && (
                            <span
                              className="absolute inset-y-2 -right-px w-1 bg-primary"
                              aria-hidden
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <div>
            {filteredPosts.length === 0 ? (
              <div className="border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-12 text-center">
                <p className="font-heading text-lg font-semibold">No guides found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try another category to continue browsing.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
