import type { OrderItem } from "@/types/order.type";

export interface OrderItemDetailRow {
  label: string;
  value: string;
}

function resolveLabel(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.name === "string" && record.name.trim())
      return record.name.trim();
    if (typeof record.label === "string" && record.label.trim())
      return record.label.trim();
    if (typeof record.value === "string" && record.value.trim())
      return record.value.trim();
  }
  return undefined;
}

function readNestedProduct(item: OrderItem): Record<string, unknown> | null {
  if (item.product && typeof item.product === "object") {
    return item.product as Record<string, unknown>;
  }
  return null;
}

export function getOrderItemCategory(item: OrderItem): string | undefined {
  return (
    resolveLabel(item.categoryName) ??
    resolveLabel(item.category) ??
    resolveLabel(readNestedProduct(item)?.category)
  );
}

export function getOrderItemSubCategory(item: OrderItem): string | undefined {
  return (
    resolveLabel(item.subCategoryName) ??
    resolveLabel(item.subCategory) ??
    resolveLabel(item.subcategory) ??
    resolveLabel(readNestedProduct(item)?.subCategory) ??
    resolveLabel(readNestedProduct(item)?.subcategory)
  );
}

export function getOrderItemColor(item: OrderItem): string | undefined {
  return resolveLabel(item.color);
}

function collectAddons(item: OrderItem): Array<{ name?: string; value?: string }> {
  const raw = item.addons ?? item.addOns;
  if (!Array.isArray(raw)) return [];
  return raw as Array<{ name?: string; value?: string }>;
}

function isSizeAddon(name: string) {
  const normalized = name.toLowerCase();
  return (
    normalized === "size" ||
    normalized === "cap size" ||
    normalized.includes("cap size") ||
    normalized.includes("circumference")
  );
}

export function getOrderItemSize(item: OrderItem): string | undefined {
  if (typeof item.size === "string" && item.size.trim()) return item.size.trim();

  const sizeAddon = collectAddons(item).find((addon) =>
    addon.name ? isSizeAddon(addon.name) : false,
  );
  return sizeAddon?.value ? String(sizeAddon.value) : undefined;
}

/** Variant / option rows (color, length, density, size, addons) — excludes category. */
export function getOrderItemVariantRows(
  item: OrderItem,
): OrderItemDetailRow[] {
  const rows: OrderItemDetailRow[] = [];
  const color = getOrderItemColor(item);
  const size = getOrderItemSize(item);

  if (color) rows.push({ label: "Color", value: color });
  if (typeof item.length === "string" && item.length.trim()) {
    rows.push({ label: "Length", value: item.length.trim() });
  }
  if (typeof item.density === "string" && item.density.trim()) {
    rows.push({ label: "Density", value: item.density.trim() });
  }
  if (size) rows.push({ label: "Size", value: size });

  if (Array.isArray(item.variants)) {
    for (const variant of item.variants) {
      if (!variant || typeof variant !== "object") continue;
      const record = variant as Record<string, unknown>;
      const label = resolveLabel(record.label ?? record.name);
      const value = resolveLabel(record.value);
      if (label && value) rows.push({ label, value });
    }
  }

  for (const addon of collectAddons(item)) {
    if (!addon?.name || !addon?.value) continue;
    if (isSizeAddon(addon.name)) continue;
    rows.push({ label: addon.name, value: String(addon.value) });
  }

  return rows;
}

/** Category + subcategory + variants for order item cards. */
export function getOrderItemDetailRows(
  item: OrderItem,
): OrderItemDetailRow[] {
  const rows: OrderItemDetailRow[] = [];
  const category = getOrderItemCategory(item);
  const subCategory = getOrderItemSubCategory(item);

  if (category) rows.push({ label: "Category", value: category });
  if (subCategory) rows.push({ label: "Subcategory", value: subCategory });
  rows.push(...getOrderItemVariantRows(item));

  return rows;
}
