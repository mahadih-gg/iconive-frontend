// DUMMY_DATA: remove when backend is ready
// Maps to GET /wholesale/getAllProducts and inquiry submit

import type { Product } from "@/types/product.type";

import { DUMMY_IDS } from "./_ids.dummy";
import { productsDummy } from "./products.dummy";

const WHOLESALE_PHOTOS = [
  "/Image/wholesale/section1/Group (1).png",
  "/Image/wholesale/section1/Group (2).png",
  "/Image/wholesale/section1/Group (3).png",
  "/Image/wholesale/section2/Group (1).png",
  "/Image/wholesale/section2/Group (2).png",
  "/Image/custom/wigs4.jpg",
] as const;

export const wholesaleProductsDummy: Product[] = productsDummy.slice(0, 6).map((p, i) => ({
  ...p,
  name: `Wholesale ${p.name}`,
  price: Math.round(Number(p.price) * 0.75),
  photo: WHOLESALE_PHOTOS[i] ?? p.photo,
  category: p.category ?? DUMMY_IDS.categoryLadies,
}));

export function submitInquiryDummy(
  payload: Record<string, unknown>,
): { status: string; message: string; data: Record<string, unknown> } {
  return {
    status: "success",
    message: "Wholesale inquiry submitted (dummy)",
    data: { newRequest: { ...payload, status: "Pending" } },
  };
}
