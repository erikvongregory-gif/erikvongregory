"use client";

import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "neon-button isolate relative group mx-auto border text-center rounded-full transition-transform duration-200 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-orange-500/5 hover:bg-orange-500/0 border-orange-400/25 text-white",
        solid:
          "bg-gradient-to-br from-[#c65a20] to-[#d46830] text-white border-transparent hover:border-white/25 hover:brightness-105 shadow-lg shadow-orange-900/25",
        ghost: "border-transparent bg-transparent hover:border-white/20 hover:bg-white/10 text-white",
      },
      size: {
        default: "px-7 py-2 text-sm",
        sm: "px-4 py-1 text-sm",
        lg: "px-10 py-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href">,
    VariantProps<typeof buttonVariants> {
  neon?: boolean;
  /** Wenn gesetzt, wird ein Anker gerendert (z. B. #contact) */
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, neon = true, size, variant, children, href, type = "button", ...props }, ref) => {
    const classes = cn(
      buttonVariants({ variant, size }),
      "inline-flex items-center justify-center gap-2 font-semibold",
      className
    );

    const lines = (
      <>
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 inset-y-0 mx-auto hidden h-px w-3/4 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100",
            neon && "block"
          )}
          aria-hidden
        />
        {/* display:contents damit justify-between/gap am äußeren Link (z. B. Sticky-CTA) erhalten bleiben */}
        <span className="contents">{children}</span>
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 -bottom-px mx-auto hidden h-px w-3/4 bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-500 ease-in-out group-hover:opacity-30",
            neon && "block"
          )}
          aria-hidden
        />
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {lines}
        </a>
      );
    }

    return (
      <button className={classes} ref={ref as React.Ref<HTMLButtonElement>} type={type} {...props}>
        {lines}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
