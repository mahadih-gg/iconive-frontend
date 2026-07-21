"use client";

import { ProductCard } from "@/components/common/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";

export function OffersView() {
  const { offers, stock, isLoading } = useFeaturedProducts();

  return (
    <div className="w-full">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-6 text-center text-2xl font-bold">Stock Products</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-44" />
              ))
            : stock.map((p) => (
                <ProductCard key={p._id} product={p} className="w-40 md:w-48" />
              ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-6 text-center text-2xl font-bold">Special Offers</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-44" />
              ))
            : offers.map((p) => (
                <ProductCard key={p._id} product={p} className="w-40 md:w-48" />
              ))}
          {!isLoading && offers.length === 0 && (
            <p className="text-muted-foreground">No offers available right now</p>
          )}
        </div>
      </section>
    </div>
  );
}
