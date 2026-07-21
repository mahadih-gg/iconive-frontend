export const QUERY_KEYS = {
  products: ["products"] as const,
  product: (id: string) => ["products", id] as const,
  categories: ["categories"] as const,
  wishlist: ["wishlist"] as const,
  orders: ["orders"] as const,
  me: ["me"] as const,
  addresses: ["addresses"] as const,
} as const;

export const API_ENDPOINTS = {
  products: "/products",
  product: (id: string) => `/products/${id}`,
  categories: "/category/getCategory",
  authLogin: "/auth/login",
  authSignup: "/auth/signup",
  me: "/users/me",
  addresses: "/addresses",
} as const;

export const ROUTES = {
  home: "/",
  products: "/products",
  product: (id: string) => `/products/${id}`,
  cart: "/cart",
  account: "/account",
  profile: "/profile",
  login: "/login",
  register: "/register",
  checkout: "/checkout",
} as const;
