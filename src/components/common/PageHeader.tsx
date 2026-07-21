import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <header className={cn("mb-6 space-y-1", className)}>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      {children}
    </header>
  );
}
