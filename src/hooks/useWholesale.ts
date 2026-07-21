"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { wholesaleService } from "@/services/wholesale.service";
import { queryKeys } from "@/utils/queryKeys";

export function useWholesale() {
  const products = useQuery({
    queryKey: queryKeys.wholesale.products,
    queryFn: () => wholesaleService.getAllProducts(),
  });

  const inquiry = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      wholesaleService.submitInquiry(payload),
    onSuccess: () => toast.success("Inquiry submitted"),
    onError: () => toast.error("Could not submit inquiry"),
  });

  return {
    products: products.data ?? [],
    isLoading: products.isLoading,
    submitInquiry: inquiry.mutateAsync,
    isSubmitting: inquiry.isPending,
  };
}
