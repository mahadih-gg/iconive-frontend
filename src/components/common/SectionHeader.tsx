import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  heading?: string;
  heading2?: string;
  /** When true, `heading2` renders on a new line */
  isHeading2Br?: boolean;
  subheading?: string;
  paragraph?: string;
  /** Desktop / default alignment */
  align?: "center" | "left";
  /** Mobile alignment; defaults to `align` */
  mobileAlign?: "center" | "left";
  /** Flanking lines around the label. Defaults from `align`. */
  labelLines?: "both" | "start" | "none";
  heading2ClassName?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  label,
  heading,
  heading2,
  isHeading2Br = false,
  subheading,
  paragraph,
  align = "center",
  mobileAlign,
  labelLines,
  heading2ClassName,
  className,
  children,
}: SectionHeaderProps) {
  const mobile = mobileAlign ?? align;
  const isDesktopLeft = align === "left";
  const isMobileLeft = mobile === "left";
  const lines = labelLines ?? (isDesktopLeft ? "both" : "both");

  return (
    <header
      className={cn(
        isMobileLeft ? "text-left" : "text-center",
        isDesktopLeft ? "md:text-left" : "md:text-center",
        className
      )}
    >
      {label ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            isMobileLeft ? "justify-start" : "justify-center",
            isDesktopLeft ? "md:justify-start" : "md:justify-center"
          )}
        >
          {(lines === "both" || lines === "start") && (
            <span className="h-px w-8 bg-primary-dark sm:w-10" aria-hidden />
          )}
          <p className="pt-1 leading-none font-heading text-[11px] font-semibold tracking-[0.28em] text-primary-dark uppercase sm:text-xs">
            {label}
          </p>
          {lines === "both" && (
            <span className="h-px w-8 bg-primary-dark sm:w-10" aria-hidden />
          )}
        </div>
      ) : null}

      {heading || heading2 ? (
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {heading ? <span>{heading}</span> : null}
          {heading && heading2 && !isHeading2Br ? " " : null}
          {heading2 ? (
            <>
              {isHeading2Br ? <br /> : null}
              <span
                className={cn(
                  "text-noise text-primary-dark [--noise-fill:var(--primary-dark)]",
                  heading2ClassName
                )}
              >
                {heading2}
              </span>
            </>
          ) : null}
        </h2>
      ) : null}

      {children}

      {subheading ? (
        <p
          className={cn(
            "mt-3 font-heading text-lg font-medium tracking-tight text-foreground sm:text-xl",
            !isMobileLeft && "mx-auto",
            isDesktopLeft && "md:mx-0"
          )}
        >
          {subheading}
        </p>
      ) : null}

      {paragraph ? (
        <p
          className={cn(
            "mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base",
            !isMobileLeft && "mx-auto",
            isDesktopLeft && "md:mx-0"
          )}
        >
          {paragraph}
        </p>
      ) : null}
    </header>
  );
}
