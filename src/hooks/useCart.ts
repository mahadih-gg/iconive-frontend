"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";

import { cartService } from "@/services/cart.service";
import { useCartStore } from "@/store/cart.store";
import { useUiStore } from "@/store/ui.store";
import type { CartItem } from "@/types/cart.type";

export function useCart() {
  const {
    items,
    badgeCount,
    isHydrated,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setHydrated,
  } = useCartStore(
      useShallow((s) => ({
        items: s.items,
        badgeCount: s.badgeCount,
        isHydrated: s.isHydrated,
        addItem: s.addItem,
        removeItem: s.removeItem,
        updateQuantity: s.updateQuantity,
        clearCart: s.clearCart,
        setHydrated: s.setHydrated,
      })),
    );

  useEffect(() => {
    if (useCartStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useCartStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
  }, [setHydrated]);

  const { openCartDrawer, closeCartDrawer, cartDrawerOpen } = useUiStore(
    useShallow((s) => ({
      openCartDrawer: s.openCartDrawer,
      closeCartDrawer: s.closeCartDrawer,
      cartDrawerOpen: s.cartDrawerOpen,
    })),
  );

  const total = cartService.getLocalTotal(items);

  return {
    items,
    badgeCount,
    isHydrated,
    total,
    cartDrawerOpen,
    openCartDrawer,
    closeCartDrawer,
    addToCart: (item: CartItem) => {
      addItem(item);
      toast.success("Added to cart");
      openCartDrawer();
    },
    removeFromCart: (lineKey: string) => {
      removeItem(lineKey);
      toast.success("Removed from cart");
    },
    updateQuantity,
    clearCart,
  };
}
