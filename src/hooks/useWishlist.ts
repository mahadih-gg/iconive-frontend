"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { wishlistService } from "@/services/wishlist.service";
import type { Product } from "@/types/product.type";
import { queryKeys } from "@/utils/queryKeys";
import { useAuthStore } from "@/store/auth.store";

export function useWishlist() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);

  const query = useQuery({
    queryKey: queryKeys.wishlist.all,
    queryFn: () => wishlistService.getProducts(),
    enabled: Boolean(token),
  });

  const addMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.addProduct(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.wishlist.all });
      const previous = queryClient.getQueryData<Product[]>(queryKeys.wishlist.all);
      return { previous, productId };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.wishlist.all, context.previous);
      }
      toast.error("Could not add to wishlist");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
    onSuccess: () => toast.success("Added to wishlist"),
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.removeProduct(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.wishlist.all });
      const previous = queryClient.getQueryData<Product[]>(queryKeys.wishlist.all);
      queryClient.setQueryData<Product[]>(queryKeys.wishlist.all, (old) =>
        (old ?? []).filter((p) => p._id !== productId),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.wishlist.all, context.previous);
      }
      toast.error("Could not remove from wishlist");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
    onSuccess: () => toast.success("Removed from wishlist"),
  });

  const products = query.data ?? [];

  return {
    products,
    isLoading: query.isLoading,
    addToWishlist: addMutation.mutateAsync,
    removeFromWishlist: removeMutation.mutateAsync,
    isToggling: addMutation.isPending || removeMutation.isPending,
    isInWishlist: (productId: string) =>
      products.some((p) => p._id === productId),
  };
}
