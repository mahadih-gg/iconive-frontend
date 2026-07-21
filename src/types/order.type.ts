export interface OrderItem {
  _id: string;
  product?: string;
  name?: string;
  price?: number;
  quantity?: number;
  status?: string;
  [key: string]: unknown;
}

export interface Order {
  _id: string;
  status?: string;
  total?: number;
  orderItems?: OrderItem[];
  createdAt?: string;
  paymentStatus?: string;
  shippingAddress?: Record<string, unknown>;
  [key: string]: unknown;
}
