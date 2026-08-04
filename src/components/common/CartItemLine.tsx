"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types/cart.type";
import {
  getCartLineKey,
  getCartVariantRows,
} from "@/utils/cart-line";
import { COLOR_OPTIONS } from "@/utils/product-options";

interface CartItemLineProps {
  item: CartItem;
  className?: string;
}

function getColorSwatch(colorLabel?: string) {
  if (!colorLabel) return undefined;
  return COLOR_OPTIONS.find((option) => option.label === colorLabel)?.src;
}

export function CartItemLine({ item, className }: CartItemLineProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();
  const lineKey = getCartLineKey(item);
  const variants = getCartVariantRows(item);

  return (
    <article
      className={cn(
        "flex gap-3 border-b border-primary-dark/15 py-4 text-start last:border-b-0",
        className,
      )}
    >
      <Link
        href={`/products/${item.product}`}
        className="relative size-20 shrink-0 overflow-hidden bg-[#f3eee6] sm:size-24"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted text-[10px] text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.product}`}
            className="font-heading text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary-dark"
          >
            {item.name}
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => removeFromCart(lineKey)}
            aria-label="Remove item"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>

        {variants.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {variants.map((row) => {
              const swatch =
                row.label === "Color" ? getColorSwatch(row.value) : undefined;

              return (
                <li
                  key={`${row.label}-${row.value}`}
                  className="inline-flex max-w-full items-center gap-1.5 border border-primary-dark/20 bg-[#f3eee6] px-2 py-1 text-[11px] leading-none"
                >
                  {swatch ? (
                    <span className="relative size-3.5 shrink-0 overflow-hidden rounded-full border border-primary-dark/20">
                      <Image
                        src={swatch}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="14px"
                      />
                    </span>
                  ) : null}
                  <span className="font-heading tracking-wide text-muted-foreground uppercase">
                    {row.label}
                  </span>
                  <span className="truncate font-medium text-foreground">
                    {row.value}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-primary-dark">
              {formatPrice(item.price * item.amount)}
            </p>
            {item.amount > 1 ? (
              <p className="text-[11px] text-muted-foreground">
                {formatPrice(item.price)} each
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-7 rounded-none border-primary-dark/30"
              onClick={() => updateQuantity(lineKey, item.amount - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums">
              {item.amount}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-7 rounded-none border-primary-dark/30"
              onClick={() => updateQuantity(lineKey, item.amount + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
