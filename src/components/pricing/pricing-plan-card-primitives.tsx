import React from "react";
import { cn } from "@/lib/utils";

/** Glas-/Preiskarten-Primitives – Farben an #pakete-preise (dunkle Karten) angepasst, ohne shadcn-Theme. */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative w-full max-w-xs rounded-xl border border-white/12 bg-[rgb(14,22,30)]/95 p-1.5 shadow-xl backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

function Header({
  className,
  children,
  glassEffect = true,
  ...props
}: React.ComponentProps<"div"> & {
  glassEffect?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative mb-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4",
        className,
      )}
      {...props}
    >
      {glassEffect && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0) 100%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

function Plan({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative flex items-center justify-between", className)}
      {...props}
    />
  );
}

function Description({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("relative text-xs text-white/65", className)} {...props} />
  );
}

function PlanName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-2 text-sm font-medium text-white/65 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "relative rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/85",
        className,
      )}
      {...props}
    />
  );
}

function Price({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative mb-3 flex items-end gap-1", className)} {...props} />
  );
}

function MainPrice({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("text-3xl font-extrabold tracking-tight text-white", className)}
      {...props}
    />
  );
}

function Period({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("pb-1 text-sm text-white/80", className)} {...props} />
  );
}

function OriginalPrice({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("text-lg text-white/50 line-through", className)}
      {...props}
    />
  );
}

function Body({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-6 p-3", className)} {...props} />;
}

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("space-y-3", className)} {...props} />;
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("flex items-start gap-3 text-sm text-white/65", className)}
      {...props}
    />
  );
}

function Separator({
  children = "Im Paket",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-3 text-sm text-white/55", className)}
      {...props}
    >
      <span className="h-px flex-1 bg-white/25" />
      <span className="shrink-0 text-white/55">{children}</span>
      <span className="h-px flex-1 bg-white/25" />
    </div>
  );
}

export {
  Card,
  Header,
  Description,
  Plan,
  PlanName,
  Badge,
  Price,
  MainPrice,
  Period,
  OriginalPrice,
  Body,
  List,
  ListItem,
  Separator,
};
