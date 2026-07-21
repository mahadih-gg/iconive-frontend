export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  images?: string[];
  image?: string;
  photo?: string;
  category?: string | { _id: string; name: string };
  stock?: number;
  isFeatured?: boolean;
  rating?: number;
  addons?: Array<{ name: string; value: string; price?: number }>;
  [key: string]: unknown;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  [key: string]: unknown;
}

export interface ProductsResponse {
  products?: Product[];
  data?: Product[];
  total?: number;
  page?: number;
  limit?: number;
}
