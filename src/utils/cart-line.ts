import type { CartAddon, CartItem } from "@/types/cart.type";

export function getCartColorLabel(
  color: CartItem["color"],
): string | undefined {
  if (typeof color === "string" && color.trim()) return color;
  if (color && typeof color === "object") {
    const record = color as Record<string, unknown>;
    if (typeof record.label === "string") return record.label;
    if (typeof record.name === "string") return record.name;
    if (typeof record.value === "string") return record.value;
  }
  return undefined;
}

export function getCartSizeLabel(item: CartItem): string | undefined {
  if (typeof item.size === "string" && item.size.trim()) return item.size;

  const sizeAddon = (item.addons ?? []).find((addon) => {
    const name = addon.name?.toLowerCase() ?? "";
    return (
      name === "size" ||
      name === "cap size" ||
      name.includes("cap size") ||
      name.includes("circumference")
    );
  });

  return sizeAddon?.value ? String(sizeAddon.value) : undefined;
}

export function getCartLineKey(
  item: Pick<
    CartItem,
    "product" | "color" | "length" | "density" | "size" | "addons"
  >,
): string {
  const color = getCartColorLabel(item.color) ?? "";
  const size =
    (typeof item.size === "string" && item.size.trim()
      ? item.size
      : undefined) ??
    (item.addons ?? []).find((addon) =>
      addon.name?.toLowerCase().includes("size"),
    )?.value ??
    "";
  const addonsKey = (item.addons ?? [])
    .filter((addon) => !addon.name?.toLowerCase().includes("size"))
    .map((addon) => `${addon.name}:${addon.value}`)
    .sort()
    .join("|");

  return [
    item.product,
    color,
    item.length ?? "",
    item.density ?? "",
    size,
    addonsKey,
  ].join("::");
}

export function getCartVariantRows(item: CartItem): Array<{
  label: string;
  value: string;
}> {
  const rows: Array<{ label: string; value: string }> = [];
  const color = getCartColorLabel(item.color);
  const size = getCartSizeLabel(item);

  if (color) rows.push({ label: "Color", value: color });
  if (item.length) rows.push({ label: "Length", value: item.length });
  if (item.density) rows.push({ label: "Density", value: item.density });
  if (size) rows.push({ label: "Size", value: size });

  const addons = (item.addons ?? []) as CartAddon[];
  for (const addon of addons) {
    if (!addon?.name || !addon?.value) continue;
    const name = addon.name.toLowerCase();
    if (
      name === "size" ||
      name === "cap size" ||
      name.includes("cap size") ||
      name.includes("circumference")
    ) {
      continue;
    }
    rows.push({ label: addon.name, value: String(addon.value) });
  }

  return rows;
}
