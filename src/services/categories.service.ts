import { api } from "@/lib/axios";
import type { Category } from "@/types/category.type";

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>("/category/getCategory");
    return Array.isArray(data) ? data : [];
  },
};
