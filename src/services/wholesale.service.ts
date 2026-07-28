import {
  submitInquiryDummy,
  wholesaleProductsDummy,
} from "@/dummy/wholesale.dummy";
import { api } from "@/lib/axios";
import { withDummyData } from "@/lib/dummyData";
import type { Product } from "@/types/product.type";

export const wholesaleService = {
  getAllProducts: async (): Promise<Product[]> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(wholesaleProductsDummy, async () => {
      const { data } = await api.get<Product[]>("/wholesale/getAllProducts");
      return Array.isArray(data) ? data : [];
    });
  },
  submitInquiry: async (payload: Record<string, unknown>): Promise<unknown> => {
    // DUMMY_DATA: remove when backend is ready
    return withDummyData(
      () => submitInquiryDummy(payload),
      async () => {
        const { data } = await api.post("/wholesale/inquiry", payload);
        return data;
      },
    );
  },
};
