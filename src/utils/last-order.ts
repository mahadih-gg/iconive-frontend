export const LAST_ORDER_STORAGE_KEY = "iconive-last-order";

export interface LastOrderSummary {
  orderId: string;
  name: string;
  email: string;
  phone?: string;
  total: number;
  deliveryCharge: number;
  itemCount: number;
  paymentUrl?: string;
  createdAt: string;
}

export function saveLastOrder(summary: LastOrderSummary) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(summary));
}

export function readLastOrder(): LastOrderSummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastOrderSummary;
  } catch {
    return null;
  }
}

export function clearLastOrder() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(LAST_ORDER_STORAGE_KEY);
}
