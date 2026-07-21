"use client";

import { useQuery } from "@tanstack/react-query";

import { categoriesService } from "@/services/categories.service";
import { queryKeys } from "@/utils/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => categoriesService.getAll(),
    staleTime: 1000 * 60 * 10,
  });
}
