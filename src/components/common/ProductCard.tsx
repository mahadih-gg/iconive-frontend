"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
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
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist?.(product._id) ?? false;
  const [activeSwatch, setActiveSwatch] = useState(0);

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

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
          <span className="absolute top-2 left-2 z-10 bg-black px-2.5 py-1 font-heading text-[11px] font-medium italic tracking-wide text-white">
            OFF {discount}%
          </span>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="pointer-events-auto absolute top-2 right-2 z-20 size-5 md:size-7 rounded-none hover:bg-white border border-primary-dark/20"
        >
          <Heart
            className={cn(
              "size-3.5 md:size-4",
              inWishlist ? "fill-destructive text-destructive" : "text-foreground"
            )}
          />
        </Button>
      </div>

      {/* Details slide up over the image on hover — title stays visible, card height stays fixed */}
      <div className="pointer-events-none relative z-20 px-3 py-4 text-center">
        <div
          className="invisible flex flex-col items-center gap-2 max-sm:hidden"
          aria-hidden
        >
          <h3 className="font-heading line-clamp-2 text-sm font-medium tracking-tight">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-baseline justify-center gap-2">
            <span className="text-base font-semibold tracking-tight">
              {formatPrice(finalPrice)}
            </span>

            {discount > 0 && (
              <span className="font-heading text-sm italic line-through">
                {formatPrice(price)}
              </span>
            )}

          </div>
          <div className="mt-1 h-8" />
        </div>

        <div className="absolute inset-x-0 top-0 flex flex-col items-center gap-2 bg-white px-3 pt-4 pb-0 transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-10 max-sm:static max-sm:translate-y-0 max-sm:px-0 max-sm:pt-0">

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

          <Button
            type="button"
            size="sm"
            onClick={handleAddToCart}
            className="pointer-events-auto relative z-10 mt-1 h-9 w-full shrink-0 gap-1.5 text-[10px] font-semibold tracking-widest text-foreground uppercase shadow-none hover:bg-primary/50"
          >
            <ShoppingBag className="size-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
