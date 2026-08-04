"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import type { AdminSheetMode } from "@/hooks/admin/useAdminSheet";
import { cn } from "@/lib/utils";

interface AdminFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Form element id — footer submit button targets this form */
  formId: string;
  mode?: AdminSheetMode | null;
  isSubmitting?: boolean;
  createLabel?: string;
  updateLabel?: string;
  cancelLabel?: string;
  contentClassName?: string;
}

export function AdminFormSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  formId,
  mode = "create",
  isSubmitting = false,
  createLabel = "Create",
  updateLabel = "Update",
  cancelLabel = "Cancel",
  contentClassName,
}: AdminFormSheetProps) {
  const submitLabel = mode === "edit" ? updateLabel : createLabel;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton
        className={cn(
          "flex h-full w-full! max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-xl",
          contentClassName,
        )}
      >
        <SheetHeader className="shrink-0 border-b border-border pr-12 px-4 py-4">
          <SheetTitle>{title}</SheetTitle>
          {description ? (
            <SheetDescription>{description}</SheetDescription>
          ) : null}
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="px-4 py-4">{children}</div>
        </div>

        <SheetFooter className="shrink-0 flex-row gap-2 border-t border-border sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-none"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            form={formId}
            className="rounded-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
            {submitLabel}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
