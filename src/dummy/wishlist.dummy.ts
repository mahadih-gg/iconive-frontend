// DUMMY_DATA: remove when backend is ready
// Maps to wishlist GET/add/remove — in-memory Set for session mutations

import type { Product } from "@/types/product.type";

import { DUMMY_IDS } from "./_ids.dummy";
import { getProductByIdDummy, productsDummy } from "./products.dummy";

const wishlistIds = new Set<string>([DUMMY_IDS.product1, DUMMY_IDS.product6]);

export function getWishlistProductsDummy(): Product[] {
  return productsDummy.filter((p) => wishlistIds.has(p._id));
}

export function getWishlistProductDummy(id: string): Product | null {
  return wishlistIds.has(id) ? getProductByIdDummy(id) : null;
}

export function addWishlistProductDummy(productId: string): void {
  wishlistIds.add(productId);
}

export function removeWishlistProductDummy(productId: string): void {
  wishlistIds.delete(productId);
}
