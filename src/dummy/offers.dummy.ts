// DUMMY_DATA: remove when backend is ready
// Maps to GET /filterProducts/offers

import type { Product } from "@/types/product.type";

import { productsDummy } from "./products.dummy";

export const offersDummy: Product[] = productsDummy.filter(
  (p) => Number(p.discount ?? 0) > 0,
);
