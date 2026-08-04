"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { CartItem } from "@/types/cart.type";
import { getCartLineKey } from "@/utils/cart-line";

interface CartState {
  items: CartItem[];
  badgeCount: number;
  isHydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (lineKey: string) => void;
  updateQuantity: (lineKey: string, amount: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  setHydrated: (value: boolean) => void;
}

function syncBadge(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

function findLineIndex(items: CartItem[], lineKey: string) {
  return items.findIndex((item) => getCartLineKey(item) === lineKey);
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      immer((set) => ({
        items: [],
        badgeCount: 0,
        isHydrated: false,
        addItem: (item) =>
          set((state) => {
            const key = getCartLineKey(item);
            const idx = findLineIndex(state.items, key);
            if (idx >= 0) {
              state.items[idx].amount += item.amount;
            } else {
              state.items.push(item);
            }
            state.badgeCount = syncBadge(state.items);
          }),
        removeItem: (lineKey) =>
          set((state) => {
            state.items = state.items.filter(
              (item) => getCartLineKey(item) !== lineKey,
            );
            state.badgeCount = syncBadge(state.items);
          }),
        updateQuantity: (lineKey, amount) =>
          set((state) => {
            const item = state.items.find(
              (entry) => getCartLineKey(entry) === lineKey,
            );
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
        setHydrated: (value) =>
          set((state) => {
            state.isHydrated = value;
          }),
      })),
      {
        name: "iconive-cart",
        partialize: (state) => ({
          items: state.items,
          badgeCount: state.badgeCount,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
    { name: "CartStore" },
  ),
);
