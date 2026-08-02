"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  /** Optional hero video. When omitted, the poster image is shown. */
  videoSrc?: string;
  posterSrc?: string;
}

function ProgressiveBlur() {
  return (
    <div className="hero-progressive-blur pointer-events-none absolute inset-0" aria-hidden>
      <div className="hero-blur-layer" data-blur="1" />
      <div className="hero-blur-layer" data-blur="2" />
      <div className="hero-blur-layer" data-blur="4" />
      <div className="hero-blur-layer" data-blur="8" />
      <div className="hero-blur-layer" data-blur="16" />
      <div className="hero-blur-tint" />
    </div>
  );
}

export function HeroSection({
  videoSrc,
  posterSrc = "/Image/ImagesPage/girl.png",
}: HeroSectionProps) {
  return (
    <section
      id="home-hero"
      className="relative h-svh min-h-[36rem] overflow-hidden bg-black"
    >
      {/* Media plane — pass videoSrc later to switch image → video */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover object-[center_20%]"
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={posterSrc}
            alt="Premium human hair wigs by Iconive"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%]"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/25" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Clears absolute 3-layer glass navbar overlay */}
        <div className="flex flex-1 items-center px-5 pt-32 pb-24 sm:px-8 sm:pt-36 sm:pb-28 md:pt-40 lg:px-16 xl:px-24">
          <div className="hero-copy max-w-xl lg:max-w-2xl">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.35em] text-primary uppercase sm:text-xs">
              Premium Human Hair
            </p>
            <h1 className="font-heading text-[2rem] leading-[1.05] font-semibold tracking-[0.04em] text-white uppercase sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.75rem]">
              Discover Hair
              <br />
              That Feels Like You
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              Luxury wigs crafted with 100% human hair for a flawless, natural look.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
              <Button variant="cta" size="cta" iconMotion="right" asChild>
                <Link href="/products">
                  Shop Collection
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="ctaLight" size="cta" asChild>
                <Link href="/products">Explore Styles</Link>
              </Button>
            </div>
          </div>
        </div>

        <p
          className="pointer-events-none absolute top-[42%] right-3 hidden -translate-y-1/2 text-[10px] tracking-[0.45em] text-primary/90 uppercase [writing-mode:vertical-rl] lg:right-6 lg:block xl:right-10"
          aria-hidden
        >
          Explore The Confidence
        </p>

        <div className="absolute inset-x-0 bottom-0">
          <div className="relative pt-14 sm:pt-16">
            <ProgressiveBlur />
            <div className="relative z-10 flex flex-col items-center gap-0.5 pb-5 text-white/70">
              <span className="text-[10px] tracking-[0.3em] uppercase">Scroll To Discover</span>
              <ChevronDown className="hero-scroll-chevron h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
