"use client";

import type { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AdminFormSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: AdminFormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b border-border px-4 py-4">
          <SheetTitle>{title}</SheetTitle>
          {description ? (
            <SheetDescription>{description}</SheetDescription>
          ) : null}
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="px-4 py-4">{children}</div>
        </ScrollArea>
        {footer ? (
          <div className="mt-auto border-t border-border px-4 py-4">{footer}</div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
