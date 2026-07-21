"use client";

import Image from "next/image";
import Link from "next/link";

import { CartItemLine } from "@/components/common/CartItemLine";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import env from "@/lib/env";

const FREE_SHIPPING_USD = 250;

export function CartDrawer() {
  const { items, total, cartDrawerOpen, closeCartDrawer } = useCart();
  const { formatPrice, convert, currency } = useCurrency();

  const freeShippingThreshold = FREE_SHIPPING_USD * env.fxRate;
  const hasFreeShipping = total > freeShippingThreshold;

  return (
    <Sheet open={cartDrawerOpen} onOpenChange={(open) => !open && closeCartDrawer()}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="border-b py-3">
          {hasFreeShipping ? (
            <p className="text-sm font-bold">
              <span className="text-primary">Congratulations! </span>
              you&apos;ve got free shipping!
            </p>
          ) : (
            <p className="text-sm font-bold">
              spend <span className="text-primary"> $250 </span> to get free shipping
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <CartItemLine key={item.product} item={item} />
              ))}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between px-1 font-bold">
                  <p>Grand Total :</p>
                  <p>{formatPrice(total)}</p>
                </div>
                <p className="px-1 text-sm text-foreground">
                  Taxes and shipping calculated at checkout
                </p>
                <p className="border-t p-3 text-sm text-muted-foreground">
                  While the contents of your cart are currently displayed in {currency}, the
                  checkout will use BDT at the latest exchange rate. (
                  {currency === "USD" ? `≈ $${convert(total)}` : `৳${total}`})
                </p>
                <div className="flex gap-3 px-1 pb-4">
                  <Button asChild className="w-1/2" onClick={closeCartDrawer}>
                    <Link href="/checkout">CHECK OUT</Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-1/2" onClick={closeCartDrawer}>
                    <Link href="/products">ADD MORE</Link>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-2 text-center font-bold text-muted-foreground">
              <Image
                src="/Image/emptycart.webp"
                alt="Empty cart"
                width={280}
                height={220}
                className="mx-auto mb-3 mt-8 w-3/4"
              />
              <h5>Cart is empty</h5>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
