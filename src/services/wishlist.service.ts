import { api } from "@/lib/axios";
import type { Product } from "@/types/product.type";

export const wishlistService = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/wishlist/getProducts");
    return Array.isArray(data) ? data : [];
  },
  getProduct: async (id: string): Promise<Product | null> => {
    const { data } = await api.get<Product>(`/wishlist/getProduct/${id}`);
    return data ?? null;
  },
  addProduct: async (productId: string): Promise<void> => {
    await api.post("/wishlist/addProduct", { product: productId });
  },
  removeProduct: async (productId: string): Promise<void> => {
    await api.delete(`wishlist/removeProduct/${productId}`);
  },
};
