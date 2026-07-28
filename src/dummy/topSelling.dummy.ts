// DUMMY_DATA: remove when backend is ready
// Maps to GET /filterProducts/mostSold

import type { Product } from "@/types/product.type";

import { productsDummy } from "./products.dummy";

export const topSellingDummy: Product[] = [...productsDummy]
  .sort((a, b) => Number(b.sold ?? 0) - Number(a.sold ?? 0))
  .slice(0, 4);
