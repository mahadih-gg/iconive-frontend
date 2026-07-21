import { api } from "@/lib/axios";
import type { Order, OrderItem } from "@/types/order.type";

export const ordersService = {
  getAllByUser: async (): Promise<Order[]> => {
    const { data } = await api.get<Order[]>("/order/getAllByUser");
    return Array.isArray(data) ? data : [];
  },
  getHistory: async (): Promise<Order[]> => {
    const { data } = await api.get<Order[]>("/order/getOrderHistory");
    return Array.isArray(data) ? data : [];
  },
  getCancelled: async (): Promise<Order[]> => {
    const { data } = await api.get<Order[]>("/order/getCancelledOrders");
    return Array.isArray(data) ? data : [];
  },
  getItem: async (orderItemId: string): Promise<OrderItem> => {
    const { data } = await api.get<OrderItem>(`/orderItem/getOne/${orderItemId}`);
    return data;
  },
  create: async (payload: Record<string, unknown>): Promise<Order> => {
    const { data } = await api.post<Order>("/order", payload);
    return data;
  },
  update: async (id: string, payload: Record<string, unknown>): Promise<Order> => {
    const { data } = await api.put<Order>(`/order/${id}`, payload);
    return data;
  },
  createPayment: async (
    orderId: string,
  ): Promise<{ payment_url?: string }> => {
    const { data } = await api.post<{ payment_url?: string }>(
      `/payment/create/${orderId}`,
    );
    return data;
  },
};
