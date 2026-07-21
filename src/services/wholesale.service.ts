import { api } from "@/lib/axios";
import type { Product } from "@/types/product.type";

export const wholesaleService = {
  getAllProducts: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/wholesale/getAllProducts");
    return Array.isArray(data) ? data : [];
  },
  submitInquiry: async (payload: Record<string, unknown>): Promise<unknown> => {
    const { data } = await api.post("/wholesale/inquiry", payload);
    return data;
  },
};
