import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ContentPageProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ContentPage({ title, children, className }: ContentPageProps) {
  return (
    <div className={cn("mx-auto max-w-4xl px-4 py-10 text-start", className)}>
      <h1 className="mb-6 border-b pb-4 text-xl font-bold text-muted-foreground">
        {title}
      </h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
