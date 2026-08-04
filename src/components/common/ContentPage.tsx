import type { ReactNode } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface ContentPageProps {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ContentPage({
  title,
  eyebrow,
  description,
  children,
  className,
}: ContentPageProps) {
  return (
    <div className={cn("w-full pb-16", className)}>
      <div className="border-b border-primary-dark/10 bg-[#fffcf8]">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8 lg:px-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {eyebrow && (
            <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
              eyebrow ? "mt-1" : "mt-0",
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10 lg:px-8">
        <div
          className={cn(
            "border-2 border-primary-dark/20 bg-[#fffcf8] p-5 sm:p-8",
            "[&_h2]:font-heading [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:first:mt-0",
            "[&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground sm:[&_p]:text-base",
            "[&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:text-sm [&_ul]:text-muted-foreground sm:[&_ul]:text-base",
            "[&_a]:font-medium [&_a]:text-primary-dark [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
