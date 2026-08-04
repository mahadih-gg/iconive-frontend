"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWishlist } from "@/hooks/useWishlist";

import { ProfileShell } from "./ProfileShell";

export function WishlistView() {
  const { products, isLoading, removeFromWishlist } = useWishlist();

  return (
    <ProfileShell title="Wishlist">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full rounded-none" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center bg-primary/15 text-primary-dark">
            <Heart className="size-7" />
          </div>
          <p className="font-heading mt-5 text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Wishlist
          </p>
          <h2 className="font-heading mt-2 text-2xl font-semibold">
            Your wishlist is empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Save wigs you love and come back when you&apos;re ready to shop.
          </p>
          <Button asChild variant="cta" size="ctaSm" className="mt-6">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product._id} className="relative">
              <ProductCard product={product} className="w-full" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full rounded-none border-primary-dark/30 text-xs font-semibold tracking-wide uppercase"
                onClick={() => removeFromWishlist(product._id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </ProfileShell>
  );
}
