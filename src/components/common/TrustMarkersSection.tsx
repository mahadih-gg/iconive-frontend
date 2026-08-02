"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

const TRUST_MARKERS = [
  {
    lottieSrc: "/lottie/delivery-truck.lottie",
    title: "Free Worldwide Shipping",
    desc: "On Orders Over $250",
    size: "size-40 sm:size-52",
  },
  {
    lottieSrc: "/lottie/reload.lottie",
    title: "30-Day Returns",
    desc: "No Questions Asked",
    size: "size-16 sm:size-20",
  },
  {
    lottieSrc: "/lottie/lock.lottie",
    title: "Secure Payment",
    desc: "100% Protected",
    size: "size-32 sm:size-40",
  },
] as const;

export function TrustMarkersSection() {
  return (
    <section className="relative overflow-hidden border-y border-primary/15 bg-linear-to-b from-[#faf7f2] via-[#f7f4ef] to-[#f3eee6] px-4 py-14 sm:py-16">

      <div className="relative mx-auto grid max-w-7xl gap-10 sm:grid-cols-3 sm:gap-0">
        {TRUST_MARKERS.map((marker, index) => (
          <article
            key={marker.title}
            className={cn(
              "group relative flex flex-col items-center px-4 text-center sm:px-8",
              index < TRUST_MARKERS.length - 1 &&
              "sm:border-r sm:border-primary/15",
            )}
          >
            <div className="relative mb-5 flex size-24 items-center justify-center sm:mb-6 sm:size-28">
              <div
                className="absolute inset-0 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-110"
                aria-hidden
              />
              <div
                className="absolute inset-2 rounded-full bg-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.8)] ring-1 ring-primary/10 transition-shadow duration-500 group-hover:shadow-[0_12px_30px_-12px_rgb(155_109_62/0.35)]"
                aria-hidden
              />
              <div
                className={cn("relative lottie-primary", marker.size)}
                aria-hidden
              >
                <DotLottieReact
                  src={marker.lottieSrc}
                  loop
                  autoplay
                  className="h-full w-full"
                />
              </div>
            </div>

            <h3 className="font-heading text-base md:text-lg font-semibold tracking-[0.16em] text-primary-dark uppercase">
              {marker.title}
            </h3>
            <span
              className="mt-2.5 block h-px w-8 bg-primary-dark/50 transition-all duration-500 group-hover:w-12 group-hover:bg-primary"
              aria-hidden
            />
            <p className="mt-2.5 text-sm text-muted-foreground">
              {marker.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
