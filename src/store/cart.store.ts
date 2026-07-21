"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { CartItem } from "@/types/cart.type";

interface CartState {
  items: CartItem[];
  badgeCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
}

function syncBadge(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      immer((set) => ({
        items: [],
        badgeCount: 0,
        addItem: (item) =>
          set((state) => {
            const idx = state.items.findIndex(
              (i) => i.product === item.product,
            );
            if (idx >= 0) {
              state.items[idx].amount += item.amount;
            } else {
              state.items.push(item);
            }
            state.badgeCount = syncBadge(state.items);
          }),
        removeItem: (productId) =>
          set((state) => {
            state.items = state.items.filter((i) => i.product !== productId);
            state.badgeCount = syncBadge(state.items);
          }),
        updateQuantity: (productId, amount) =>
          set((state) => {
            const item = state.items.find((i) => i.product === productId);
            if (item) {
              item.amount = Math.max(1, amount);
            }
            state.badgeCount = syncBadge(state.items);
          }),
        clearCart: () =>
          set((state) => {
            state.items = [];
            state.badgeCount = 0;
          }),
        setItems: (items) =>
          set((state) => {
            state.items = items;
            state.badgeCount = syncBadge(items);
          }),
      })),
      {
        name: "iconive-cart",
        partialize: (state) => ({ items: state.items, badgeCount: state.badgeCount }),
      },
    ),
    { name: "CartStore" },
  ),
);
