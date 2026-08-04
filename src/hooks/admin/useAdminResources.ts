"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createAdminCrudHook } from "@/hooks/admin/createAdminCrudHook";
import {
  adminAffiliateApplicationService,
  adminAffiliateProgramService,
  adminBlogService,
  adminCategoryService,
  adminCustomerService,
  adminCustomizeOrderService,
  adminDashboardService,
  adminFaqService,
  adminHeroBannerService,
  adminOfferService,
  adminOrderService,
  adminProductService,
  adminReviewService,
  adminSettingsService,
  adminWholesaleInquiryService,
  adminWholesaleSellerService,
} from "@/services/admin";
import { adminQueryKeys } from "@/utils/admin-query-keys";
import type { AdminSettings } from "@/types/admin";

export const useAdminHeroBanners = createAdminCrudHook(
  adminHeroBannerService,
  { queryKey: adminQueryKeys.heroBanners.all, resourceName: "Hero banner" },
);

export const useAdminCategories = createAdminCrudHook(adminCategoryService, {
  queryKey: adminQueryKeys.categories.all,
  resourceName: "Category",
});

export const useAdminProducts = createAdminCrudHook(adminProductService, {
  queryKey: adminQueryKeys.products.all,
  resourceName: "Product",
});

export const useAdminOffers = createAdminCrudHook(adminOfferService, {
  queryKey: adminQueryKeys.offers.all,
  resourceName: "Offer",
});

export const useAdminOrders = createAdminCrudHook(adminOrderService, {
  queryKey: adminQueryKeys.orders.all,
  resourceName: "Order",
});

export const useAdminWholesaleSellers = createAdminCrudHook(
  adminWholesaleSellerService,
  {
    queryKey: adminQueryKeys.wholesaleSellers.all,
    resourceName: "Wholeseller",
  },
);

export const useAdminWholesaleInquiries = createAdminCrudHook(
  adminWholesaleInquiryService,
  {
    queryKey: adminQueryKeys.wholesaleInquiries.all,
    resourceName: "Inquiry",
  },
);

export const useAdminCustomizeOrders = createAdminCrudHook(
  adminCustomizeOrderService,
  {
    queryKey: adminQueryKeys.customizeOrders.all,
    resourceName: "Customize order",
  },
);

export const useAdminBlog = createAdminCrudHook(adminBlogService, {
  queryKey: adminQueryKeys.blog.all,
  resourceName: "Blog post",
});

export const useAdminAffiliatePrograms = createAdminCrudHook(
  adminAffiliateProgramService,
  {
    queryKey: adminQueryKeys.affiliates.programs,
    resourceName: "Program",
  },
);

export const useAdminAffiliateApplications = createAdminCrudHook(
  adminAffiliateApplicationService,
  {
    queryKey: adminQueryKeys.affiliates.applications,
    resourceName: "Application",
  },
);

export const useAdminCustomers = createAdminCrudHook(adminCustomerService, {
  queryKey: adminQueryKeys.customers.all,
  resourceName: "Customer",
});

export const useAdminFaqs = createAdminCrudHook(adminFaqService, {
  queryKey: adminQueryKeys.faqs.all,
  resourceName: "FAQ",
});

export const useAdminReviews = createAdminCrudHook(adminReviewService, {
  queryKey: adminQueryKeys.reviews.all,
  resourceName: "Review",
});

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminQueryKeys.dashboard,
    queryFn: adminDashboardService.getStats,
  });
}

export function useAdminSettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: adminQueryKeys.settings.all,
    queryFn: adminSettingsService.get,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<AdminSettings>) =>
      adminSettingsService.update(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: adminQueryKeys.settings.all,
      });
      toast.success("Settings saved");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to save settings");
    },
  });

  return {
    settings: query.data,
    isLoading: query.isLoading,
    update: updateMutation.mutateAsync,
    isSaving: updateMutation.isPending,
  };
}
