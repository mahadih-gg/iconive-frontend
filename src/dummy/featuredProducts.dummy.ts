// DUMMY_DATA: remove when backend is ready
// Maps to GET /filterProducts/newArrivals (trending)

import type { Product } from "@/types/product.type";

import { productsDummy } from "./products.dummy";

export const featuredProductsDummy: Product[] = productsDummy.slice(0, 4);
