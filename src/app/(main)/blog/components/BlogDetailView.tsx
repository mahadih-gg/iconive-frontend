"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlogCard } from "@/components/common/BlogCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  getBlogPostById,
  getRelatedBlogPosts,
} from "@/data/blogs";

interface BlogDetailViewProps {
  id: number;
}

export function BlogDetailView({ id }: BlogDetailViewProps) {
  const post = getBlogPostById(id);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
          Blog
        </p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight">
          Guide not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This guide may have been moved or the link is invalid.
        </p>
        <Button asChild variant="cta" size="ctaSm" className="mt-6">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const related = getRelatedBlogPosts(post.id, 3);

  return (
    <div className="w-full pb-16">
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
              <BreadcrumbLink asChild>
                <Link href="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-4 rounded-none px-0 text-primary-dark hover:bg-transparent hover:text-primary"
        >
          <Link href="/blog">
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="overflow-hidden border-2 border-primary-dark/20 bg-[#fffcf8]">
          <div className="relative aspect-21/9 min-h-48 overflow-hidden bg-[#f3eee6] sm:min-h-64 lg:min-h-80">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                {post.category}
              </p>
              <h1 className="font-heading mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-5 px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>
            <div className="h-px w-12 bg-primary" aria-hidden />
            {post.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm leading-relaxed text-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-10 sm:mt-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
                  Keep reading
                </p>
                <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                  Related guides
                </h2>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden rounded-none text-primary-dark hover:bg-primary/10 sm:inline-flex"
              >
                <Link href="/blog">
                  View all
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
