"use client";

import {
  ArrowRight,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  /** Optional hero video. When omitted, the poster image is shown. */
  videoSrc?: string;
  posterSrc?: string;
}

const TRUST_MARKERS = [
  {
    icon: Star,
    title: "4.9/5 Reviews",
    desc: "10,000+ Happy Customers",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Worldwide",
  },
  {
    icon: UserRound,
    title: "100% Human Hair",
    desc: "Premium Quality",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% Protected",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    desc: "Hassle Free",
  },
] as const;

function TrustMarker({
  icon: Icon,
  title,
  desc,
  className,
}: {
  icon: (typeof TRUST_MARKERS)[number]["icon"];
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Icon className="mt-0.5 size-5 shrink-0 text-white/90" strokeWidth={1.5} />
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-white uppercase sm:text-xs">
          {title}
        </p>
        <p className="mt-0.5 text-[11px] text-white/65 sm:text-xs">{desc}</p>
      </div>
    </div>
  );
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
      className="relative h-svh min-h-[36rem] overflow-hidden bg-[#1a1410]"
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
        <div className="flex flex-1 items-center px-5 pt-32 pb-36 sm:px-8 sm:pt-36 sm:pb-40 md:pt-40 lg:px-16 xl:px-24">
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
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 sm:text-sm"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center border border-white/80 px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-white/10 sm:text-sm"
              >
                Explore Styles
              </Link>
            </div>
          </div>
        </div>

        <p
          className="pointer-events-none absolute top-[42%] right-3 hidden -translate-y-1/2 text-[10px] tracking-[0.45em] text-primary/90 uppercase [writing-mode:vertical-rl] lg:right-6 lg:block xl:right-10"
          aria-hidden
        >
          Explore The Confidence
        </p>

        {/* Progressive blur + trust markers — pinned to hero bottom */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="relative pt-14 sm:pt-16">
            <ProgressiveBlur />
            {/* Mobile: scrolling marquee */}
            <Marquee
              pauseOnHover
              className="relative z-10 pb-5 [--duration:35s] [--gap:2rem] lg:hidden"
            >
              {TRUST_MARKERS.map(({ icon, title, desc }) => (
                <TrustMarker
                  key={title}
                  icon={icon}
                  title={title}
                  desc={desc}
                  className="min-w-max"
                />
              ))}
            </Marquee>

            {/* Desktop: static grid */}
            <div className="relative z-10 mx-auto hidden max-w-6xl grid-cols-5 gap-0 px-10 pb-10 lg:grid">
              {TRUST_MARKERS.map(({ icon, title, desc }, index) => (
                <TrustMarker
                  key={title}
                  icon={icon}
                  title={title}
                  desc={desc}
                  className={cn(
                    "justify-center",
                    index < TRUST_MARKERS.length - 1 && "border-r border-white/15"
                  )}
                />
              ))}
            </div>
            <div className="relative z-10 flex flex-col items-center gap-0.5 pb-3 text-white/70">
              <span className="text-[10px] tracking-[0.3em] uppercase">Scroll To Discover</span>
              <ChevronDown className="hero-scroll-chevron h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
