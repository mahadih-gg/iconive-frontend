"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.type";

interface SpecialCollectionProps {
  products: Product[];
  isLoading?: boolean;
  className?: string;
  bannerSrc?: string;
  year?: string;
}

export function SpecialCollection({
  products,
  isLoading = false,
  className,
  bannerSrc = "/Image/ImagesPage/ladies.webp",
  year = "2026",
}: SpecialCollectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-collection-card]");
    const amount = (card?.offsetWidth ?? 240) + 16;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className={cn("bg-background px-4 py-14 sm:py-16", className)}>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(240px,0.9fr)_minmax(0,2.1fr)] lg:gap-5 xl:grid-cols-[minmax(260px,0.85fr)_minmax(0,2.15fr)]">
        {/* Promo banner */}
        <Link
          href="/offers"
          className="group relative min-h-80 overflow-hidden lg:min-h-full"
        >
          <Image
            src={bannerSrc}
            alt="Special collection"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 30vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
            <p className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Special Collection of
            </p>
            <p className="font-heading mt-1 text-5xl font-semibold tracking-tight text-primary sm:text-6xl">
              {year}
            </p>
          </div>
        </Link>

        {/* Product slider */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Featured Pieces
            </h2>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 border-border-primary-dark bg-muted text-foreground hover:bg-foreground hover:text-white"
                onClick={() => scrollByCard(-1)}
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
                onClick={() => scrollByCard(1)}
                iconMotion="right"
                aria-label="Next products"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1 scrollbar-none"
          >
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[72%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2rem)/3)]"
                >
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="mx-auto mt-4 h-4 w-36" />
                  <Skeleton className="mx-auto mt-2 h-5 w-24" />
                  <Skeleton className="mx-auto mt-3 h-3 w-28" />
                  <div className="mt-3 flex justify-center gap-2">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                  </div>
                </div>
              ))
              : products.map((product) => (
                <div
                  key={product._id}
                  data-collection-card
                  className="w-[72%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2rem)/3)]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
