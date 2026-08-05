"use client";

import Image from "next/image";

import { useCurrency } from "@/hooks/useCurrency";
import type { OrderItem } from "@/types/order.type";
import { cn } from "@/lib/utils";
import { getOrderItemDetailRows } from "@/utils/order-item";
import { COLOR_OPTIONS } from "@/utils/product-options";

interface OrderItemsListProps {
  items: OrderItem[];
  className?: string;
}

function getColorSwatch(colorLabel?: string) {
  if (!colorLabel) return undefined;
  return COLOR_OPTIONS.find((option) => option.label === colorLabel)?.src;
}

export function OrderItemsList({ items, className }: OrderItemsListProps) {
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No items in this order.</p>
    );
  }

  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item) => {
        const image = item.image ?? item.photo ?? "/Image/custom/wigs1.jpg";
        const qty = Number(item.quantity ?? item.amount ?? 1);
        const details = getOrderItemDetailRows(item);

        return (
          <li
            key={item._id}
            className="flex items-start gap-3 border border-primary-dark/10 bg-[#f3eee6]/40 p-3 sm:gap-4"
          >
            <div className="relative size-16 shrink-0 overflow-hidden border border-primary-dark/15 bg-white sm:size-20">
              <Image
                src={String(image)}
                alt={item.name ?? "Product"}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-foreground sm:text-base">
                    {item.name ?? "Product"}
                  </p>
                  {item.description ? (
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {String(item.description)}
                    </p>
                  ) : null}
                </div>
                <p className="font-heading text-sm font-semibold text-primary-dark">
                  {formatPrice(Number(item.price ?? 0))}
                </p>
              </div>

              {details.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {details.map((row) => {
                    const swatch =
                      row.label === "Color"
                        ? getColorSwatch(row.value)
                        : undefined;

                    return (
                      <li
                        key={`${item._id}-${row.label}-${row.value}`}
                        className="inline-flex max-w-full items-center gap-1.5 border border-primary-dark/20 bg-white/80 px-2 py-1 text-[11px] leading-none"
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

              <span className="mt-2 inline-flex bg-primary/20 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-primary-dark uppercase">
                Qty: {qty}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
