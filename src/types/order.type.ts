import type { ShippingAddress } from "@/types/address.type";

export type OrderTrackingStepKey =
  | "payment_pending"
  | "order_received"
  | "processing"
  | "shipped"
  | "received";

export interface OrderItemAddon {
  name?: string;
  value?: string;
  price?: number | string;
}

export interface OrderItemVariant {
  label?: string;
  name?: string;
  value?: string;
}

export interface OrderItem {
  _id: string;
  product?: string | Record<string, unknown>;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  amount?: number;
  status?: string;
  image?: string;
  photo?: string;
  category?: string | { _id?: string; name?: string };
  categoryName?: string;
  subCategory?: string | { _id?: string; name?: string };
  subCategoryName?: string;
  subcategory?: string | { _id?: string; name?: string };
  color?: string | { _id?: string; name?: string; label?: string; photo?: string };
  length?: string;
  density?: string;
  size?: string;
  addons?: OrderItemAddon[];
  addOns?: OrderItemAddon[];
  variants?: OrderItemVariant[];
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
