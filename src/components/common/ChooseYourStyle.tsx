import { Lock, RotateCcw, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import { SectionHeader } from "@/components/common/SectionHeader";
import { TrustMarker } from "@/components/common/TrustMarker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STYLE_CATEGORIES = [
  {
    key: "gents",
    eyebrow: "For Him",
    title: "Gents",
    description: "Be confident with any style you like to own from a large variety of styles.",
    href: "/products?category=6432a3f8bc1e9c4115b67db5&topbanner=1",
    image: "/Image/ImagesPage/gents.webp",
    cta: "Explore Gents",
    ctaVariant: "outline" as const,
    markers: [
      {
        icon: "/Image/ImagesPage/award-icon.svg",
        title: "Premium Quality",
        desc: "100% Human Hair",
      },
      {
        icon: "/Image/ImagesPage/natural-look.svg",
        title: "Natural Look",
        desc: "Undetectable Finish",
      },
      {
        icon: "/Image/ImagesPage/shield.svg",
        title: "Long Lasting",
        desc: "Durable & Stylish",
      },
    ],
  },
  {
    key: "ladies",
    eyebrow: "For Her",
    title: "Ladies",
    description: "Explore yourself, be the glamourous persona you always dreamed of.",
    href: "/products?category=6432eb5a9e5f9a8abde960e0&topbanner=2",
    image: "/Image/ImagesPage/ladies.webp",
    cta: "Explore Ladies",
    ctaVariant: "solid" as const,
    markers: [
      {
        icon: "/Image/ImagesPage/luxurious-hair.svg",
        title: "Luxurious Hair",
        desc: "Soft & Natural Feel",
      },
      {
        icon: "/Image/ImagesPage/dimond.svg",
        title: "Trending Styles",
        desc: "Stay Ahead Always",
      },
      {
        icon: "/Image/ImagesPage/love.svg",
        title: "Confidence Boost",
        desc: "Look & Feel Your Best",
      },
    ],
  },
] as const;

const SECTION_TRUST_MARKERS = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    desc: "On Orders Over $250",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    desc: "No Questions Asked",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    desc: "100% Protected",
  },
] as const;

export function ChooseYourStyle() {
  return (
    <section className="px-4 py-16 sm:py-20 bg-gradient-to-tr from-white to-[#f7f4ef]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          className="mb-10 sm:mb-12"
          label="Made For Every Look"
          heading="Choose Your Style"
          paragraph="Premium wigs, perfectly crafted for every you."
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {STYLE_CATEGORIES.map((category) => (
            <article
              key={category.key}
              className="group relative min-h-112 overflow-hidden rounded-2xl sm:min-h-128"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/15" />

              <div className="relative z-10 flex h-full min-h-112 flex-col p-6 pb-28 sm:min-h-128 sm:p-8 sm:pb-32">
                <div className="max-w-sm pt-2">
                  <p className="relative inline-block font-heading text-xs tracking-[0.22em] text-primary uppercase sm:text-sm">
                    {category.eyebrow}
                    <span className="absolute left-[calc(100%+8px)] top-1/3  h-px w-7 bg-primary" />
                  </p>

                  <h3 className="font-heading mt-4 md:mt-8 text-4xl font-medium tracking-[0.04em] text-white uppercase sm:text-5xl">
                    {category.title}
                  </h3>

                  <span className="mt-3 block h-px w-12 bg-primary" aria-hidden />
                  <p className="mt-4 md:mt-8 text-sm md:text-base leading-relaxed text-white/85 max-w-[250px]">
                    {category.description}
                  </p>

                  <Button
                    variant={category.ctaVariant === "solid" ? "cta" : "ctaOutline"}
                    size="ctaSm"
                    className="mt-4 md:mt-8"
                    asChild
                  >
                    <Link href={category.href}>
                      {category.cta}
                      <span data-slot="button-arrow" aria-hidden>
                        <BsArrowRight />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 w-full bg-black/10 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
                  {category.markers.map((marker, index) => (
                    <TrustMarker
                      key={marker.title}
                      icon={marker.icon}
                      title={marker.title}
                      desc={marker.desc}
                      className={cn(
                        index < category.markers.length - 1 &&
                        "sm:border-r sm:border-white/25 sm:pr-4",
                        index > 0 && "sm:pl-4"
                      )}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-6 border-t border-border/60 pt-8 sm:mt-12 sm:flex-row sm:items-center sm:gap-0 sm:pt-10">
          {SECTION_TRUST_MARKERS.map((marker, index) => (
            <TrustMarker
              key={marker.title}
              icon={marker.icon}
              title={marker.title}
              desc={marker.desc}
              variant="on-light"
              className={cn(
                "justify-center sm:flex-1",
                index < SECTION_TRUST_MARKERS.length - 1 &&
                "sm:border-r sm:border-border",
                index > 0 && "sm:pl-6",
                index < SECTION_TRUST_MARKERS.length - 1 && "sm:pr-6"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
