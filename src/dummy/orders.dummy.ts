// DUMMY_DATA: remove when backend is ready
// Maps to order list/create + payment create

import type { Order } from "@/types/order.type";

import { DUMMY_IDS } from "./_ids.dummy";

const SHARED_SHIPPING = {
  street: "221B Baker Street",
  city: "London",
  state: "England",
  country: "United Kingdom",
  postalCode: "NW1 6XE",
};

export const ordersActiveDummy: Order[] = [
  {
    _id: DUMMY_IDS.order1,
    status: "Processing",
    payment_status: "Completed",
    payment_amount: 617,
    currency: "USD",
    deliveryCharge: 15,
    subtotal: 658,
    discount: 56,
    total: 617,
    trackingStep: "processing",
    estimatedDelivery: new Date(
      Date.now() + 10 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: SHARED_SHIPPING,
    orderItems: [
      {
        _id: "648e00000000000000000001",
        product: DUMMY_IDS.product1,
        name: "Lace Front Natural Black Wig",
        description: "Premium remy human hair lace front wig.",
        price: 329,
        quantity: 1,
        image: "/Image/Black/1jetblack.webp",
      },
      {
        _id: "648e00000000000000000011",
        product: DUMMY_IDS.product6,
        name: "Bob Cut Lace Wig",
        description: "Stylish short bob lace wig, ready to wear.",
        price: 329,
        quantity: 1,
        image: "/Image/Black/1B 0ff black.webp",
      },
    ],
  },
  {
    _id: "645b00000000000000000004",
    status: "Order Placed",
    payment_status: "Pending",
    payment_amount: 320.5,
    currency: "USD",
    deliveryCharge: 5,
    subtotal: 315.5,
    discount: 0,
    total: 320.5,
    trackingStep: "payment_pending",
    estimatedDelivery: new Date(
      Date.now() + 14 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: {
      street: "12 Example Street",
      city: "Dhaka",
      state: "Dhaka",
      country: "Bangladesh",
      postalCode: "1207",
    },
    orderItems: [
      {
        _id: "648e00000000000000000012",
        product: DUMMY_IDS.product1,
        name: "Lace Front Natural Black Wig",
        description: "Premium remy human hair lace front wig with natural hairline.",
        price: 252,
        quantity: 1,
        image: "/Image/Black/1jetblack.webp",
      },
    ],
  },
];

export const ordersHistoryDummy: Order[] = [
  {
    _id: DUMMY_IDS.order2,
    status: "Received",
    payment_status: "Completed",
    payment_amount: 190,
    currency: "USD",
    deliveryCharge: 0,
    subtotal: 190,
    discount: 0,
    total: 190,
    trackingStep: "received",
    estimatedDelivery: new Date(
      Date.now() - 20 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: SHARED_SHIPPING,
    orderItems: [
      {
        _id: "648e00000000000000000002",
        product: DUMMY_IDS.product6,
        name: "Bob Cut Lace Wig",
        description: "Stylish short bob lace wig, ready to wear.",
        price: 152,
        quantity: 1,
        image: "/Image/Black/1B 0ff black.webp",
      },
    ],
  },
];

export const ordersCancelledDummy: Order[] = [
  {
    _id: DUMMY_IDS.order3,
    status: "Cancelled",
    payment_status: "Refunded",
    payment_amount: 220,
    currency: "USD",
    deliveryCharge: 5,
    subtotal: 220,
    discount: 5,
    total: 220,
    trackingStep: "payment_pending",
    refundStatus: "completed",
    cancellationDate: new Date(
      Date.now() - 12 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    refundDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: SHARED_SHIPPING,
    orderItems: [
      {
        _id: "648e00000000000000000003",
        product: DUMMY_IDS.product2,
        name: "Full Cap Straight Wig",
        description: "Full cap straight style, easy to wear and maintain.",
        price: 220,
        quantity: 1,
        image: "/Image/Black/1C cool black.webp",
      },
    ],
  },
  {
    _id: "645b00000000000000000005",
    status: "Cancelled",
    payment_status: "Refund Pending",
    payment_amount: 329,
    currency: "USD",
    deliveryCharge: 10,
    subtotal: 329,
    discount: 10,
    total: 329,
    refundStatus: "processing",
    daysRemaining: 15,
    cancellationDate: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    estimatedRefundDate: new Date(
      Date.now() + 12 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: SHARED_SHIPPING,
    orderItems: [
      {
        _id: "648e00000000000000000013",
        product: DUMMY_IDS.product1,
        name: "Lace Front Natural Black Wig",
        description: "Premium remy human hair lace front wig.",
        price: 329,
        quantity: 1,
        image: "/Image/Black/1jetblack.webp",
      },
    ],
  },
];

export function getAllOrdersDummy(): Order[] {
  return [...ordersActiveDummy, ...ordersHistoryDummy, ...ordersCancelledDummy];
}

export function getOrderByIdDummy(id: string): Order | null {
  return getAllOrdersDummy().find((order) => order._id === id) ?? null;
}

export function createOrderDummy(payload: Record<string, unknown>): Order {
  const order: Order = {
    _id: `645b${Date.now().toString(16).padStart(16, "0").slice(0, 16)}`,
    status: "Order Placed",
    payment_status: "Pending",
    payment_amount: 0,
    currency: (payload.currency as string) ?? "USD",
    deliveryCharge: Number(payload.deliveryCharge ?? 0),
    trackingStep: "payment_pending",
    createdAt: new Date().toISOString(),
    orderItems: [],
  };
  ordersActiveDummy.unshift(order);
  return order;
}

export function createRefundRequestDummy(payload: {
  orderId: string;
  reason: string;
  notes?: string;
}): Order | null {
  const source =
    ordersActiveDummy.find((o) => o._id === payload.orderId) ??
    ordersHistoryDummy.find((o) => o._id === payload.orderId);

  if (!source) return null;

  const refundOrder: Order = {
    ...source,
    status: "Cancelled",
    payment_status: "Refund Pending",
    refundStatus: "processing",
    daysRemaining: 15,
    cancellationDate: new Date().toISOString(),
    estimatedRefundDate: new Date(
      Date.now() + 15 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  };

  const activeIndex = ordersActiveDummy.findIndex((o) => o._id === payload.orderId);
  if (activeIndex >= 0) ordersActiveDummy.splice(activeIndex, 1);

  const historyIndex = ordersHistoryDummy.findIndex(
    (o) => o._id === payload.orderId,
  );
  if (historyIndex >= 0) ordersHistoryDummy.splice(historyIndex, 1);

  ordersCancelledDummy.unshift(refundOrder);
  return refundOrder;
}

/** No payment_url so checkout shows success toast instead of redirect. */
export function createPaymentDummy(_orderId: string): { payment_url?: string } {
  return {};
}
