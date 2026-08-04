"use client";

import {
  Heart,
  Info
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.type";
import {
  COLOR_OPTIONS,
  DENSITY_OPTIONS,
  getCategoryLabel,
  getDiscountedPrice,
  getGallery,
  LENGTH_OPTIONS,
  SIZE_OPTIONS,
} from "@/utils/product-options";

interface QuickProductViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function OptionButton({
  label,
  selected,
  onClick,
  className,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-10 border px-3 py-2 text-xs font-medium tracking-wide transition-colors",
        selected
          ? "border-primary text-primary-dark"
          : "border-border bg-background text-foreground hover:border-primary-dark",
        className
      )}
    >
      {label}
    </button>
  );
}

export function QuickProductView({
  product,
  open,
  onOpenChange,
}: QuickProductViewProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const gallery = useMemo(
    () => (product ? getGallery(product) : []),
    [product]
  );

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedLength, setSelectedLength] = useState(0);
  const [selectedDensity, setSelectedDensity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  useEffect(() => {
    if (!open || !product) return;
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedLength(0);
    setSelectedDensity(0);
    setSelectedSize(0);
  }, [open, product?._id]);

  if (!product) return null;

  const inWishlist = isInWishlist?.(product._id) ?? false;
  const price = Number(product.price ?? 0);
  const discount = Number(product.discount ?? 0);
  const finalPrice = getDiscountedPrice(product);
  const category = getCategoryLabel(product);
  const image = gallery[activeImage] ?? gallery[0] ?? "/Image/logo/logo.png";
  const description =
    typeof product.description === "string" && product.description.trim()
      ? product.description
      : "Premium virgin human hair crafted for a natural look, soft movement, and long-lasting density. Customize your shade, length, and fit below.";

  function handleWishlist() {
    if (!isAuthenticated) {
      toast.error("Please sign in to save favorites");
      onOpenChange(false);
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
      color: COLOR_OPTIONS[selectedColor]?.label,
      length: LENGTH_OPTIONS[selectedLength],
      density: DENSITY_OPTIONS[selectedDensity],
      size: SIZE_OPTIONS[selectedSize],
      addons: [
        {
          name: "Cap Size",
          value: SIZE_OPTIONS[selectedSize],
        },
      ],
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[90vh] gap-0 overflow-hidden rounded-none border-primary-dark/20 p-0 sm:max-w-4xl lg:max-w-5xl"
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Quick view for {product.name}. Choose options and add to cart.
        </DialogDescription>

        <div className="grid max-h-[90vh] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Media */}
          <div className="flex flex-col items-center gap-2 bg-[#f3eee6] p-3 md:items-stretch md:gap-3 md:p-5">
            <div className="relative w-full h-40 overflow-hidden bg-white sm:size-44 md:aspect-square md:size-auto md:w-full">
              <Image
                key={image}
                src={image}
                alt={product.name}
                fill
                className="object-contain md:object-cover"
                sizes="(max-width: 768px) 176px, 40vw"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-2 left-2 bg-primary px-2 py-0.5 font-heading text-[10px] font-semibold tracking-wide text-primary-foreground uppercase md:top-3 md:left-3 md:px-2.5 md:py-1 md:text-[11px]">
                  OFF {discount}%
                </span>
              )}
            </div>

            <div className="grid w-full grid-cols-4 gap-1.5 sm:w-44 md:w-full md:gap-2">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImage === i}
                  className={cn(
                    "relative aspect-square overflow-hidden border transition-colors",
                    activeImage === i
                      ? "border-primary"
                      : "border-transparent hover:border-primary-dark/40"
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <ScrollArea className="h-[min(50vh,480px)] md:h-[min(90vh,720px)]">
            <div className="flex flex-col gap-4 p-5 md:p-6 md:pr-12">
              <div className="flex items-start justify-between gap-3">
                <p className="font-heading text-[11px] font-semibold tracking-[0.18em] text-primary-dark uppercase">
                  {category}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground md:text-3xl">
                  {product.name}
                </h2>

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-primary-dark">
                    {formatPrice(finalPrice)}
                  </span>
                  {discount > 0 && (
                    <span className="font-heading text-base italic text-muted-foreground line-through">
                      {formatPrice(price)}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* Color */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Color Shade
                  </span>
                  <span className="text-sm text-primary-dark">
                    {COLOR_OPTIONS[selectedColor]?.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_OPTIONS.map((color, i) => (
                    <button
                      key={color.src}
                      type="button"
                      onClick={() => {
                        setSelectedColor(i);
                        const galleryIndex = gallery.indexOf(color.src);
                        if (galleryIndex >= 0) setActiveImage(galleryIndex);
                      }}
                      aria-label={color.label}
                      aria-pressed={selectedColor === i}
                      className={cn(
                        "relative size-9 overflow-hidden rounded-full border-2 transition-colors",
                        selectedColor === i
                          ? "border-primary"
                          : "border-border hover:border-primary-dark"
                      )}
                    >
                      <Image
                        src={color.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-foreground">
                  Hair Length
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {LENGTH_OPTIONS.map((length, i) => (
                    <OptionButton
                      key={length}
                      label={length}
                      selected={selectedLength === i}
                      onClick={() => setSelectedLength(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Density */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-foreground">
                  Cap Density
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {DENSITY_OPTIONS.map((density, i) => (
                    <OptionButton
                      key={density}
                      label={density}
                      selected={selectedDensity === i}
                      onClick={() => setSelectedDensity(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Cap Circumference Size
                  </span>
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-dark transition-colors hover:text-primary"
                    onClick={() => onOpenChange(false)}
                  >
                    <Info className="size-3.5" />
                    Cap Size Guide
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {SIZE_OPTIONS.map((size, i) => (
                    <OptionButton
                      key={size}
                      label={size}
                      selected={selectedSize === i}
                      onClick={() => setSelectedSize(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="cta"
                  size="cta"
                  onClick={handleAddToCart}
                  className="h-12 flex-1"
                >
                  Add to Cart
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleWishlist}
                  aria-label={
                    inWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className="size-12 shrink-0 rounded-none border-primary text-primary-foreground hover:text-primary-dark hover:bg-white"
                >
                  <Heart
                    className={cn(
                      "size-4! md:size-5!",
                      inWishlist && "fill-current"
                    )}
                  />
                </Button>
              </div>

              <Link
                href={`/products/${product._id}`}
                onClick={() => onOpenChange(false)}
                className="text-center text-xs font-semibold tracking-[0.16em] text-primary-dark uppercase transition-colors hover:text-primary"
              >
                View Full Details
              </Link>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
