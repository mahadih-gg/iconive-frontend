import { api } from "@/lib/axios";
import type { CartItem } from "@/types/cart.type";

/** Local cart is Zustand-backed; this service is for any server sync hooks. */
export const cartService = {
  getLocalTotal: (items: CartItem[]): number =>
    items.reduce((sum, item) => sum + item.price * item.amount, 0),
};
