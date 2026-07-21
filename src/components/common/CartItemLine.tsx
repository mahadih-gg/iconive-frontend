"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import type { CartItem } from "@/types/cart.type";

interface CartItemLineProps {
  item: CartItem;
}

export function CartItemLine({ item }: CartItemLineProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="flex w-full gap-3 border-b py-4 text-start">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs">No image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <Link
          href={`/products/${item.product}`}
          className="text-sm font-bold uppercase text-foreground no-underline hover:text-primary"
        >
          {item.name}
        </Link>
        <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {item.color && <span>Color: {item.color}</span>}
          {item.length && <span>Length: {item.length}</span>}
          {item.density && <span>Density: {item.density}</span>}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base font-bold">{formatPrice(item.price * item.amount)}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.product, item.amount - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.amount}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.product, item.amount + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => removeFromCart(item.product)}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
