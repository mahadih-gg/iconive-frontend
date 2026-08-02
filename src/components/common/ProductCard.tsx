"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types/product.type";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

function getProductMeta(product: Product) {
  const sold = Number(product.sold ?? 0);
  const rating = Number(product.rating ?? 4.7 + Math.min(sold, 50) / 250);
  const reviews = Number(product.reviews ?? Math.max(sold * 3, 48));
  return {
    rating: Math.min(5, Math.round(rating * 10) / 10),
    reviews,
  };
}

export function ProductCard({ product, className }: ProductCardProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
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
  const { rating, reviews } = getProductMeta(product);

  function handleWishlist() {
    if (!isAuthenticated) {
      toast.error("Please sign in to save favorites");
      router.push("/login");
      return;
    }
    if (inWishlist) removeFromWishlist(product._id);
    else addToWishlist(product._id);
  }

  function handleAddToCart() {
    addToCart({
      product: product._id,
      name: product.name,
      price: finalPrice,
      amount: 1,
      image: String(image),
    });
  }

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_16px_rgba(23,23,23,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(23,23,23,0.1)]",
        className
      )}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#f3eee6]">
        <Link href={`/products/${product._id}`} className="absolute inset-0">
          <Image
            src={String(image)}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>

        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-primary px-2 py-0.5 text-[11px] font-bold tracking-wide text-primary-foreground">
            -{discount}%
          </span>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-10 size-9 rounded-full bg-white shadow-sm hover:bg-white"
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "size-4",
              inWishlist ? "fill-destructive text-destructive" : "text-foreground"
            )}
          />
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
            Premium Quality
          </p>
          <Link
            href={`/products/${product._id}`}
            className="font-heading line-clamp-2 text-[15px] font-semibold tracking-tight text-foreground no-underline transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3",
                  i < Math.round(rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {rating.toFixed(1)}
            <span className="ml-0.5">({reviews})</span>
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-1">
          <div className="flex min-w-0 flex-col">
            {discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            )}
            <span className="text-base font-bold tracking-tight text-foreground">
              {formatPrice(finalPrice)}
            </span>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddToCart}
            className="h-9 gap-1.5 bg-primary/35 px-2.5 text-[10px] font-semibold tracking-[0.1em] text-foreground uppercase shadow-none hover:bg-primary/50"
          >
            <ShoppingBag className="size-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
