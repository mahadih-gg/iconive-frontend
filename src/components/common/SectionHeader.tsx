"use client";

import { motion } from "motion/react";
import { type ReactNode, useRef } from "react";

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
  /** Breakpoint where `align` takes over from `mobileAlign`. Defaults to `md`. */
  alignFrom?: "md" | "lg" | "min-1440";
  /** Flanking lines around the label. Defaults from `align`. */
  labelLines?: "both" | "start" | "none";
  heading2ClassName?: string;
  className?: string;
  children?: ReactNode;
}


const EASE = [0.22, 1, 0.36, 1] as const;

const ALIGN_FROM = {
  md: {
    textLeft: "md:text-left",
    textCenter: "md:text-center",
    justifyStart: "md:justify-start",
    justifyCenter: "md:justify-center",
    mx0: "md:mx-0",
  },
  lg: {
    textLeft: "lg:text-left",
    textCenter: "lg:text-center",
    justifyStart: "lg:justify-start",
    justifyCenter: "lg:justify-center",
    mx0: "lg:mx-0",
  },
  "min-1440": {
    textLeft: "min-[1440px]:text-left",
    textCenter: "min-[1440px]:text-center",
    justifyStart: "min-[1440px]:justify-start",
    justifyCenter: "min-[1440px]:justify-center",
    mx0: "min-[1440px]:mx-0",
  },
} as const;

export function SectionHeader({
  label,
  heading,
  heading2,
  isHeading2Br = false,
  subheading,
  paragraph,
  align = "center",
  mobileAlign,
  alignFrom = "md",
  labelLines,
  heading2ClassName,
  className,
  children,
}: SectionHeaderProps) {
  const ref = useRef<HTMLElement>(null);

  const mobile = mobileAlign ?? align;
  const isDesktopLeft = align === "left";
  const isMobileLeft = mobile === "left";
  const lines = labelLines ?? (isDesktopLeft ? "both" : "both");
  const bp = ALIGN_FROM[alignFrom];

  return (
    <motion.header
      ref={ref}
      className={cn(
        isMobileLeft ? "text-left" : "text-center",
        isDesktopLeft ? bp.textLeft : bp.textCenter,
        className
      )}
    >
      {label ? (
        <motion.div
          className={cn(
            "mb-4 flex items-center gap-3",
            isMobileLeft ? "justify-start" : "justify-center",
            isDesktopLeft ? bp.justifyStart : bp.justifyCenter
          )}
        >
          {(lines === "both" || lines === "start") && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="h-px w-8 bg-primary-dark sm:w-10"
              aria-hidden
            />
          )}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="pt-1 leading-none font-heading text-[11px] font-semibold tracking-[0.28em] text-primary-dark uppercase sm:text-xs">
            {label}
          </motion.p>
          {lines === "both" && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="h-px w-8 bg-primary-dark sm:w-10" aria-hidden />
          )}
        </motion.div>
      ) : null}

      {heading || heading2 ? (
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
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
        </motion.h2>
      ) : null}

      {
        children ? <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {children}
        </motion.div>
          : null
      }

      {subheading ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
          className={cn(
            "mt-3 font-heading text-lg font-medium tracking-tight text-foreground sm:text-xl",
            !isMobileLeft && "mx-auto",
            isDesktopLeft && bp.mx0
          )}
        >
          {subheading}
        </motion.p>
      ) : null}

      {paragraph ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4, ease: EASE }}
          className={cn(
            "mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base",
            !isMobileLeft && "mx-auto",
            isDesktopLeft && bp.mx0
          )}
        >
          {paragraph}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
