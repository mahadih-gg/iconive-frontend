"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { productsService } from "@/services/products.service";
import type { ProductFilters } from "@/types/product.type";
import { queryKeys } from "@/utils/queryKeys";

export function useProducts(initialFilters: ProductFilters = {}) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? undefined;
  const bannerFromUrl = searchParams.get("topbanner");

  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 48,
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    subcategories: [],
    ...initialFilters,
  });
  const [search, setSearch] = useState("");
  const [topBanner, setTopBanner] = useState(
    bannerFromUrl ? Number(bannerFromUrl) : 1,
  );
  const [expandedCategory, setExpandedCategory] = useState(categoryFromUrl ?? "");

  useEffect(() => {
    const category = searchParams.get("category");
    const banner = searchParams.get("topbanner");
    if (category) {
      setExpandedCategory(category);
      setFilters((prev) => ({ ...prev, categories: [category], page: 1 }));
    }
    if (banner) setTopBanner(Number(banner));
  }, [searchParams]);

  const hasCategoryFilter =
    (Array.isArray(filters.categories) && filters.categories.length > 0) ||
    (Array.isArray(filters.subcategories) && filters.subcategories.length > 0);

  const query = useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () =>
      productsService.getAll({
        filters: {
          categories: filters.categories ?? [],
          subcategories: filters.subcategories ?? [],
        },
      } as ProductFilters),
    enabled: hasCategoryFilter,
  });

  function selectCategory(categoryId: string, bannerIndex: number) {
    setExpandedCategory(categoryId);
    setTopBanner(bannerIndex);
    setFilters((prev) => ({
      ...prev,
      categories: [categoryId],
      subcategories: [],
      page: 1,
    }));
  }

  function toggleSubcategory(subcategoryId: string) {
    setFilters((prev) => {
      const current = Array.isArray(prev.subcategories)
        ? [...(prev.subcategories as string[])]
        : [];
      const next = current.includes(subcategoryId)
        ? current.filter((id) => id !== subcategoryId)
        : [...current, subcategoryId];
      return { ...prev, subcategories: next, page: 1 };
    });
  }

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    filters,
    search,
    topBanner,
    setTopBanner,
    expandedCategory,
    setExpandedCategory,
    selectCategory,
    toggleSubcategory,
    handleSearch: (value: string) => {
      setSearch(value);
      setFilters((prev) => ({ ...prev, search: value, page: 1 }));
    },
    handleCategoryChange: (category: string) => {
      setFilters((prev) => ({ ...prev, category, page: 1 }));
    },
    handlePageChange: (page: number) => {
      setFilters((prev) => ({ ...prev, page }));
    },
    handleSortChange: (sort: string) => {
      setFilters((prev) => ({ ...prev, sort, page: 1 }));
    },
    setFilters,
    refetch: query.refetch,
  };
}
