"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCanScrollX } from "@/hooks/useCanScrollX";
import type { Product } from "@/types/product.type";

interface TrendingProps {
  products: Product[];
  isLoading?: boolean;
}

export function Trending({ products, isLoading = false }: TrendingProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const canScroll = useCanScrollX(
    scrollerRef,
    isLoading ? "loading" : products.length
  );

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-product-card]");
    const amount = (card?.offsetWidth ?? 280) + 20;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className="bg-background px-4 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          className="relative mb-10 sm:mb-12 sm:px-14"
          label="Just In"
          heading="Trending"
          paragraph="Styles everyone is loving right now."
        >
          {canScroll ? (
            <div className="absolute top-1/2 right-0 hidden -translate-y-1/2 items-center gap-1.5 sm:flex">
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
          ) : null}
        </SectionHeader>

        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 scrollbar-none"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-60 shrink-0 snap-start sm:w-65 lg:w-70"
              >
                <Skeleton className="aspect-4/5 w-full rounded-xl" />
                <Skeleton className="mt-4 h-3 w-24" />
                <Skeleton className="mt-2 h-5 w-40" />
                <Skeleton className="mt-3 h-4 w-28" />
                <Skeleton className="mt-4 h-9 w-full" />
              </div>
            ))
            : products.map((product) => (
              <div
                key={product._id}
                data-product-card
                className="w-60 shrink-0 snap-start sm:w-65 lg:w-70"
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>

        {canScroll ? (
          <div className="mt-6 flex items-center justify-center gap-1.5 sm:hidden">
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
        ) : null}
      </div>
    </section>
  );
}
