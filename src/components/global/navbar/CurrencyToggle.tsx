"use client";

import { Globe } from "lucide-react";
import { useId } from "react";

import { Switch } from "@/components/ui/switch";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/utils/cn";

interface CurrencyToggleProps {
  className?: string;
  tone?: "default" | "glass";
}

export function CurrencyToggle({ className, tone = "default" }: CurrencyToggleProps) {
  const { currency, isUsd, setCurrency } = useCurrency();
  const isGlass = tone === "glass";
  const toggleId = useId();

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2 py-1 text-sm rounded",
        isGlass
          ? "rounded-full bg-white/20 text-white/90 backdrop-blur-xl"
          : "bg-muted text-foreground",
        className,
      )}
    >
      {isGlass ? (
        <Globe className="h-3.5 w-3.5 text-white/80" aria-hidden />
      ) : (
        <Switch
          checked={isUsd}
          onCheckedChange={(checked) => setCurrency(checked ? "USD" : "BDT")}
          id={toggleId}
        />
      )}
      {isGlass ? (
        <button
          type="button"
          onClick={() => setCurrency(isUsd ? "BDT" : "USD")}
          className="cursor-pointer tracking-wide text-white/90 hover:text-white"
          aria-label={`Switch currency (current ${currency})`}
        >
          {currency}
        </button>
      ) : (
        <label htmlFor={toggleId} className="cursor-pointer font-medium">
          {currency}
        </label>
      )}
    </div>
  );
}
