"use client";

import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";

import { cartService } from "@/services/cart.service";
import { useCartStore } from "@/store/cart.store";
import { useUiStore } from "@/store/ui.store";
import type { CartItem } from "@/types/cart.type";

export function useCart() {
  const { items, badgeCount, addItem, removeItem, updateQuantity, clearCart } =
    useCartStore(
      useShallow((s) => ({
        items: s.items,
        badgeCount: s.badgeCount,
        addItem: s.addItem,
        removeItem: s.removeItem,
        updateQuantity: s.updateQuantity,
        clearCart: s.clearCart,
      })),
    );

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
    total,
    cartDrawerOpen,
    openCartDrawer,
    closeCartDrawer,
    addToCart: (item: CartItem) => {
      addItem(item);
      toast.success("Added to cart");
      openCartDrawer();
    },
    removeFromCart: (productId: string) => {
      removeItem(productId);
      toast.success("Removed from cart");
    },
    updateQuantity,
    clearCart,
  };
}
