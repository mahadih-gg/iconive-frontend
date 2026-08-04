import type { ShippingAddress } from "@/types/address.type";

export type OrderTrackingStepKey =
  | "payment_pending"
  | "order_received"
  | "processing"
  | "shipped"
  | "received";

export interface OrderItem {
  _id: string;
  product?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  status?: string;
  image?: string;
  photo?: string;
  [key: string]: unknown;
}

export interface Order {
  _id: string;
  status?: string;
  total?: number;
  orderItems?: OrderItem[];
  createdAt?: string;
  paymentStatus?: string;
  payment_status?: string;
  payment_amount?: number;
  currency?: string;
  deliveryCharge?: number;
  subtotal?: number;
  discount?: number;
  estimatedDelivery?: string;
  shippingAddress?: ShippingAddress;
  trackingStep?: OrderTrackingStepKey;
  cancellationDate?: string;
  refundDate?: string;
  estimatedRefundDate?: string;
  refundStatus?: "processing" | "completed";
  daysRemaining?: number;
  [key: string]: unknown;
}
