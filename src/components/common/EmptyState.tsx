import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({ title, description, className, children }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 py-12 text-center", className)}>
      <p className="text-lg font-medium">{title}</p>
      {description ? <p className="max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {children}
    </div>
  );
}
