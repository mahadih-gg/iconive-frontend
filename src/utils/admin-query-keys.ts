export const adminQueryKeys = {
  dashboard: ["admin", "dashboard"] as const,
  heroBanners: {
    all: ["admin", "hero-banners"] as const,
  },
  categories: {
    all: ["admin", "categories"] as const,
  },
  products: {
    all: ["admin", "products"] as const,
    list: (filters: Record<string, unknown>) =>
      ["admin", "products", "list", filters] as const,
  },
  offers: {
    all: ["admin", "offers"] as const,
  },
  orders: {
    all: ["admin", "orders"] as const,
  },
  wholesaleSellers: {
    all: ["admin", "wholesale-sellers"] as const,
  },
  wholesaleInquiries: {
    all: ["admin", "wholesale-inquiries"] as const,
  },
  customizeOrders: {
    all: ["admin", "customize-orders"] as const,
  },
  blog: {
    all: ["admin", "blog"] as const,
  },
  affiliates: {
    programs: ["admin", "affiliate-programs"] as const,
    applications: ["admin", "affiliate-applications"] as const,
  },
  customers: {
    all: ["admin", "customers"] as const,
  },
  faqs: {
    all: ["admin", "faqs"] as const,
  },
  reviews: {
    all: ["admin", "reviews"] as const,
  },
  settings: {
    all: ["admin", "settings"] as const,
  },
} as const;
