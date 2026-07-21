"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type CurrencyCode = "USD" | "BDT";

interface UiState {
  currency: CurrencyCode;
  cartDrawerOpen: boolean;
  mobileMenuOpen: boolean;
  setCurrency: (currency: CurrencyCode) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      immer((set) => ({
        currency: "USD",
        cartDrawerOpen: false,
        mobileMenuOpen: false,
        setCurrency: (currency) =>
          set((state) => {
            state.currency = currency;
            if (typeof window !== "undefined") {
              window.localStorage.setItem("currency", currency);
            }
          }),
        openCartDrawer: () =>
          set((state) => {
            state.cartDrawerOpen = true;
          }),
        closeCartDrawer: () =>
          set((state) => {
            state.cartDrawerOpen = false;
          }),
        toggleCartDrawer: () =>
          set((state) => {
            state.cartDrawerOpen = !state.cartDrawerOpen;
          }),
        openMobileMenu: () =>
          set((state) => {
            state.mobileMenuOpen = true;
          }),
        closeMobileMenu: () =>
          set((state) => {
            state.mobileMenuOpen = false;
          }),
        toggleMobileMenu: () =>
          set((state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
          }),
      })),
      {
        name: "iconive-ui",
        partialize: (state) => ({ currency: state.currency }),
      },
    ),
    { name: "UiStore" },
  ),
);
