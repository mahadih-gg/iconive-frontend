import { featuredProductsDummy } from "@/dummy/featuredProducts.dummy";
import { offersDummy } from "@/dummy/offers.dummy";
import {
  getProductByIdDummy,
  getProductsDummy,
} from "@/dummy/products.dummy";
import { stockDummy } from "@/dummy/stock.dummy";
import { topSellingDummy } from "@/dummy/topSelling.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";
import type { Product, ProductFilters, ProductsResponse } from "@/types/product.type";

export const productsService = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => getProductsDummy(filters),
      async () => {
        const { data } = await api.get<Product[] | ProductsResponse>("/products", {
          params: filters,
        });
        if (Array.isArray(data)) return data;
        return data.products ?? data.data ?? [];
      },
    );
  },
  getById: async (id: string): Promise<Product> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => getProductByIdDummy(id),
      async () => {
        const { data } = await api.get<Product>(`/products/${id}`);
        return data;
      },
    );
  },
  getTrending: async (): Promise<Product[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(featuredProductsDummy, async () => {
      const { data } = await api.get<Product[]>("/filterProducts/newArrivals");
      return Array.isArray(data) ? data : [];
    });
  },
  getTopSelling: async (): Promise<Product[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(topSellingDummy, async () => {
      const { data } = await api.get<Product[]>("/filterProducts/mostSold");
      return Array.isArray(data) ? data : [];
    });
  },
  getOffers: async (): Promise<Product[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(offersDummy, async () => {
      const { data } = await api.get<Product[]>("/filterProducts/offers");
      return Array.isArray(data) ? data : [];
    });
  },
  getStock: async (): Promise<Product[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(stockDummy, async () => {
      const { data } = await api.get<Product[]>("/filterProducts/stock");
      return Array.isArray(data) ? data : [];
    });
  },
};
