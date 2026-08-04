"use client";

import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Mail,
  Package,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import {
  clearLastOrder,
  readLastOrder,
  type LastOrderSummary,
} from "@/utils/last-order";

export function ThankYouView() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [order, setOrder] = useState<LastOrderSummary | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readLastOrder();
    setOrder(stored);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">Loading your order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-20">
        <ShoppingBag className="mb-3 size-6 text-primary-dark" aria-hidden />
        <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
          Order
        </p>
        <h1 className="font-heading mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          No recent order found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Place an order from checkout to see your confirmation here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button asChild variant="cta" size="ctaSm">
            <Link href="/products">Shop Wigs</Link>
          </Button>
          <Button
            asChild
            variant="ctaOutline"
            size="ctaSm"
            className="border-primary-dark text-primary-dark hover:bg-primary-dark/10"
          >
            <Link href="/checkout">Go to Checkout</Link>
          </Button>
        </div>
      </div>
    );
  }

  const shortId = order.orderId.slice(-8).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8 lg:px-8">
      <div className="border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-8 text-center sm:px-10 sm:py-12">
        <div className="mx-auto flex size-14 items-center justify-center bg-primary/15 text-primary-dark sm:size-16">
          <CheckCircle2 className="size-8 sm:size-9" aria-hidden />
        </div>

        <p className="font-heading mt-5 text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
          Order Confirmed
        </p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Thank You<span className="text-primary-dark">{order.name ? `, ${order.name.split(" ")[0]}` : ""}!</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Your order has been placed successfully. We&apos;ve sent a
          confirmation to{" "}
          <span className="font-medium text-primary-dark">{order.email}</span>.
        </p>

        <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-2">
          <div className="border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3">
            <p className="font-heading text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Order ID
            </p>
            <p className="mt-1 font-heading text-sm font-semibold text-foreground">
              #{shortId}
            </p>
          </div>
          <div className="border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3">
            <p className="font-heading text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Total Paid
            </p>
            <p className="mt-1 text-sm font-semibold text-primary-dark">
              {formatPrice(order.total)}
            </p>
          </div>
          <div className="border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3">
            <p className="font-heading text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Items
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {order.itemCount} item{order.itemCount === 1 ? "" : "s"}
            </p>
          </div>
          <div className="border border-primary-dark/15 bg-[#f3eee6]/60 px-4 py-3">
            <p className="font-heading text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Delivery
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {order.deliveryCharge === 0
                ? "Free"
                : formatPrice(order.deliveryCharge)}
            </p>
          </div>
        </div>

        <ul className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-muted-foreground">
          <li className="flex items-start gap-2.5">
            <Mail className="mt-0.5 size-4 shrink-0 text-primary-dark" />
            Watch your inbox for order updates and shipping details.
          </li>
          <li className="flex items-start gap-2.5">
            <Package className="mt-0.5 size-4 shrink-0 text-primary-dark" />
            Custom pieces typically take 15–20 business days to process.
          </li>
        </ul>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
          {order.paymentUrl ? (
            <Button
              variant="cta"
              size="cta"
              className="h-12"
              onClick={() => {
                window.location.href = order.paymentUrl!;
              }}
            >
              <CreditCard className="size-4" />
              Complete Payment
              <span data-slot="button-arrow" aria-hidden>
                <ArrowRight />
              </span>
            </Button>
          ) : null}

          <Button
            asChild
            variant={order.paymentUrl ? "ctaOutline" : "cta"}
            size="cta"
            className={
              order.paymentUrl
                ? "h-12 border-primary-dark text-primary-dark hover:bg-primary-dark/10"
                : "h-12"
            }
            iconMotion="right"
          >
            <Link href="/products">
              Continue Shopping
              <span data-slot="button-arrow" aria-hidden>
                <ArrowRight />
              </span>
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="mt-6 text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-primary-dark"
          onClick={() => {
            clearLastOrder();
            router.push("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
