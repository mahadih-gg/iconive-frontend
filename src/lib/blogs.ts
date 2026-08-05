import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { BlogFrontmatter, BlogPost } from "@/types/blog";

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

function parseBlogFile(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOGS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    content,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    author: frontmatter.author,
    cover: frontmatter.cover,
    tags: frontmatter.tags ?? [],
    featured: Boolean(frontmatter.featured),
    readingTime: stats.text,
  };
}

function sortByDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllBlogs(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  return fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseBlogFile)
    .sort(sortByDateDesc);
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseBlogFile(`${slug}.mdx`);
}

export function getFeaturedBlogs(): BlogPost[] {
  return getAllBlogs().filter((post) => post.featured);
}

export function getRelatedBlogs(slug: string, limit = 3): BlogPost[] {
  const current = getBlogBySlug(slug);
  const all = getAllBlogs().filter((post) => post.slug !== slug);

  if (!current) return all.slice(0, limit);

  const currentTags = new Set(current.tags.map((tag) => tag.toLowerCase()));
  const related = all.filter((post) =>
    post.tags.some((tag) => currentTags.has(tag.toLowerCase())),
  );

  if (related.length >= limit) return related.slice(0, limit);

  const relatedSlugs = new Set(related.map((post) => post.slug));
  const fallback = all.filter((post) => !relatedSlugs.has(post.slug));
  return [...related, ...fallback].slice(0, limit);
}

export function getBlogSlugs(): string[] {
  return getAllBlogs().map((post) => post.slug);
}

export function getAdjacentBlogs(slug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const all = getAllBlogs();
  const index = all.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    // Newest-first list: "previous" is older (higher index), "next" is newer (lower index)
    previous: all[index + 1] ?? null,
    next: all[index - 1] ?? null,
  };
}
