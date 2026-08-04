import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showValue?: boolean;
}

const SIZE_CLASS = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;

export function RatingStars({
  rating,
  size = "md",
  className,
  showValue = false,
}: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const iconSize = SIZE_CLASS[size];

  return (
    <div className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const fillAmount = Math.max(0, Math.min(1, clamped - index));
        const isFull = fillAmount >= 1;
        const isPartial = fillAmount > 0 && fillAmount < 1;

        return (
          <span key={index} className="relative inline-flex shrink-0">
            <Star
              className={cn(iconSize, "text-primary/30")}
              aria-hidden
            />
            {(isFull || isPartial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={isPartial ? { width: `${fillAmount * 100}%` } : undefined}
              >
                <Star
                  className={cn(iconSize, "fill-primary text-primary")}
                  aria-hidden
                />
              </span>
            )}
          </span>
        );
      })}
      {showValue ? (
        <span className="ml-1.5 text-sm font-medium text-foreground">
          {clamped.toFixed(1)}
        </span>
      ) : null}
      <span className="sr-only">{clamped.toFixed(1)} out of 5 stars</span>
    </div>
  );
}
