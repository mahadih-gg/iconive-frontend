import { api } from "@/lib/axios";
import type { Product, ProductFilters, ProductsResponse } from "@/types/product.type";

export const productsService = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    const { data } = await api.get<Product[] | ProductsResponse>("/products", {
      params: filters,
    });
    if (Array.isArray(data)) return data;
    return data.products ?? data.data ?? [];
  },
  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },
  getTrending: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/filterProducts/newArrivals");
    return Array.isArray(data) ? data : [];
  },
  getTopSelling: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/filterProducts/mostSold");
    return Array.isArray(data) ? data : [];
  },
  getOffers: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/filterProducts/offers");
    return Array.isArray(data) ? data : [];
  },
  getStock: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/filterProducts/stock");
    return Array.isArray(data) ? data : [];
  },
};
