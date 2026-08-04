import { cn } from "@/lib/utils";

interface OrderCompletionRingProps {
  percent: number;
  className?: string;
  size?: number;
}

export function OrderCompletionRing({
  percent,
  className,
  size = 72,
}: OrderCompletionRingProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-label={`${clamped}% completed`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-primary/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading text-sm font-bold leading-none text-foreground">
          {clamped}%
        </span>
        <span className="mt-0.5 text-[9px] font-medium tracking-wide text-muted-foreground uppercase">
          Done
        </span>
      </div>
    </div>
  );
}
