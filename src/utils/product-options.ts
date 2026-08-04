import type { Product } from "@/types/product.type";

export const COLOR_OPTIONS = [
  { label: "Jet Black (#1)", src: "/Image/Black/1jetblack.webp" },
  { label: "Darkest Brown (#2)", src: "/Image/Brown/2 DARKEST BROWN.webp" },
  { label: "Medium Brown (#4)", src: "/Image/Brown/4 medium brown.webp" },
  { label: "Platinum Blonde (#613)", src: "/Image/Blonde/613 PLATINUM BLONDE.webp" },
] as const;

export const LENGTH_OPTIONS = ['20"', '24"', '28"', '30"'] as const;
export const DENSITY_OPTIONS = ["180%", "200%", "250%"] as const;
export const SIZE_OPTIONS = ["Small", "Medium", "Large"] as const;

export function getProductImage(product: Product) {
  return String(
    product.photo ??
      product.image ??
      (Array.isArray(product.images) ? product.images[0] : undefined) ??
      "/Image/logo/logo.png",
  );
}

export function getGallery(product: Product) {
  const primary = getProductImage(product);

  const fromImages = Array.isArray(product.images)
    ? product.images.map(String).filter(Boolean)
    : [];

  const extras = COLOR_OPTIONS.map((c) => c.src).filter((src) => src !== primary);
  const unique = Array.from(new Set([primary, ...fromImages, ...extras]));
  return unique.slice(0, 4);
}

export function getCategoryId(product: Product) {
  if (typeof product.category === "string") return product.category;
  if (product.category && typeof product.category === "object") {
    return product.category._id;
  }
  return "";
}

export function getCategoryLabel(product: Product) {
  if (typeof product.category === "string") return "Hair Collection";
  if (
    product.category &&
    typeof product.category === "object" &&
    "name" in product.category
  ) {
    return String(product.category.name);
  }
  return "Hair Collection";
}

export function getDiscountedPrice(product: Product) {
  const price = Number(product.price ?? 0);
  const discount = Number(product.discount ?? 0);
  if (discount <= 0) return price;
  return price - (price * discount) / 100;
}
