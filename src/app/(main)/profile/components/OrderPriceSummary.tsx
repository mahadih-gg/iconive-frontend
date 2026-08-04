"use client";

import { useCurrency } from "@/hooks/useCurrency";
import type { Order } from "@/types/order.type";
import { cn } from "@/lib/utils";
import { getOrderTotal } from "@/utils/order-tracking";

interface OrderPriceSummaryProps {
  order: Order;
  className?: string;
  emphasizeTotal?: boolean;
}

export function OrderPriceSummary({
  order,
  className,
  emphasizeTotal = true,
}: OrderPriceSummaryProps) {
  const { formatPrice } = useCurrency();

  const items = order.orderItems ?? [];
  const subtotal =
    typeof order.subtotal === "number"
      ? order.subtotal
      : items.reduce(
          (sum, item) =>
            sum + Number(item.price ?? 0) * Number(item.quantity ?? 1),
          0,
        );
  const shipping = Number(order.deliveryCharge ?? 0);
  const discount = Number(order.discount ?? 0);
  const total = getOrderTotal(order);

  return (
    <div className={cn("ml-auto w-full max-w-xs space-y-2 text-sm", className)}>
      <div className="flex justify-between gap-4 text-muted-foreground">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between gap-4 text-muted-foreground">
        <span>Shipping</span>
        <span>{formatPrice(shipping)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>Discount</span>
          <span>-{formatPrice(discount)}</span>
        </div>
      )}
      <div
        className={cn(
          "flex justify-between gap-4 border-t border-primary-dark/15 pt-2 font-heading font-semibold",
          emphasizeTotal ? "text-lg text-primary" : "text-base text-foreground",
        )}
      >
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
