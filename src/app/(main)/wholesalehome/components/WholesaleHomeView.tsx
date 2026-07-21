"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useWholesale } from "@/hooks/useWholesale";

export function WholesaleHomeView() {
  const { products, isLoading } = useWholesale();

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Image
          src="/Image/wholesale/wholesalebanner.webp"
          alt="Wholesale"
          width={1600}
          height={500}
          className="h-auto w-full"
          priority
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h1 className="mb-4 text-3xl font-bold">Wholesale Home</h1>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Explore bulk pricing and wholesale-exclusive styles.
        </p>
        <Button asChild className="mb-10">
          <Link href="/wholesale">Browse Wholesale Catalog</Link>
        </Button>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-44" />
              ))
            : products.slice(0, 8).map((p) => (
                <ProductCard key={p._id} product={p} className="w-40 md:w-48" />
              ))}
        </div>
      </div>
    </div>
  );
}
