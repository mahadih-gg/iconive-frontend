import {
  affiliateApplicationStore,
  affiliateProgramStore,
  blogStore,
  categoryStore,
  customerStore,
  customizeOrderStore,
  faqStore,
  heroBannerStore,
  offerStore,
  orderStore,
  productStore,
  reviewStore,
  settingsStore,
  wholesaleInquiryStore,
  wholesaleSellerStore,
} from "@/dummy/admin/stores.dummy";
import { delay } from "@/lib/admin/memory-store";
import { createCrudService } from "@/services/admin/crud.service";
import type { AdminDashboardStats, AdminSettings } from "@/types/admin";

export const adminHeroBannerService = createCrudService(heroBannerStore);
export const adminCategoryService = createCrudService(categoryStore);
export const adminProductService = createCrudService(productStore);
export const adminOfferService = createCrudService(offerStore);
export const adminOrderService = createCrudService(orderStore);
export const adminWholesaleSellerService = createCrudService(
  wholesaleSellerStore,
);
export const adminWholesaleInquiryService = createCrudService(
  wholesaleInquiryStore,
);
export const adminCustomizeOrderService = createCrudService(customizeOrderStore);
export const adminBlogService = createCrudService(blogStore);
export const adminAffiliateProgramService = createCrudService(
  affiliateProgramStore,
  false,
);
export const adminAffiliateApplicationService = createCrudService(
  affiliateApplicationStore,
);
export const adminCustomerService = createCrudService(customerStore);
export const adminFaqService = createCrudService(faqStore, false);
export const adminReviewService = createCrudService(reviewStore);

export const adminSettingsService = {
  async get(): Promise<AdminSettings> {
    await delay();
    return settingsStore.get();
  },
  async update(data: Partial<AdminSettings>): Promise<AdminSettings> {
    await delay();
    return settingsStore.update(data);
  },
};

export const adminDashboardService = {
  async getStats(): Promise<AdminDashboardStats> {
    await delay();
    const orders = orderStore.list();
    const products = productStore.list();
    const totalSales = orders.reduce((sum, order) => sum + (order.total ?? 0), 0);

    return {
      totalSales,
      ordersToday: 2,
      ordersWeek: orders.length,
      pendingOrders: orders.filter((o) =>
        ["payment_pending", "order_received", "processing"].includes(o.status),
      ).length,
      productsInStock: products.filter((p) => p.stock > 0).length,
      lowStock: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
      wholesaleInquiries: wholesaleInquiryStore
        .list()
        .filter((i) => i.status === "Pending").length,
      customizeRequests: customizeOrderStore
        .list()
        .filter((c) => c.status === "new" || c.status === "in_progress").length,
      affiliateApplications: affiliateApplicationStore
        .list()
        .filter((a) => a.status === "pending").length,
      newCustomers: customerStore.list().length,
      salesByDay: [
        { day: "Mon", sales: 420 },
        { day: "Tue", sales: 380 },
        { day: "Wed", sales: 510 },
        { day: "Thu", sales: 460 },
        { day: "Fri", sales: 620 },
        { day: "Sat", sales: 740 },
        { day: "Sun", sales: 390 },
      ],
      recentOrders: orders.slice(0, 5),
      topProducts: products.slice(0, 4).map((product, index) => ({
        name: product.name,
        sold: 40 - index * 7,
        revenue: product.price * (40 - index * 7),
      })),
    };
  },
};
