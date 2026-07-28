import { categoriesDummy } from "@/dummy/categories.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";
import type { Category } from "@/types/category.type";

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(categoriesDummy, async () => {
      const { data } = await api.get<Category[]>("/category/getCategory");
      return Array.isArray(data) ? data : [];
    });
  },
};
