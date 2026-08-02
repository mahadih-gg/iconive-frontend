import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface TrustMarkerProps {
  icon: LucideIcon | string;
  title: string;
  desc: string;
  className?: string;
  /** `on-dark` for image overlays; `on-light` for cream/light sections */
  variant?: "on-dark" | "on-light";
}

export function TrustMarker({
  icon,
  title,
  desc,
  className,
  variant = "on-dark",
}: TrustMarkerProps) {
  const isOnLight = variant === "on-light";
  const Icon = typeof icon === "string" ? null : icon;

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {typeof icon === "string" ? (
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          className="mt-0.5 size-8 shrink-0 object-contain"
          aria-hidden
        />
      ) : (
        Icon && (
          <Icon
            className="mt-0.5 size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        )
      )}
      <div>
        <p
          className={cn(
            "text-[11px] tracking-[0.12em] uppercase sm:text-xs",
            isOnLight ? "text-primary" : "text-white"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "mt-0.5 text-[11px] sm:text-xs",
            isOnLight ? "text-muted-foreground" : "text-white/70"
          )}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
