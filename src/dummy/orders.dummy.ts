// DUMMY_DATA: remove when backend is ready
// Maps to order list/create + payment create

import type { Order } from "@/types/order.type";

import { DUMMY_IDS } from "./_ids.dummy";

export const ordersActiveDummy: Order[] = [
  {
    _id: DUMMY_IDS.order1,
    status: "Order Placed",
    payment_status: "Pending",
    payment_amount: 320.5,
    currency: "USD",
    deliveryCharge: 5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    orderItems: [
      {
        _id: "648e00000000000000000001",
        product: DUMMY_IDS.product1,
        name: "Lace Front Natural Black Wig",
        price: 252,
        quantity: 1,
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
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    orderItems: [
      {
        _id: "648e00000000000000000002",
        product: DUMMY_IDS.product6,
        name: "Bob Cut Lace Wig",
        price: 152,
        quantity: 1,
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
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    orderItems: [
      {
        _id: "648e00000000000000000003",
        product: DUMMY_IDS.product2,
        name: "Full Cap Straight Wig",
        price: 220,
        quantity: 1,
      },
    ],
  },
];

export function createOrderDummy(payload: Record<string, unknown>): Order {
  const order: Order = {
    _id: `645b${Date.now().toString(16).padStart(16, "0").slice(0, 16)}`,
    status: "Order Placed",
    payment_status: "Pending",
    payment_amount: 0,
    currency: (payload.currency as string) ?? "USD",
    deliveryCharge: Number(payload.deliveryCharge ?? 0),
    createdAt: new Date().toISOString(),
    orderItems: [],
  };
  ordersActiveDummy.unshift(order);
  return order;
}

/** No payment_url so checkout shows success toast instead of redirect. */
export function createPaymentDummy(_orderId: string): { payment_url?: string } {
  return {};
}
