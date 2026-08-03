"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.type";

import "swiper/css";

interface ProductCarouselSectionProps {
  products: Product[];
  isLoading?: boolean;
  label: string;
  heading: string;
  paragraph?: string;
  viewAllHref?: string;
  className?: string;
}

function NavButtons({
  onPrev,
  onNext,
  className,
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={cn("items-center gap-1.5", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-9 border-border-primary-dark bg-muted text-foreground hover:bg-foreground hover:text-white"
        onClick={onPrev}
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
        onClick={onNext}
        iconMotion="right"
        aria-label="Next products"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

export function ProductCarouselSection({
  products,
  isLoading = false,
  label,
  heading,
  paragraph,
  viewAllHref = "/products",
  className,
}: ProductCarouselSectionProps) {
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
    <section className={cn("bg-background px-4 py-8 sm:py-10", className)}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          className="relative mb-10 sm:mb-12 sm:px-14"
          label={label}
          heading={heading}
          paragraph={paragraph}
        >
          {canNavigate ? (
            <NavButtons
              onPrev={slidePrev}
              onNext={slideNext}
              className="absolute top-1/2 right-0 hidden -translate-y-1/2 sm:flex"
            />
          ) : null}
        </SectionHeader>

        {isLoading ? (
          <div className="flex gap-5 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[min(100%,15rem)] shrink-0 sm:w-65 lg:w-70"
              >
                <Skeleton className="aspect-4/5 w-full rounded-xl" />
                <Skeleton className="mt-4 h-3 w-24" />
                <Skeleton className="mt-2 h-5 w-40" />
                <Skeleton className="mt-3 h-4 w-28" />
                <Skeleton className="mt-4 h-9 w-full" />
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
            slidesPerView={1.35}
            spaceBetween={20}
            watchOverflow
            breakpoints={{
              480: { slidesPerView: 1.7, spaceBetween: 20 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="[&_.swiper-slide]:h-auto"
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="mt-8 flex flex-col items-center gap-4">
          {canNavigate ? (
            <NavButtons
              onPrev={slidePrev}
              onNext={slideNext}
              className="flex sm:hidden"
            />
          ) : null}

          {viewAllHref ? (
            <Button
              asChild
              variant="ctaOutline"
              size="ctaSm"
              className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
            >
              <Link href={viewAllHref}>View All</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
