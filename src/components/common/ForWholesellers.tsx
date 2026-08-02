"use client";

import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  Package,
  Sparkles,
  Tag
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  { icon: Tag, label: "Discounted Prices" },
  { icon: BadgeCheck, label: "Premium Quality" },
  { icon: Package, label: "Bulk Order Support" },
  { icon: Headphones, label: "Dedicated Support" },
] as const;

/**
 * Decorative arc matching `ellipse(100% 100% at 100% 50%)`.
 * viewBox 0 0 1000 700 — slightly larger than the clip so the stroke sits outside.
 */
const ARC_PATH = "M 110 0 A 1030 730 0 0 0 110 700";

interface ForWholesellersProps {
  className?: string;
  imageSrc?: string;
}

export function ForWholesellers({
  className,
  imageSrc = "/Image/ImagesPage/WI.svg",
}: ForWholesellersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldAnimate = Boolean(isInView && !prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-linear-to-br from-[#f9f4ee] via-[#f7f4ef] to-[#f3ebe3]",
        className
      )}
    >
      {/* Soft botanical atmosphere */}
      <div
        className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(186,150,110,0.14)_0%,transparent_68%)] blur-2xl sm:size-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 left-0 h-56 w-48 opacity-[0.07] sm:h-72 sm:w-64"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 55% at 20% 30%, #8a7348 0%, transparent 70%), radial-gradient(ellipse 35% 50% at 55% 15%, #8a7348 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* ── Media: full-bleed to viewport right; fills entire right column ── */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[56%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-1/2 xl:w-[52%]">
        <svg
          className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full overflow-visible lg:block"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={ARC_PATH}
            fill="none"
            stroke="var(--primary-dark)"
            strokeWidth="1.5"
            strokeOpacity="0.55"
            vectorEffect="non-scaling-stroke"
            initial={
              prefersReducedMotion
                ? { pathLength: 1, opacity: 0.55 }
                : { pathLength: 0, opacity: 0 }
            }
            animate={
              shouldAnimate || prefersReducedMotion
                ? { pathLength: 1, opacity: 0.55 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
          />
        </svg>

        <motion.div
          className={cn(
            "absolute inset-0 overflow-hidden",
            /* Mobile: soft top curve; Desktop: fill full right panel, curved left edge only */
            "[clip-path:ellipse(120%_90%_at_50%_100%)] lg:[clip-path:ellipse(100%_100%_at_100%_50%)]"
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={
            shouldAnimate || prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 1.04 }
          }
          transition={{ duration: 1.05, ease: EASE }}
        >
          <Image
            src={imageSrc}
            alt="Premium wholesale wig collection"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          className="absolute inset-x-1/2 right-auto left-1/2 -translate-x-1/2 sm:inset-x-auto sm:left-auto sm:right-6 bottom-5 z-30 max-w-44 border border-primary/40 bg-foreground/85 px-3.5 py-3 backdrop-blur-sm flex flex-col items-center sm:items-start sm:max-w-48 sm:px-5 sm:py-4 sm:bottom-8 lg:bottom-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={
            shouldAnimate || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
        >
          <Sparkles className="mb-1.5 size-5 text-primary" strokeWidth={1.5} aria-hidden />
          <p className="text-[10px] md:text-xs tracking-[0.22em] text-primary/90 uppercase text-center sm:text-left">
            Trusted By
          </p>
          <p className="font-heading mt-0.5 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary text-center sm:text-left">
            500+
          </p>
          <p className="mt-0.5 text-[10px] md:text-xs tracking-[0.18em] text-primary/80 uppercase text-center sm:text-left">
            Businesses Worldwide
          </p>
        </motion.div>

      </div>

      {/* ── Content: stays inside max-w-7xl ── */}
      <div className="relative z-10 mx-auto min-h-[1000px] sm:min-h-[800px] max-w-7xl px-5 sm:px-8 lg:min-h-144 lg:px-12 xl:px-16">
        <div className="flex max-w-xl flex-col justify-center py-14 sm:py-16 lg:min-h-144 lg:max-w-md xl:max-w-lg">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={
              shouldAnimate || prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <SectionHeader
              align="left"
              label="Exclusive Wholesale"
              heading="For"
              heading2="Wholesellers"
              paragraph="Shop premium wigs in bulk at exclusive wholesale prices. Perfect for resellers and businesses looking to grow."
            >
            </SectionHeader>
          </motion.div>

          <motion.ul
            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-x-3"
            initial="hidden"
            animate={shouldAnimate || prefersReducedMotion ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.08,
                  delayChildren: prefersReducedMotion ? 0 : 0.32,
                },
              },
            }}
          >
            {FEATURES.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                className="flex flex-col items-start gap-2"
                variants={{
                  hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: EASE },
                  },
                }}
              >
                <Icon className="size-5 text-primary-dark" strokeWidth={1.5} aria-hidden />
                <span className="max-w-30 text-[10px] font-semibold tracking-[0.14em] text-foreground/80 uppercase sm:text-[11px]">
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-9"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={
              shouldAnimate || prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
          >
            <Button variant="cta" size="ctaSm" iconMotion="right" asChild>
              <Link href="/wholesale">
                View Wholesale Shop
                <span data-slot="button-arrow" aria-hidden>
                  <ArrowRight />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

