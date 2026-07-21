"use client";

import { useQuery } from "@tanstack/react-query";

import { productsService } from "@/services/products.service";
import { queryKeys } from "@/utils/queryKeys";

export function useFeaturedProducts() {
  const trending = useQuery({
    queryKey: queryKeys.products.trending,
    queryFn: () => productsService.getTrending(),
  });

  const topSelling = useQuery({
    queryKey: queryKeys.products.topSelling,
    queryFn: () => productsService.getTopSelling(),
  });

  const offers = useQuery({
    queryKey: queryKeys.products.offers,
    queryFn: () => productsService.getOffers(),
  });

  const stock = useQuery({
    queryKey: queryKeys.products.stock,
    queryFn: () => productsService.getStock(),
  });

  return {
    trending: trending.data ?? [],
    topSelling: topSelling.data ?? [],
    offers: offers.data ?? [],
    stock: stock.data ?? [],
    isLoading:
      trending.isLoading ||
      topSelling.isLoading ||
      offers.isLoading ||
      stock.isLoading,
  };
}
