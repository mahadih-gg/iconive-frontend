"use client";

import { useQuery } from "@tanstack/react-query";

import { productsService } from "@/services/products.service";
import { queryKeys } from "@/utils/queryKeys";

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsService.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
