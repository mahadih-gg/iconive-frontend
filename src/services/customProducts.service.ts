import { createCustomProductDummy } from "@/dummy/customProducts.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";

export const customProductsService = {
  create: async (payload: Record<string, unknown> | FormData): Promise<unknown> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => createCustomProductDummy(payload),
      async () => {
        const { data } = await api.post("/customProducts", payload);
        return data;
      },
    );
  },
};
