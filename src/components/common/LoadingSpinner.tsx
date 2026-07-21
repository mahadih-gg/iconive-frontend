"use client";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/cn";

export interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center p-6", className)}>
      <Spinner className="h-6 w-6" />
    </div>
  );
}
