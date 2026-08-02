import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "[&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out",
    "[&_[data-slot=button-arrow]]:inline-block [&_[data-slot=button-arrow]]:transition-transform",
    "[&_[data-slot=button-arrow]]:duration-300 [&_[data-slot=button-arrow]]:ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /** Solid primary CTA — Hero "Shop Collection", ChooseYourStyle solid */
        cta: "rounded-none bg-primary text-primary-foreground hover:bg-primary/90",
        /** Primary-border CTA on dark media — ChooseYourStyle outline */
        ctaOutline: "rounded-none border border-primary text-white hover:bg-primary/15",
        /** White-border CTA on dark media — Hero "Explore Styles" */
        ctaLight: "rounded-none border border-white/80 text-white hover:bg-white/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
        /** Marketing CTA sizing (uppercase tracking) */
        cta: "px-6 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase sm:text-sm",
        ctaSm: "px-5 py-3 text-xs font-medium tracking-[0.16em] uppercase sm:text-sm",
      },
      /** Icon / arrow hover motion. Default: no movement. */
      iconMotion: {
        still: "",
        left: "hover:[&_svg]:-translate-x-1 hover:[&_[data-slot=button-arrow]]:-translate-x-1",
        right: "hover:[&_svg]:translate-x-1 hover:[&_[data-slot=button-arrow]]:translate-x-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      iconMotion: "still",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconMotion, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconMotion }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
