"use client";

import { useQuery } from "@tanstack/react-query";

import { ordersService } from "@/services/orders.service";
import { queryKeys } from "@/utils/queryKeys";
import { useAuthStore } from "@/store/auth.store";

export function useOrders() {
  const token = useAuthStore((s) => s.token);

  const list = useQuery({
    queryKey: queryKeys.orders.list,
    queryFn: () => ordersService.getAllByUser(),
    enabled: Boolean(token),
  });

  const history = useQuery({
    queryKey: queryKeys.orders.history,
    queryFn: () => ordersService.getHistory(),
    enabled: Boolean(token),
  });

  const cancelled = useQuery({
    queryKey: queryKeys.orders.cancelled,
    queryFn: () => ordersService.getCancelled(),
    enabled: Boolean(token),
  });

  return {
    orders: list.data ?? [],
    history: history.data ?? [],
    cancelled: cancelled.data ?? [],
    isLoading: list.isLoading,
    isHistoryLoading: history.isLoading,
    isCancelledLoading: cancelled.isLoading,
    refetch: list.refetch,
  };
}
