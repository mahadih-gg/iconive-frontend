"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Copy,
  Info,
  Plane,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Order } from "@/types/order.type";
import { cn } from "@/lib/utils";
import {
  formatInvoiceId,
  formatOrderDate,
  formatShippingLine,
  getCompletionPercent,
} from "@/utils/order-tracking";

import { CancelOrderDialog } from "./CancelOrderDialog";
import { OrderCompletionRing } from "./OrderCompletionRing";
import { OrderItemsList } from "./OrderItemsList";
import { OrderPriceSummary } from "./OrderPriceSummary";
import { OrderTrackingStepper } from "./OrderTrackingStepper";

interface OrderCardProps {
  order: Order;
  variant?: "active" | "history";
  defaultExpanded?: boolean;
  showTracking?: boolean;
}

export function OrderCard({
  order,
  variant = "active",
  defaultExpanded = false,
  showTracking = true,
}: OrderCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [cancelOpen, setCancelOpen] = useState(false);
  const invoiceId = formatInvoiceId(order._id);
  const percent = getCompletionPercent(order);
  const isHistory = variant === "history";

  function copyInvoice() {
    void navigator.clipboard.writeText(invoiceId);
    toast.success("Invoice ID copied");
  }

  return (
    <article className="border-2 border-primary-dark/20 bg-[#fffcf8]">
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1.1fr_1fr_auto] md:items-start">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-heading text-base font-semibold text-foreground sm:text-lg">
              Invoice ID: {invoiceId}
            </p>
            <button
              type="button"
              onClick={copyInvoice}
              className="text-muted-foreground transition-colors hover:text-primary-dark"
              aria-label="Copy invoice ID"
            >
              <Copy className="size-4" />
            </button>
          </div>

          {isHistory ? (
            <div>
              <p className="font-heading text-lg font-semibold text-primary sm:text-xl">
                {formatOrderDate(order.estimatedDelivery ?? order.createdAt)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground uppercase">
                Delivered
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <Plane className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                  Estimated Delivery
                </p>
                <p className="font-heading text-sm font-semibold text-primary sm:text-base">
                  {formatOrderDate(order.estimatedDelivery)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 border-t border-primary-dark/10 pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-5">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Order Date
            </p>
            <p className="text-sm font-medium text-foreground">
              {formatOrderDate(order.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Shipping Address
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {formatShippingLine(order.shippingAddress)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          {isHistory ? (
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="size-10 fill-emerald-600 text-white" />
              <span className="font-heading text-sm font-semibold">
                Completed
              </span>
            </div>
          ) : (
            <OrderCompletionRing percent={percent} />
          )}
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "space-y-5 border-t border-primary-dark/15 px-4 py-5 transition-opacity duration-300 ease-in-out sm:px-5",
              expanded
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            )}
            aria-hidden={!expanded}
          >
            {showTracking && !isHistory && (
              <div>
                <p className="font-heading mb-4 text-[11px] font-semibold tracking-[0.18em] text-primary-dark uppercase">
                  Order Tracking
                </p>
                <OrderTrackingStepper order={order} />
              </div>
            )}

            <div>
              <p className="font-heading mb-3 text-[11px] font-semibold tracking-[0.18em] text-primary-dark uppercase">
                Items
              </p>
              <OrderItemsList items={order.orderItems ?? []} />
            </div>

            <OrderPriceSummary order={order} emphasizeTotal={!isHistory} />

            <div className="flex flex-col gap-4 border-t border-primary-dark/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Button
                variant="cta"
                size="ctaSm"
                onClick={() => toast.success("Invoice download started")}
              >
                Download Invoice
              </Button>
              {!isHistory && (
                <>
                  <button
                    type="button"
                    className="text-sm font-medium text-foreground underline underline-offset-4"
                    onClick={() => setCancelOpen(true)}
                  >
                    Cancel Order
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground underline underline-offset-4"
                    onClick={() =>
                      toast.message("Support will contact you soon")
                    }
                  >
                    Queries
                    <Info className="size-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-center gap-1 border-t border-primary-dark/10 py-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase transition-colors hover:bg-primary/5 hover:text-foreground"
      >
        {expanded ? "Collapse" : "Expand"}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-300 ease-in-out",
            expanded && "rotate-180",
          )}
        />
      </button>

      <CancelOrderDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        invoiceId={invoiceId}
      />
    </article>
  );
}
