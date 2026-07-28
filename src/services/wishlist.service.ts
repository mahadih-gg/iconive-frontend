import {
  addWishlistProductDummy,
  getWishlistProductDummy,
  getWishlistProductsDummy,
  removeWishlistProductDummy,
} from "@/dummy/wishlist.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";
import type { Product } from "@/types/product.type";

export const wishlistService = {
  getProducts: async (): Promise<Product[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(getWishlistProductsDummy, async () => {
      const { data } = await api.get<Product[]>("/wishlist/getProducts");
      return Array.isArray(data) ? data : [];
    });
  },
  getProduct: async (id: string): Promise<Product | null> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => getWishlistProductDummy(id),
      async () => {
        const { data } = await api.get<Product>(`/wishlist/getProduct/${id}`);
        return data ?? null;
      },
    );
  },
  addProduct: async (productId: string): Promise<void> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => {
        addWishlistProductDummy(productId);
      },
      async () => {
        await api.post("/wishlist/addProduct", { product: productId });
      },
    );
  },
  removeProduct: async (productId: string): Promise<void> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => {
        removeWishlistProductDummy(productId);
      },
      async () => {
        await api.delete(`wishlist/removeProduct/${productId}`);
      },
    );
  },
};
