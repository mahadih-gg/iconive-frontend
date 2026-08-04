"use client";

import { useState } from "react";
import { CheckCircle2, Copy, RefreshCcw, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useOrders";
import {
  formatInvoiceId,
  formatOrderDate,
} from "@/utils/order-tracking";

import { MakeRefundDialog } from "./MakeRefundDialog";
import { ProfileShell } from "./ProfileShell";

export function RefundsView() {
  const { cancelled, isCancelledLoading } = useOrders();
  const [open, setOpen] = useState(false);

  return (
    <ProfileShell
      title="Refund and Return"
      actions={
        <Button variant="cta" size="ctaSm" onClick={() => setOpen(true)}>
          Make Refund
        </Button>
      }
    >
      {isCancelledLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-36 w-full rounded-none" />
          <Skeleton className="h-36 w-full rounded-none" />
        </div>
      ) : cancelled.length === 0 ? (
        <div className="border-2 border-primary-dark/20 bg-[#fffcf8] px-5 py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center bg-primary/15 text-primary-dark">
            <RefreshCcw className="size-7" />
          </div>
          <p className="font-heading mt-5 text-[11px] font-semibold tracking-[0.22em] text-primary-dark uppercase">
            Refunds
          </p>
          <h2 className="font-heading mt-2 text-2xl font-semibold">
            No refund requests
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Need to return an item? Start a refund request and we&apos;ll guide
            you through the process.
          </p>
          <Button
            variant="cta"
            size="ctaSm"
            className="mt-6"
            onClick={() => setOpen(true)}
          >
            Make Refund
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {cancelled.map((order) => {
            const invoiceId = formatInvoiceId(order._id);
            const isCompleted = order.refundStatus === "completed";

            return (
              <article
                key={order._id}
                className="border-2 border-primary-dark/20 bg-[#fffcf8] p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-base font-semibold sm:text-lg">
                    Invoice ID: {invoiceId}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(invoiceId);
                      toast.success("Invoice ID copied");
                    }}
                    className="text-muted-foreground hover:text-primary-dark"
                    aria-label="Copy invoice ID"
                  >
                    <Copy className="size-4" />
                  </button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-center">
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                        Status
                      </p>
                      <p
                        className={
                          isCompleted
                            ? "font-semibold text-emerald-600"
                            : "font-semibold text-foreground"
                        }
                      >
                        {isCompleted ? "Completed" : "Processing"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                        Cancellation Date
                      </p>
                      <p className="text-sm font-medium">
                        {formatOrderDate(
                          order.cancellationDate ?? order.createdAt,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 border-t border-primary-dark/10 pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-5">
                    <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                        {isCompleted
                          ? "Refund Date"
                          : "Estimated Refund Date"}
                      </p>
                      <p className="font-heading text-sm font-semibold text-primary">
                        {formatOrderDate(
                          isCompleted
                            ? order.refundDate
                            : order.estimatedRefundDate,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start md:justify-end">
                    {isCompleted ? (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle2 className="size-10 fill-emerald-600 text-white" />
                        <span className="font-heading text-sm font-semibold">
                          Refund Successful
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="font-heading text-3xl font-bold text-primary">
                          {order.daysRemaining ?? 15}
                        </p>
                        <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                          Days Remaining
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <MakeRefundDialog open={open} onOpenChange={setOpen} />
    </ProfileShell>
  );
}
