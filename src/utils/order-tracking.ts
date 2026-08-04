import type { Order, OrderTrackingStepKey } from "@/types/order.type";

export interface TrackingStep {
  key: OrderTrackingStepKey;
  label: string;
}

export const ORDER_TRACKING_STEPS: TrackingStep[] = [
  { key: "payment_pending", label: "Payment Pending" },
  { key: "order_received", label: "Order Received" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "received", label: "Received" },
];

const STATUS_TO_STEP: Record<string, OrderTrackingStepKey> = {
  "payment pending": "payment_pending",
  pending: "payment_pending",
  "order placed": "order_received",
  "order received": "order_received",
  processing: "processing",
  packed: "processing",
  shipped: "shipped",
  delivered: "received",
  received: "received",
  completed: "received",
  cancelled: "payment_pending",
};

export function getTrackingStepKey(order: Order): OrderTrackingStepKey {
  if (order.trackingStep) return order.trackingStep;
  const raw = String(order.status ?? order.payment_status ?? "").toLowerCase();
  return STATUS_TO_STEP[raw] ?? "order_received";
}

export function getTrackingStepIndex(order: Order): number {
  const key = getTrackingStepKey(order);
  const index = ORDER_TRACKING_STEPS.findIndex((step) => step.key === key);
  return index < 0 ? 0 : index;
}

export function getCompletionPercent(order: Order): number {
  const index = getTrackingStepIndex(order);
  const last = ORDER_TRACKING_STEPS.length - 1;
  if (last <= 0) return 0;
  return Math.round((index / last) * 100);
}

export function formatOrderDate(value?: string): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatInvoiceId(orderId: string): string {
  return orderId.replace(/\D/g, "").slice(-11) || orderId.slice(-8).toUpperCase();
}

export function formatShippingLine(
  address?: Order["shippingAddress"],
): string {
  if (!address) return "—";
  const parts = [
    address.street,
    address.city,
    address.state,
    address.country,
    address.postalCode,
  ].filter(Boolean);
  return parts.join(", ") || "—";
}

export function getOrderTotal(order: Order): number {
  if (typeof order.total === "number") return order.total;
  if (typeof order.payment_amount === "number") return order.payment_amount;
  const items = order.orderItems ?? [];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 1),
    0,
  );
  return (
    subtotal +
    Number(order.deliveryCharge ?? 0) -
    Number(order.discount ?? 0)
  );
}
