import { Badge } from "@/components/ui/badge";

const TONE: Record<string, "default" | "secondary" | "destructive" | "outline"> =
  {
    active: "default",
    approved: "default",
    paid: "default",
    published: "default",
    completed: "default",
    received: "default",
    shipped: "secondary",
    processing: "secondary",
    contacted: "secondary",
    quoted: "secondary",
    in_progress: "secondary",
    pending: "outline",
    payment_pending: "outline",
    order_received: "outline",
    new: "outline",
    rejected: "destructive",
    cancelled: "destructive",
    closed: "secondary",
  };

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = status.toLowerCase();
  const variant = TONE[key] ?? "outline";
  return (
    <Badge variant={variant} className="rounded-none capitalize">
      {status.replaceAll("_", " ")}
    </Badge>
  );
}
