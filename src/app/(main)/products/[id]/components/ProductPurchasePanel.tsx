"use client";

import {
  Clock,
  Heart,
  Info,
  Minus,
  Plus,
  ShoppingCart
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RatingStars } from "@/components/common/RatingStars";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/lib/utils";
import type { CartAddon } from "@/types/cart.type";
import type { Product } from "@/types/product.type";
import {
  COLOR_OPTIONS,
  DENSITY_OPTIONS,
  getCategoryLabel,
  LENGTH_OPTIONS,
  SIZE_OPTIONS,
} from "@/utils/product-options";

interface ProductPurchasePanelProps {
  product: Product;
  gallery: string[];
  onActiveImageChange: (index: number) => void;
  selectedColor: number;
  onColorChange: (index: number) => void;
  selectedLength: number;
  onLengthChange: (index: number) => void;
  selectedDensity: number;
  onDensityChange: (index: number) => void;
  selectedSize: number;
  onSizeChange: (index: number) => void;
  selectedAddOns: CartAddon[];
  onAddOnToggle: (addon: CartAddon) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  unitPrice: number;
  totalPrice: number;
  reviewAverage: number;
  reviewCount: number;
  inCart: boolean;
  inWishlist: boolean;
  isAuthenticated: boolean;
  onCartToggle: () => void;
  onWishlistToggle: () => void;
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
        className,
      )}
    >
      {label}
    </button>
  );
}

