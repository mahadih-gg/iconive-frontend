"use client";

import { useShallow } from "zustand/react/shallow";

import { useUiStore, type CurrencyCode } from "@/store/ui.store";
import currencyConverter from "@/utils/CurrencyChanger";

export function useCurrency() {
  const { currency, setCurrency } = useUiStore(
    useShallow((s) => ({
      currency: s.currency,
      setCurrency: s.setCurrency,
    })),
  );

  function formatPrice(amount: number): string {
    const converted = currencyConverter(currency, amount);
    if (currency === "USD") return `$${converted}`;
    return `৳${converted}`;
  }

  function convert(amount: number): number | string {
    return currencyConverter(currency, amount);
  }

  function toggleCurrency() {
    setCurrency(currency === "USD" ? "BDT" : "USD");
  }

  return {
    currency: currency as CurrencyCode,
    setCurrency,
    toggleCurrency,
    formatPrice,
    convert,
    isUsd: currency === "USD",
  };
}
