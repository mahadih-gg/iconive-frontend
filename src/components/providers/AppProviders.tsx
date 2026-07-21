"use client";

import { useEffect, type ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import { CartDrawer } from "@/components/global/cart-drawer";
import { Navbar } from "@/components/global/navbar";
import env from "@/lib/env";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import type { CartItem } from "@/types/cart.type";

function AuthHydrator({ children }: { children: ReactNode }) {
  useEffect(() => {
    useAuthStore.getState().hydrate();

    // One-time migration from legacy localStorage cart key
    try {
      const legacy = window.localStorage.getItem("cart");
      if (!legacy) return;
      const parsed = JSON.parse(legacy) as CartItem[];
      if (!Array.isArray(parsed) || parsed.length === 0) return;

      const current = useCartStore.getState().items;
      if (current.length === 0) {
        useCartStore.getState().setItems(
          parsed.map((item) => ({
            product: item.product,
            name: item.name ?? "Product",
            price: item.price,
            amount: item.amount,
            image: item.image,
            color: item.color,
            addons: item.addons,
          })),
        );
      }
      window.localStorage.removeItem("cart");
    } catch {
      /* ignore migration errors */
    }
  }, []);
  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={env.googleClientId}>
        <HelmetProvider>
          <AuthHydrator>
            <Navbar />
            <CartDrawer />
            {children}
          </AuthHydrator>
        </HelmetProvider>
      </GoogleOAuthProvider>
      <Toaster richColors theme="light" position="top-right" />
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      ) : null}
    </QueryClientProvider>
  );
}
