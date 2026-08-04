import {
  createOrderDummy,
  createPaymentDummy,
  createRefundRequestDummy,
  getOrderByIdDummy,
  ordersActiveDummy,
  ordersCancelledDummy,
  ordersHistoryDummy,
} from "@/dummy/orders.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";
import type { Order, OrderItem } from "@/types/order.type";

export const ordersService = {
  getAllByUser: async (): Promise<Order[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(ordersActiveDummy, async () => {
      const { data } = await api.get<Order[]>("/order/getAllByUser");
      return Array.isArray(data) ? data : [];
    });
  },
  getHistory: async (): Promise<Order[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(ordersHistoryDummy, async () => {
      const { data } = await api.get<Order[]>("/order/getOrderHistory");
      return Array.isArray(data) ? data : [];
    });
  },
  getCancelled: async (): Promise<Order[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(ordersCancelledDummy, async () => {
      const { data } = await api.get<Order[]>("/order/getCancelledOrders");
      return Array.isArray(data) ? data : [];
    });
  },
  getById: async (id: string): Promise<Order> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => {
        const order = getOrderByIdDummy(id);
        if (!order) throw new Error("Order not found");
        return order;
      },
      async () => {
        const { data } = await api.get<Order>(`/order/${id}`);
        return data;
      },
    );
  },
  getItem: async (orderItemId: string): Promise<OrderItem> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      (): OrderItem => ({
        _id: orderItemId,
        name: "Dummy Order Item",
        price: 100,
        quantity: 1,
      }),
      async () => {
        const { data } = await api.get<OrderItem>(
          `/orderItem/getOne/${orderItemId}`,
        );
        return data;
      },
    );
  },
  create: async (payload: Record<string, unknown>): Promise<Order> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => createOrderDummy(payload),
      async () => {
        const { data } = await api.post<Order>("/order", payload);
        return data;
      },
    );
  },
  update: async (id: string, payload: Record<string, unknown>): Promise<Order> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => ({ _id: id, ...payload }) as Order,
      async () => {
        const { data } = await api.put<Order>(`/order/${id}`, payload);
        return data;
      },
    );
  },
  requestRefund: async (payload: {
    orderId: string;
    reason: string;
    notes?: string;
  }): Promise<Order> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => {
        const order = createRefundRequestDummy(payload);
        if (!order) throw new Error("Order not found");
        return order;
      },
      async () => {
        const { data } = await api.post<Order>("/order/refund", payload);
        return data;
      },
    );
  },
  createPayment: async (
    orderId: string,
  ): Promise<{ payment_url?: string }> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => createPaymentDummy(orderId),
      async () => {
        const { data } = await api.post<{ payment_url?: string }>(
          `/payment/create/${orderId}`,
        );
        return data;
      },
    );
  },
};
