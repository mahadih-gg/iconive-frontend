"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancelOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId?: string;
  onConfirm?: () => void;
}

export function CancelOrderDialog({
  open,
  onOpenChange,
  invoiceId,
  onConfirm,
}: CancelOrderDialogProps) {
  function handleConfirm() {
    onConfirm?.();
    toast.success("Cancel request submitted");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-primary-dark/20 bg-[#fffcf8] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Cancel Order</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {invoiceId
              ? `Are you sure you want to cancel order ${invoiceId}? This action cannot be undone.`
              : "Are you sure you want to cancel this order? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-none"
            onClick={() => onOpenChange(false)}
          >
            Keep Order
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="rounded-none"
            onClick={handleConfirm}
          >
            Yes, Cancel Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
