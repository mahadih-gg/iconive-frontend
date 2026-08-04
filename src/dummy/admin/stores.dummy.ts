// DUMMY_DATA: in-memory admin stores

import { createMemoryStore } from "@/lib/admin/memory-store";
import {
  adminAffiliateApplicationsSeed,
  adminAffiliateProgramsSeed,
  adminBlogSeed,
  adminCategoriesSeed,
  adminCustomersSeed,
  adminCustomizeOrdersSeed,
  adminFaqsSeed,
  adminHeroBannersSeed,
  adminOffersSeed,
  adminOrdersSeed,
  adminProductsSeed,
  adminReviewsSeed,
  adminSettingsSeed,
  adminWholesaleInquiriesSeed,
  adminWholesaleSellersSeed,
} from "@/dummy/admin/seed.dummy";
import type { AdminSettings } from "@/types/admin";

export const heroBannerStore = createMemoryStore(adminHeroBannersSeed);
export const categoryStore = createMemoryStore(adminCategoriesSeed);
export const productStore = createMemoryStore(adminProductsSeed);
export const offerStore = createMemoryStore(adminOffersSeed);
export const orderStore = createMemoryStore(adminOrdersSeed);
export const wholesaleSellerStore = createMemoryStore(adminWholesaleSellersSeed);
export const wholesaleInquiryStore = createMemoryStore(
  adminWholesaleInquiriesSeed,
);
export const customizeOrderStore = createMemoryStore(adminCustomizeOrdersSeed);
export const blogStore = createMemoryStore(adminBlogSeed);
export const affiliateProgramStore = createMemoryStore(
  adminAffiliateProgramsSeed,
);
export const affiliateApplicationStore = createMemoryStore(
  adminAffiliateApplicationsSeed,
);
export const customerStore = createMemoryStore(adminCustomersSeed);
export const faqStore = createMemoryStore(adminFaqsSeed);
export const reviewStore = createMemoryStore(adminReviewsSeed);

let settingsState: AdminSettings = { ...adminSettingsSeed };

export const settingsStore = {
  get(): AdminSettings {
    return {
      ...settingsState,
      socialLinks: settingsState.socialLinks.map((link) => ({ ...link })),
    };
  },
  update(patch: Partial<AdminSettings>): AdminSettings {
    settingsState = {
      ...settingsState,
      ...patch,
      socialLinks: patch.socialLinks
        ? patch.socialLinks.map((link) => ({ ...link }))
        : settingsState.socialLinks.map((link) => ({ ...link })),
    };
    return settingsStore.get();
  },
};
