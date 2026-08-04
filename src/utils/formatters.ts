import env from "@/lib/env";

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function formatAdminDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function convertForDisplay(currency: string, amount: number): string {
  if (currency === "USD") {
    const converted = amount / env.fxRate;
    return converted.toFixed(2);
  }
  return amount.toFixed(2);
}
