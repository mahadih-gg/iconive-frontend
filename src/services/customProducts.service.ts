import { api } from "@/lib/axios";

export const customProductsService = {
  create: async (payload: Record<string, unknown> | FormData): Promise<unknown> => {
    const { data } = await api.post("/customProducts", payload);
    return data;
  },
};
