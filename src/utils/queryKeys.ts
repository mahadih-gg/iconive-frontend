export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters: Record<string, unknown>) =>
      ["products", "list", filters] as const,
    detail: (id: string) => ["products", "detail", id] as const,
    featured: ["products", "featured"] as const,
    trending: ["products", "trending"] as const,
    topSelling: ["products", "top-selling"] as const,
    offers: ["products", "offers"] as const,
    stock: ["products", "stock"] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  cart: {
    all: ["cart"] as const,
  },
  auth: {
    user: ["auth", "user"] as const,
  },
  wishlist: {
    all: ["wishlist"] as const,
    item: (id: string) => ["wishlist", "item", id] as const,
  },
  orders: {
    all: ["orders"] as const,
    list: ["orders", "list"] as const,
    history: ["orders", "history"] as const,
    cancelled: ["orders", "cancelled"] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
    item: (id: string) => ["orders", "item", id] as const,
  },
  users: {
    me: ["users", "me"] as const,
  },
  wholesale: {
    all: ["wholesale"] as const,
    products: ["wholesale", "products"] as const,
  },
} as const;
