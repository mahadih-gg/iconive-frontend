import { Badge } from "@/components/ui/badge";
import { formatEnumLabel } from "@/lib/admin/labels";
import { cn } from "@/lib/utils";

type BadgeTone = "success" | "neutral" | "warning" | "danger" | "muted";

const TONE: Record<string, BadgeTone> = {
  active: "success",
  approved: "success",
  paid: "success",
  published: "success",
  completed: "success",
  received: "success",
  shipped: "neutral",
  processing: "neutral",
  contacted: "neutral",
  quoted: "neutral",
  in_progress: "neutral",
  pending: "warning",
  payment_pending: "warning",
  order_received: "warning",
  new: "warning",
  inactive: "muted",
  rejected: "danger",
  cancelled: "danger",
  closed: "muted",
};

const TONE_CLASS: Record<BadgeTone, string> = {
  success: "border-transparent bg-green-200 text-green-800",
  neutral: "border-transparent bg-secondary text-secondary-foreground",
  warning: "border-border bg-transparent text-foreground",
  danger: "border-transparent bg-destructive/15 text-destructive",
  muted: "border-border bg-transparent text-muted-foreground",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status.toLowerCase();
  const tone = TONE[key] ?? "muted";

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-none",
        TONE_CLASS[tone],
        className,
      )}
    >
      {formatEnumLabel(status)}
    </Badge>
  );
}
