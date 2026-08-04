"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useOrders } from "@/hooks/useOrders";
import {
  refundSchema,
  type RefundFormValues,
} from "@/lib/validations/profileSchema";
import { cn } from "@/lib/utils";
import { formatInvoiceId } from "@/utils/order-tracking";

const fieldClassName =
  "rounded-none border-primary-dark/20 bg-white shadow-none focus-visible:border-primary focus-visible:ring-primary/30";

const labelClassName =
  "font-heading mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary-dark uppercase";

const REASONS = [
  "Wrong item received",
  "Damaged product",
  "Not as described",
  "Changed my mind",
  "Other",
];

interface MakeRefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultOrderId?: string;
}

export function MakeRefundDialog({
  open,
  onOpenChange,
  defaultOrderId,
}: MakeRefundDialogProps) {
  const { orders, history, requestRefund, isRequestingRefund } = useOrders();
  const eligible = [...orders, ...history];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      orderId: defaultOrderId ?? "",
      reason: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        orderId: defaultOrderId ?? eligible[0]?._id ?? "",
        reason: "",
        notes: "",
      });
    }
  }, [open, defaultOrderId, reset]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(values: RefundFormValues) {
    await requestRefund({
      orderId: values.orderId,
      reason: values.reason,
      notes: values.notes,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border-primary-dark/20 bg-[#fffcf8] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Make Refund</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className={labelClassName}>Order</Label>
            <Select
              value={watch("orderId")}
              onValueChange={(value) => setValue("orderId", value)}
            >
              <SelectTrigger className={cn(fieldClassName, "w-full")}>
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                {eligible.map((order) => (
                  <SelectItem key={order._id} value={order._id}>
                    Invoice {formatInvoiceId(order._id)} —{" "}
                    {order.orderItems?.[0]?.name ?? "Order"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.orderId && (
              <p className="mt-1 text-xs text-destructive">
                {errors.orderId.message}
              </p>
            )}
            {eligible.length === 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                No eligible orders available for refund.
              </p>
            )}
          </div>

          <div>
            <Label className={labelClassName}>Reason</Label>
            <Select
              value={watch("reason")}
              onValueChange={(value) => setValue("reason", value)}
            >
              <SelectTrigger className={cn(fieldClassName, "w-full")}>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {REASONS.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.reason && (
              <p className="mt-1 text-xs text-destructive">
                {errors.reason.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="notes" className={labelClassName}>
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Tell us more (optional)"
              className={cn(fieldClassName, "min-h-20")}
              {...register("notes")}
            />
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="rounded-none"
              disabled={isRequestingRefund || eligible.length === 0}
            >
              {isRequestingRefund ? (
                <Spinner className="size-4" />
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
