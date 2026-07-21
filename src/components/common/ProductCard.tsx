"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/hooks/useCurrency";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types/product.type";
import { cn } from "@/utils/cn";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist?.(product._id) ?? false;

  const image =
    product.photo ??
    product.image ??
    (Array.isArray(product.images) ? product.images[0] : undefined) ??
    "/Image/logo/logo.png";

  const price = Number(product.price ?? 0);
  const discount = Number(product.discount ?? 0);
  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className={cn("group relative flex flex-col overflow-hidden bg-white", className)}>
      <div className="relative aspect-square w-full overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={String(image)}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        {isAuthenticated && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-white/80"
            onClick={() =>
              inWishlist
                ? removeFromWishlist(product._id)
                : addToWishlist(product._id)
            }
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn("h-5 w-5", inWishlist && "fill-destructive text-destructive")}
            />
          </Button>
        )}
        {discount > 0 && (
          <span className="absolute left-2 top-2 bg-primary px-2 py-0.5 text-xs font-bold">
            -{discount}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 text-center">
        <Link
          href={`/products/${product._id}`}
          className="text-sm font-semibold uppercase text-foreground no-underline hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2">
          {discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
          <span className="font-bold">{formatPrice(finalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
