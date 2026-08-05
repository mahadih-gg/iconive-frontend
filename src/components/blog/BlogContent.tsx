import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

interface BlogContentProps {
  source: string;
}

function MdxImage({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) return null;

  return (
    <span className="relative my-8 block aspect-video w-full overflow-hidden border border-primary-dark/15 bg-[#f3eee6] dark:border-primary-dark/30 dark:bg-muted">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(max-width: 768px) 100vw, 720px"
        className="object-cover"
      />
    </span>
  );
}

const components: MDXComponents = {
  img: MdxImage,
  Image: MdxImage,
  h2: ({ children }) => (
    <h2 className="font-heading mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </ol>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary-dark underline-offset-4 hover:underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-primary pl-4 text-sm italic text-muted-foreground sm:text-base">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto border border-primary-dark/15 dark:border-primary-dark/30">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-primary-dark/15 bg-[#f3eee6] px-3 py-2 font-heading font-semibold text-foreground dark:border-primary-dark/30 dark:bg-muted">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-primary-dark/10 px-3 py-2 text-muted-foreground dark:border-primary-dark/20">
      {children}
    </td>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto border border-primary-dark/15 bg-[#1a1714] p-4 text-sm dark:border-primary-dark/40">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded-sm bg-[#f3eee6] px-1.5 py-0.5 font-mono text-[0.9em] text-foreground dark:bg-muted">
        {children}
      </code>
    );
  },
};

export async function BlogContent({ source }: BlogContentProps) {
  return (
    <div className="blog-prose max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
