"use client";

import { Switch } from "@/components/ui/switch";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/utils/cn";

interface CurrencyToggleProps {
  className?: string;
}

export function CurrencyToggle({ className }: CurrencyToggleProps) {
  const { currency, isUsd, setCurrency } = useCurrency();

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded bg-muted px-3 py-1 text-sm",
        className,
      )}
    >
      <Switch
        checked={isUsd}
        onCheckedChange={(checked) => setCurrency(checked ? "USD" : "BDT")}
        id="currency-toggle"
      />
      <label htmlFor="currency-toggle" className="cursor-pointer font-medium">
        {currency}
      </label>
    </div>
  );
}
