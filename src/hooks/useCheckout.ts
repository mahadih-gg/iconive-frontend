"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import env from "@/lib/env";
import type { CheckoutFormValues } from "@/lib/validations/checkoutSchema";
import { ordersService } from "@/services/orders.service";
import { useCartStore } from "@/store/cart.store";
import { useUiStore } from "@/store/ui.store";
import { saveLastOrder } from "@/utils/last-order";

interface CheckoutPayload extends CheckoutFormValues {
  state?: string;
  altPhone?: string;
  agreeRefund: boolean;
}

export interface CheckoutResult {
  orderId: string;
  paymentUrl?: string;
  name: string;
  email: string;
  phone?: string;
  total: number;
  deliveryCharge: number;
  itemCount: number;
}

export function useCheckout() {
  const clearCart = useCartStore((s) => s.clearCart);
  const currency = useUiStore((s) => s.currency);

  return useMutation({
    mutationFn: async (form: CheckoutPayload): Promise<CheckoutResult> => {
      const items = useCartStore.getState().items;
      if (items.length === 0) throw new Error("Cart is empty");
      if (!form.agreeRefund)
        throw new Error("Please agree to the return policy");

      const productTotal = items.reduce(
        (sum, item) => sum + item.price * item.amount,
        0,
      );
      const freeThreshold = 250 * env.fxRate;
      const deliveryCharge =
        productTotal > freeThreshold ? 0 : env.deliveryCharge * env.fxRate;
      const itemCount = items.reduce((sum, item) => sum + item.amount, 0);

      const billingInfo = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        altPhone: form.altPhone,
        address: form.address,
        city: form.city,
        country: form.country,
        state: form.state,
        zip: form.zip,
        note: form.note,
      };

      localStorage.setItem("billingInfo", JSON.stringify(billingInfo));

      const order = await ordersService.create({
        billingInfo,
        cartItems: items,
        currency,
        deliveryCharge,
      });

      const payment = await ordersService.createPayment(order._id);

      return {
        orderId: order._id,
        paymentUrl: payment.payment_url,
        name: form.name,
        email: form.email,
        phone: form.phone,
        total: productTotal + deliveryCharge,
        deliveryCharge,
        itemCount,
      };
    },
    onSuccess: (result) => {
      saveLastOrder({
        orderId: result.orderId,
        name: result.name,
        email: result.email,
        phone: result.phone,
        total: result.total,
        deliveryCharge: result.deliveryCharge,
        itemCount: result.itemCount,
        paymentUrl: result.paymentUrl,
        createdAt: new Date().toISOString(),
      });
      clearCart();
      localStorage.removeItem("billingInfo");
      localStorage.removeItem("cart");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Checkout failed");
    },
  });
}
