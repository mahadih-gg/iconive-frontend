"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.type";

import "swiper/css";

interface SpecialCollectionProps {
  products: Product[];
  isLoading?: boolean;
  className?: string;
  heading?: string;
  paragraph?: string;
  bannerSrc?: string;
  bannerHref?: string;
  bannerTitle?: string;
  bannerHighlight?: string;
  viewAllHref?: string;
}

export function SpecialCollection({
  products,
  isLoading = false,
  className,
  heading = "Featured Pieces",
  paragraph,
  bannerSrc = "/Image/ImagesPage/ladies.webp",
  bannerHref = "/offers",
  bannerTitle = "Special Collection of",
  bannerHighlight = "2026",
  viewAllHref = "/offers",
}: SpecialCollectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [canNavigate, setCanNavigate] = useState(false);

  function syncLockState(swiper: SwiperType) {
    setCanNavigate(!swiper.isLocked);
  }

  function slidePrev() {
    swiperRef.current?.slidePrev();
  }

  function slideNext() {
    swiperRef.current?.slideNext();
  }

  return (
    <section className={cn("bg-background px-4 py-14 sm:py-16", className)}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(240px,0.9fr)_minmax(0,2.1fr)] lg:gap-5 xl:grid-cols-[minmax(260px,0.85fr)_minmax(0,2.15fr)]">
        <Link
          href={bannerHref}
          className="group relative min-h-80 overflow-hidden lg:min-h-full"
        >
          <Image
            src={bannerSrc}
            alt={heading}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 30vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
            <p className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {bannerTitle}
            </p>
            <p className="font-heading mt-1 text-5xl font-semibold tracking-tight text-primary sm:text-6xl">
              {bannerHighlight}
            </p>
          </div>
        </Link>

        <div className="flex min-w-0 flex-col">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {heading}
              </h2>
              {paragraph ? (
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {paragraph}
                </p>
              ) : null}
            </div>

            {canNavigate ? (
              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-9 border-border-primary-dark bg-muted text-foreground hover:bg-foreground hover:text-white"
                  onClick={slidePrev}
                  iconMotion="left"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-9 border-border-primary-dark bg-muted text-foreground hover:bg-foreground hover:text-white"
                  onClick={slideNext}
                  iconMotion="right"
                  aria-label="Next products"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            ) : null}
          </div>

          {isLoading ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[72%] shrink-0 sm:w-[46%] lg:w-[calc((100%-2rem)/3)]"
                >
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="mx-auto mt-4 h-4 w-36" />
                  <Skeleton className="mx-auto mt-2 h-5 w-24" />
                  <Skeleton className="mx-auto mt-3 h-3 w-28" />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                syncLockState(swiper);
              }}
              onResize={syncLockState}
              onUpdate={syncLockState}
              onLock={syncLockState}
              onUnlock={syncLockState}
              slidesPerView={1.25}
              spaceBetween={16}
              watchOverflow
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 16 },
              }}
              className="w-full [&_.swiper-slide]:h-auto"
            >
              {products.map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {viewAllHref ? (
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button
                asChild
                variant="ctaOutline"
                size="ctaSm"
                className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
              >
                <Link href={viewAllHref}>View All</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
