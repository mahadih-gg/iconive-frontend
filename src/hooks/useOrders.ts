"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ordersService } from "@/services/orders.service";
import { queryKeys } from "@/utils/queryKeys";
import { useAuthStore } from "@/store/auth.store";

export function useOrders() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

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

  const refundMutation = useMutation({
    mutationFn: (payload: {
      orderId: string;
      reason: string;
      notes?: string;
    }) => ordersService.requestRefund(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.orders.list });
      void queryClient.invalidateQueries({ queryKey: queryKeys.orders.history });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.orders.cancelled,
      });
      toast.success("Refund request submitted");
    },
    onError: () => toast.error("Could not submit refund request"),
  });

  return {
    orders: list.data ?? [],
    history: history.data ?? [],
    cancelled: cancelled.data ?? [],
    isLoading: list.isLoading,
    isHistoryLoading: history.isLoading,
    isCancelledLoading: cancelled.isLoading,
    refetch: list.refetch,
    requestRefund: refundMutation.mutateAsync,
    isRequestingRefund: refundMutation.isPending,
  };
}
