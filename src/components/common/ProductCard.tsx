"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { QuickProductView } from "@/components/common/QuickProductView";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/hooks/useCurrency";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.type";

const COLOR_SWATCHES = [
  "/Image/Black/1jetblack.webp",
  "/Image/Brown/2 DARKEST BROWN.webp",
  "/Image/Blonde/613 PLATINUM BLONDE.webp",
  "/Image/Brown/4 medium brown.webp",
  "/Image/Blonde/22 BLONDE.webp",
  "/Image/Black/1C cool black.webp",
] as const;

interface ProductCardProps {
  product: Product;
  className?: string;
}

function getVariants(productId: string, productImage: string) {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash + productId.charCodeAt(i) * (i + 1)) % COLOR_SWATCHES.length;
  }

  const extras = [
    COLOR_SWATCHES[hash],
    COLOR_SWATCHES[(hash + 2) % COLOR_SWATCHES.length],
    COLOR_SWATCHES[(hash + 4) % COLOR_SWATCHES.length],
  ].filter((src) => src !== productImage);

  return [productImage, ...extras].slice(0, 3);
}

export function ProductCard({ product, className }: ProductCardProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist?.(product._id) ?? false;
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const productImage = String(
    product.photo ??
    product.image ??
    (Array.isArray(product.images) ? product.images[0] : undefined) ??
    "/Image/logo/logo.png"
  );
  const variants = getVariants(product._id, productImage);
  const image = variants[activeSwatch] ?? productImage;

  const price = Number(product.price ?? 0);
  const discount = Number(product.discount ?? 0);
  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please sign in to save favorites");
      router.push("/login");
      return;
    }
    if (inWishlist) removeFromWishlist(product._id);
    else addToWishlist(product._id);
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border border-primary-dark/20 bg-white transition-colors duration-300 hover:border-primary-dark",
        className
      )}
    >
      <Link
        href={`/products/${product._id}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${product.name}`}
      />

      <div className="pointer-events-none relative aspect-square w-full overflow-hidden bg-[#f3eee6]">
        <Image
          key={image}
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {discount > 0 && (
          <span className="absolute top-2 left-2 z-10 bg-black px-2.5 py-1 leading-none font-heading text-[11px] font-medium italic tracking-wide text-white">
            OFF {discount}%
          </span>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="pointer-events-auto absolute top-2 right-2 z-20 size-5 rounded-none border border-primary-dark/20 hover:bg-white md:size-7"
        >
          <Heart
            className={cn(
              "size-3.5 md:size-4",
              inWishlist ? "fill-destructive text-destructive" : "text-foreground"
            )}
          />
        </Button>

        <Button
          type="button"
          variant="ctaOutline2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickViewOpen(true);
          }}
          className="pointer-events-auto absolute bottom-3 left-1/2 z-20 w-[calc(100%-1.5rem)] max-w-40 -translate-x-1/2 translate-y-2 uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100"
        >
          Quick View
        </Button>
      </div>

      <div className="relative z-20 flex flex-col items-center gap-2 px-3 py-4 text-center">
        <h3 className="font-heading line-clamp-2 text-sm font-medium tracking-tight text-foreground transition-colors group-hover:text-primary-dark">
          {product.name}
        </h3>

        <div className="flex flex-wrap items-baseline justify-center gap-2">
          <span className="text-base font-semibold tracking-tight text-primary-dark">
            {formatPrice(finalPrice)}
          </span>
          {discount > 0 && (
            <span className="font-heading text-sm italic text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-center gap-2">
          {variants.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveSwatch(i);
              }}
              aria-label={`Color option ${i + 1}`}
              aria-pressed={activeSwatch === i}
              className={cn(
                "pointer-events-auto relative size-8 cursor-pointer overflow-hidden rounded-full border transition-colors",
                activeSwatch === i
                  ? "border-primary-dark"
                  : "border-border hover:border-primary-dark"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="32px"
              />
            </button>
          ))}
        </div>
      </div>

      <QuickProductView
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </article>
  );
}
