import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { BlogCard } from "@/components/blog/BlogCard";
import { BlogContent } from "@/components/blog/BlogContent";
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
  getAdjacentBlogs,
  getBlogBySlug,
  getBlogSlugs,
  getRelatedBlogs,
} from "@/lib/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.cover,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  const { previous, next } = getAdjacentBlogs(slug);
  const related = getRelatedBlogs(slug, 3);

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

        <article className="overflow-hidden border-2 border-primary-dark/20 bg-[#fffcf8] dark:border-primary-dark/40 dark:bg-card">
          <div className="relative aspect-21/9 min-h-48 overflow-hidden bg-[#f3eee6] sm:min-h-64 lg:min-h-80 dark:bg-muted">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              {post.tags[0] && (
                <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                  {post.tags[0]}
                </p>
              )}
              <h1 className="font-heading mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-primary-dark/15 pb-6 text-sm text-muted-foreground dark:border-primary-dark/30">
              <span className="font-medium text-foreground">{post.author}</span>
              <span aria-hidden>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden />
                {post.readingTime}
              </span>
            </div>

            {post.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-primary-dark/20 bg-[#f3eee6]/80 px-2.5 py-1 font-heading text-[10px] font-semibold tracking-[0.14em] text-primary-dark uppercase dark:border-primary-dark/40 dark:bg-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <BlogContent source={post.content} />
            </div>
          </div>
        </article>

        <nav
          className="mt-8 grid gap-4 border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:grid-cols-2 sm:p-5 dark:border-primary-dark/40 dark:bg-card"
          aria-label="Previous and next articles"
        >
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group flex flex-col gap-1 transition-colors hover:text-primary-dark"
            >
              <span className="inline-flex items-center gap-1.5 font-heading text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <span className="font-heading text-sm font-semibold tracking-tight sm:text-base">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-1 text-right transition-colors hover:text-primary-dark sm:items-end"
            >
              <span className="inline-flex items-center gap-1.5 font-heading text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Next
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="font-heading text-sm font-semibold tracking-tight sm:text-base">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>

        {related.length > 0 && (
          <section className="mt-12">
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
              Keep Reading
            </p>
            <h2 className="font-heading mt-1 text-2xl font-semibold tracking-tight">
              Related guides
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
