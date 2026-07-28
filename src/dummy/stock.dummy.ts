// DUMMY_DATA: remove when backend is ready
// Maps to GET /filterProducts/stock

import type { Product } from "@/types/product.type";

import { productsDummy } from "./products.dummy";

export const stockDummy: Product[] = productsDummy.filter(
  (p) => Number(p.quantity ?? 0) > 0,
);
