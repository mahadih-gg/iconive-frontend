export interface AdminUser {
  _id: string;
  id?: string;
  email: string;
  name: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

export interface AdminHeroBanner {
  _id: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface AdminCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface AdminProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  images: string[];
  categoryId: string;
  subCategoryId?: string;
  stock: number;
  isFeatured: boolean;
  available: boolean;
  addons: { name: string; value: string; price?: number }[];
  createdAt: string;
}

export interface AdminOffer {
  _id: string;
  title: string;
  productId: string;
  discountPercent: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  bannerImage?: string;
  createdAt: string;
}

export interface AdminOrder {
  _id: string;
  customerName: string;
  customerEmail: string;
  status: string;
  paymentStatus: string;
  trackingStep: string;
  total: number;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  currency: string;
  note?: string;
  orderItems: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  createdAt: string;
}

export interface AdminWholesaleSeller {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface AdminWholesaleInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "Pending" | "Contacted" | "Closed";
  createdAt: string;
}

export interface AdminCustomizeOrder {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  baseMaterial: string;
  hairMaterial?: string;
  hairDirection?: string;
  notes?: string;
  adminNotes?: string;
  status: "new" | "in_progress" | "quoted" | "completed" | "cancelled";
  createdAt: string;
}

export interface AdminBlogPost {
  _id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  body: string[];
  published: boolean;
  createdAt: string;
}

export interface AdminAffiliateProgram {
  _id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

export interface AdminAffiliateApplication {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  program: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface AdminCustomer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isWholeSaler: boolean;
  gender?: string;
  dateOfBirth?: string;
  addressCount: number;
  createdAt: string;
}

export interface AdminFaq {
  _id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

export interface AdminReview {
  _id: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  productId?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface AdminSettings {
  deliveryCharge: number;
  fxRate: number;
  freeShippingThreshold: number;
  contactEmail: string;
  whatsappNumber: string;
  socialLinks: { label: string; href: string }[];
}

export interface AdminDashboardStats {
  totalSales: number;
  ordersToday: number;
  ordersWeek: number;
  pendingOrders: number;
  productsInStock: number;
  lowStock: number;
  wholesaleInquiries: number;
  customizeRequests: number;
  affiliateApplications: number;
  newCustomers: number;
  salesByDay: { day: string; sales: number }[];
  recentOrders: AdminOrder[];
  topProducts: { name: string; sold: number; revenue: number }[];
}
