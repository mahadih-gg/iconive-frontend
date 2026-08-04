"use client";

import { Check } from "lucide-react";

import type { Order } from "@/types/order.type";
import { cn } from "@/lib/utils";
import {
  getTrackingStepIndex,
  ORDER_TRACKING_STEPS,
} from "@/utils/order-tracking";

interface OrderTrackingStepperProps {
  order: Order;
  className?: string;
}

export function OrderTrackingStepper({
  order,
  className,
}: OrderTrackingStepperProps) {
  const currentIndex = getTrackingStepIndex(order);

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile: vertical */}
      <ol className="relative space-y-0 md:hidden" aria-label="Order tracking">
        {ORDER_TRACKING_STEPS.map((step, index) => {
          const isComplete = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === ORDER_TRACKING_STEPS.length - 1;

          return (
            <li key={step.key} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast && (
                <span
                  className={cn(
                    "absolute top-6 left-[11px] h-[calc(100%-8px)] w-0.5",
                    index < currentIndex ? "bg-primary" : "bg-primary/25",
                  )}
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center border-2",
                  isComplete
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary bg-[#fffcf8]",
                )}
              >
                {isComplete ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : null}
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isComplete ? "text-foreground" : "text-muted-foreground",
                    isCurrent && "font-semibold text-primary-dark",
                  )}
                >
                  {step.label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: horizontal */}
      <ol
        className="hidden md:grid md:grid-cols-5 md:gap-0"
        aria-label="Order tracking"
      >
        {ORDER_TRACKING_STEPS.map((step, index) => {
          const isComplete = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step.key}
              className="relative flex flex-col items-center px-1 text-center"
            >
              {index > 0 && (
                <span
                  className={cn(
                    "absolute top-3 right-1/2 left-[-50%] z-0 h-0.5",
                    index <= currentIndex ? "bg-primary" : "bg-primary/25",
                  )}
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex size-6 items-center justify-center border-2",
                  isComplete
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary bg-[#fffcf8]",
                )}
              >
                {isComplete ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : null}
              </span>
              <p
                className={cn(
                  "mt-2 text-[11px] leading-snug font-medium sm:text-xs",
                  isComplete ? "text-foreground" : "text-muted-foreground",
                  isCurrent && "font-semibold text-primary-dark",
                )}
              >
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
