export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  cover: string;
  tags: string[];
  featured: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

/** Card/list payload without MDX body (safe to pass into client components). */
export type BlogPostMeta = Omit<BlogPost, "content">;
