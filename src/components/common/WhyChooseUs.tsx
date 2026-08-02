"use client";

import {
  ArrowRight,
  Heart,
  Leaf,
  Paintbrush,
  Recycle,
  Star,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: Recycle,
    title: "Easy to Re-Model",
    description:
      "In few minutes you can wear them to a party, for a lunch date, for cosplay and to anywhere!",
  },
  {
    icon: Paintbrush,
    title: "Apply Custom Colors",
    description:
      "Extraordinary color choice Ombre, Black, Blonde, Blue, Purple, Grey or Silver Hair Shades",
  },
  {
    icon: Heart,
    title: "We Love to Serve",
    description:
      "Our motto is to make you look like celebrity. Customer satisfaction is our ultimate goal.",
  },
  {
    icon: Leaf,
    title: "Natural Products",
    description:
      "100% Unprocessed Virgin Brazilian high quality Human Hair offer a natural looking style and soft feel.",
  },
];

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9/5", label: "Average Rating", showStar: true },
  { value: "100%", label: "Premium Hair" },
] as const;

const GALLERY_IMAGES = [
  {
    src: "/Image/ImagesPage/gents.webp",
    alt: "Model showcasing a natural gents hair system",
  },
  {
    src: "/Image/custom/bigpic.png",
    alt: "Woman with voluminous blonde hair by the sea",
  },
  {
    src: "/Image/ImagesPage/ladies.webp",
    alt: "Woman wearing a premium ladies wig style",
  },
  {
    src: "/Image/modalpic2.jpg",
    alt: "Woman with soft chestnut brown waves",
  },
] as const;

interface WhyChooseUsProps {
  className?: string;
  imageSrc?: string;
}

export function WhyChooseUs({
  className,
  imageSrc = "/Image/ImagesPage/why-choose-us.webp",
}: WhyChooseUsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldAnimate = Boolean(isInView && !prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      className={cn("overflow-hidden bg-[#fdf8f4]", className)}
    >
      {/* ── Top: absolute left image + contained right content ── */}
      <div className="relative lg:min-h-144 xl:min-h-160">
        {/* Mobile image */}
        <motion.div
          className={cn(
            "relative h-80 w-full overflow-hidden sm:h-96 lg:hidden",
            "mask-[linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]"
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={
            shouldAnimate || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.65, ease: EASE }}
        >
          <Image
            src={imageSrc}
            alt="Premium Iconive wig styled with soft platinum waves"
            fill
            sizes="100vw"
            className="object-cover object-left"
          />
        </motion.div>

        {/* Desktop: absolute, h-full / w-auto, right edge blends into bg */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden h-full lg:block"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -28 }}
          animate={
            shouldAnimate || prefersReducedMotion
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -28 }
          }
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div
            className={cn(
              "relative h-full w-auto",
              "mask-[linear-gradient(to_right,black_0%,black_62%,transparent_100%)]",
              "mask-size-[100%_100%] mask-no-repeat"
            )}
          >
            <Image
              src={imageSrc}
              alt="Premium Iconive wig styled with soft platinum waves"
              width={900}
              height={1200}
              sizes="45vw"
              className="h-full w-auto max-w-none"
            />
            {/* Soft cream wash on the right edge for a smoother blend */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-2/5 bg-linear-to-r from-transparent to-[#fdf8f4]"
              aria-hidden
            />
          </div>
        </motion.div>

        {/* Right content — keeps max-w-7xl alignment on the outer edge */}
        <div className="relative z-10 mx-auto flex items-center px-4 py-14 sm:px-6 lg:min-h-144 lg:py-20 lg:pl-[min(34vw,26rem)] lg:pr-[max(1.5rem,calc((100vw-80rem)/2+2rem))] xl:min-h-160 xl:pl-[min(36vw,30rem)]">
          <div className="grid w-full gap-10 md:grid-cols-2 md:items-center md:gap-8 xl:gap-10">
            {/* Copy */}
            <motion.div
              className="flex flex-col items-center md:items-start"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={
                shouldAnimate || prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            >
              <SectionHeader
                align="left"
                mobileAlign="center"
                labelLines="both"
                label="Why People Choose Us"
                heading="Go Ahead,"
                heading2="Try One!"
                isHeading2Br={true}
                paragraph="We are always willing to make our customers happy and are ready to support your most bold and creative ideas in hairstyle."
              />

              <div className="mt-7 flex w-full max-w-md flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-0 md:justify-start">
                {STATS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "flex flex-1 flex-col items-center px-2 md:items-start",
                      index > 0 && "sm:border-l sm:border-border sm:pl-4",
                      index < STATS.length - 1 && "sm:pr-4"
                    )}
                  >
                    <p className="font-heading flex items-center gap-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {stat.value}
                      {"showStar" in stat && stat.showStar ? (
                        <Star
                          className="size-3.5 fill-primary text-primary"
                          strokeWidth={0}
                          aria-hidden
                        />
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="cta" size="cta" className="mt-8" asChild>
                <Link href="/products">
                  Explore Our Collection
                  <span data-slot="button-arrow" aria-hidden>
                    <ArrowRight />
                  </span>
                </Link>
              </Button>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }}
              animate={
                shouldAnimate || prefersReducedMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 28 }
              }
              transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="rounded-2xl border border-[#e8dfd4] bg-[#fffcf8] p-6 text-left transition-transform duration-500 hover:-translate-y-0.5 sm:p-7"
                  >
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#f5ebe0]">
                      <Icon
                        className="size-5 text-primary-dark"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>
                    <h3 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom: slanted hair gallery ── */}
      <motion.div
        className="relative"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={
          shouldAnimate || prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
      >
        <div className="flex h-44 overflow-hidden sm:h-52 md:h-60 lg:h-72">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                "relative min-w-0 flex-1 overflow-hidden",
                index > 0 && "-ml-3 sm:-ml-4 md:-ml-5",
                index === 0
                  ? "[clip-path:polygon(0_0,calc(100%-1.1rem)_0,100%_100%,0_100%)] sm:[clip-path:polygon(0_0,calc(100%-1.4rem)_0,100%_100%,0_100%)]"
                  : "[clip-path:polygon(0_0,calc(100%-1.1rem)_0,100%_100%,1.1rem_100%)] sm:[clip-path:polygon(0_0,calc(100%-1.4rem)_0,100%_100%,1.4rem_100%)]"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 30vw, 20vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}

          {/* Gallery CTA panel */}
          <div
            className={cn(
              "relative z-10 flex min-w-0 flex-[1.15] flex-col items-center justify-center bg-black px-3 text-center sm:flex-[1.05] sm:px-5 md:px-8",
              "-ml-3 sm:-ml-4 md:-ml-5",
              "[clip-path:polygon(0_0,100%_0,100%_100%,1.1rem_100%)] sm:[clip-path:polygon(0_0,100%_0,100%_100%,1.4rem_100%)]"
            )}
          >
            <p className="font-heading text-sm tracking-wide text-white sm:text-base md:text-lg">
              Explore Our
            </p>
            <p className="font-heading mt-0.5 text-xl italic font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
              Hair Gallery
            </p>
            <Button variant="ctaLight" size="ctaSm" className="mt-4" asChild>
              <Link href="/products">
                View Gallery
                <span data-slot="button-arrow" aria-hidden>
                  <ArrowRight />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