export function ProductPurchasePanel({
  product,
  gallery,
  onActiveImageChange,
  selectedColor,
  onColorChange,
  selectedLength,
  onLengthChange,
  selectedDensity,
  onDensityChange,
  selectedSize,
  onSizeChange,
  selectedAddOns,
  onAddOnToggle,
  quantity,
  onQuantityChange,
  unitPrice,
  totalPrice,
  reviewAverage,
  reviewCount,
  inCart,
  inWishlist,
  isAuthenticated,
  onCartToggle,
  onWishlistToggle,
}: ProductPurchasePanelProps) {
  const { formatPrice } = useCurrency();
  const price = Number(product.price ?? 0);
  const discount = Number(product.discount ?? 0);
  const category = getCategoryLabel(product);
  const addOns = (product.addons as CartAddon[] | undefined) ?? [];
  const description =
    typeof product.description === "string" && product.description.trim()
      ? product.description
      : "Premium virgin human hair crafted for a natural look, soft movement, and long-lasting density. Customize your shade, length, and fit below.";

  return (
    <div className="flex flex-col gap-5 text-start md:gap-6">
      <div className="flex flex-col gap-3">
        <p className="font-heading text-[11px] font-semibold tracking-[0.18em] text-primary-dark uppercase">
          {category}
        </p>
        <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {product.name}
        </h1>

        <a
          href="#reviews"
          className="inline-flex w-fit items-center gap-2 transition-opacity hover:opacity-80"
        >
          <RatingStars rating={reviewAverage} size="sm" />
          <span className="text-sm text-muted-foreground">
            {reviewAverage.toFixed(1)} ({reviewCount} reviews)
          </span>
        </a>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight text-primary-dark">
            {formatPrice(unitPrice)}
          </span>
          {discount > 0 ? (
            <>
              <span className="font-heading text-base italic text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
              <span className="font-heading bg-primary/15 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-primary-dark uppercase">
                Save {discount}%
              </span>
            </>
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Color */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground">Color Shade</span>
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
                onColorChange(i);
                const galleryIndex = gallery.indexOf(color.src);
                if (galleryIndex >= 0) onActiveImageChange(galleryIndex);
              }}
              aria-label={color.label}
              aria-pressed={selectedColor === i}
              className={cn(
                "relative size-9 overflow-hidden rounded-full border-2 transition-colors",
                selectedColor === i
                  ? "border-primary"
                  : "border-border hover:border-primary-dark",
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
        <span className="text-sm font-medium text-foreground">Hair Length</span>
        <div className="grid grid-cols-4 gap-2">
          {LENGTH_OPTIONS.map((length, i) => (
            <OptionButton
              key={length}
              label={length}
              selected={selectedLength === i}
              onClick={() => onLengthChange(i)}
            />
          ))}
        </div>
      </div>

      {/* Density */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-foreground">Cap Density</span>
        <div className="grid grid-cols-3 gap-2">
          {DENSITY_OPTIONS.map((density, i) => (
            <OptionButton
              key={density}
              label={density}
              selected={selectedDensity === i}
              onClick={() => onDensityChange(i)}
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
              onClick={() => onSizeChange(i)}
            />
          ))}
        </div>
      </div>

      {/* API addons / types */}
      {addOns.length > 0 ? (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-foreground">
            Options / Types
          </span>
          <div className="flex flex-col gap-2">
            {addOns.map((addon) => {
              const selected = selectedAddOns.some((a) => a.name === addon.name);
              return (
                <button
                  key={`${addon.name}-${addon.value}`}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onAddOnToggle(addon)}
                  className={cn(
                    "w-full border px-3 py-2.5 text-left text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary/10 text-primary-dark"
                      : "border-border bg-background hover:border-primary-dark",
                  )}
                >
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-muted-foreground">: {addon.value}</span>
                  {addon.price ? (
                    <span className="ml-1 text-primary-dark">
                      (+{formatPrice(Number(addon.price))})
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <p className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1.5 size-4 shrink-0" />
          Processing Time:
          <span className="pl-2 font-semibold text-foreground">
            15–20 business days
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Processing time does not include delivery time
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 rounded-none"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-10 text-center text-base font-semibold tabular-nums">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 rounded-none"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </Button>
        </div>
        <p className="text-lg font-semibold text-foreground">
          Total:{" "}
          <span className="text-primary-dark">{formatPrice(totalPrice)}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="cta"
          size="cta"
          onClick={onCartToggle}
          className="h-12 flex-1"
        >
          <ShoppingCart className="size-4" />
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
        {isAuthenticated ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onWishlistToggle}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="size-12 shrink-0 rounded-none border-primary text-primary-dark hover:bg-primary/10"
          >
            <Heart
              className={cn(
                "size-5",
                inWishlist && "fill-destructive text-destructive",
              )}
            />
          </Button>
        ) : null}
      </div>

      <Accordion type="single" collapsible className="border-t border-border">
        <AccordionItem value="description">
          <AccordionTrigger className="font-heading text-sm font-semibold tracking-wide uppercase">
            Description
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {description}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="specifications">
          <AccordionTrigger className="font-heading text-sm font-semibold tracking-wide uppercase">
            Specifications
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Color:</span>{" "}
                {COLOR_OPTIONS[selectedColor]?.label}
              </li>
              <li>
                <span className="font-medium text-foreground">Length:</span>{" "}
                {LENGTH_OPTIONS[selectedLength]}
              </li>
              <li>
                <span className="font-medium text-foreground">Density:</span>{" "}
                {DENSITY_OPTIONS[selectedDensity]}
              </li>
              <li>
                <span className="font-medium text-foreground">Cap Size:</span>{" "}
                {SIZE_OPTIONS[selectedSize]}
              </li>
              {selectedAddOns.map((addon) => (
                <li key={addon.name}>
                  <span className="font-medium text-foreground">
                    {addon.name}:
                  </span>{" "}
                  {addon.value}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="font-heading text-sm font-semibold tracking-wide uppercase">
            Shipping & Returns
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Processing takes 15–20 business days (custom-made). Delivery time
            varies by destination. Easy returns within our return window for
            unused items in original packaging. Contact support for assistance.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger className="font-heading text-sm font-semibold tracking-wide uppercase">
            Care Instructions
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Wash gently with sulfate-free shampoo in cool water. Air dry on a
            wig stand. Avoid excessive heat. Store away from direct sunlight.
            Use a wide-tooth comb from ends upward.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
