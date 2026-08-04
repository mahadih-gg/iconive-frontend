"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CartItemLine } from "@/components/common/CartItemLine";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { getCartLineKey } from "@/utils/cart-line";

export function CartDrawer() {
  const { items, total, cartDrawerOpen, closeCartDrawer } = useCart();
  const { formatPrice } = useCurrency();

  const itemCount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Sheet
      open={cartDrawerOpen}
      onOpenChange={(open) => !open && closeCartDrawer()}
    >
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-primary-dark/20 bg-[#fffcf8] p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-primary-dark/15 px-4 py-4 sm:px-5">
          <SheetTitle className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {itemCount > 0
              ? `${itemCount} item${itemCount === 1 ? "" : "s"} in your cart`
              : "Your cart is waiting to be filled"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-5">
          {items.length > 0 ? (
            <ul>
              {items.map((item) => (
                <li key={getCartLineKey(item)}>
                  <CartItemLine item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center px-2 py-10 text-center">
              <Image
                src="/Image/emptycart.webp"
                alt="Empty cart"
                width={280}
                height={220}
                className="mb-4 w-3/4 max-w-56"
              />
              <ShoppingBag
                className="mb-3 size-6 text-primary-dark"
                aria-hidden
              />
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Cart is empty
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse our collection and add your perfect piece.
              </p>
              <Button
                asChild
                variant="cta"
                size="ctaSm"
                className="mt-5"
                onClick={closeCartDrawer}
              >
                <Link href="/products">Shop Wigs</Link>
              </Button>
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <SheetFooter className="mt-auto gap-3 border-t border-primary-dark/15 bg-[#fffcf8] px-4 py-4 sm:px-5">
            <div className="flex w-full items-baseline justify-between gap-3">
              <p className="font-heading text-sm font-semibold tracking-wide text-foreground uppercase">
                Grand Total
              </p>
              <p className="text-lg font-semibold text-primary-dark">
                {formatPrice(total)}
              </p>
            </div>
            <p className="w-full text-xs text-muted-foreground">
              Taxes and shipping calculated at checkout
            </p>
            <div className="flex w-full gap-2">
              <Button
                asChild
                variant="cta"
                size="ctaSm"
                className="flex-1"
                onClick={closeCartDrawer}
              >
                <Link href="/checkout">Check Out</Link>
              </Button>
              <Button
                asChild
                variant="ctaOutline"
                size="ctaSm"
                className="flex-1 border-primary-dark text-primary-dark hover:bg-primary-dark/10"
                onClick={closeCartDrawer}
              >
                <Link href="/products">Add More</Link>
              </Button>
            </div>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
