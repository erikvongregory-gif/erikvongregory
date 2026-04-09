"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface GlowMenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
  /** Volle Tailwind-Klassen für Icon-Hover (z. B. group-hover:text-orange-500) */
  iconHoverClass: string;
}

interface MenuBarProps extends Omit<HTMLMotionProps<"nav">, "children"> {
  items: GlowMenuItem[];
  /** Links in derselben Leiste (z. B. Logo), teilt sich Hintergrund mit den Items */
  logo?: React.ReactNode;
  /** Rechts neben den Items (z. B. Mobile-Hamburger) */
  endSlot?: React.ReactNode;
  activeItem?: string;
  onItemClick?: (label: string) => void;
  /** Desktop-Header hell (z. B. .desktop-light-theme), sonsten dunkel */
  headerLight?: boolean;
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const bezierEase = [0.4, 0, 0.2, 1] as const;

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: bezierEase },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: bezierEase,
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(
  (
    {
      className,
      items,
      logo,
      endSlot,
      activeItem,
      onItemClick,
      headerLight = false,
      ...props
    },
    ref,
  ) => {
    const isDarkTheme = !headerLight;

    const shell = headerLight
      ? "border border-white/35 bg-white/45 shadow-sm shadow-black/10 backdrop-blur-md backdrop-saturate-150 md:border-zinc-300/55 md:bg-white/42 md:backdrop-blur-lg md:backdrop-saturate-150"
      : "border-white/15 bg-[#0a0f14] shadow-lg shadow-black/40";

    const fg = headerLight ? "text-neutral-800" : "text-white";
    const muted = headerLight ? "text-neutral-500" : "text-white/65";
    const iconMuted = headerLight ? "text-neutral-700" : "text-white/85";
    const groupHoverFg = headerLight
      ? "group-hover:text-neutral-800"
      : "group-hover:text-white";

    const navGlowBg = isDarkTheme
      ? "radial-gradient(circle at 50% 50%, transparent 0%, rgba(96, 165, 250, 0.28) 32%, rgba(192, 132, 252, 0.28) 58%, rgba(248, 113, 113, 0.22) 88%, transparent 100%)"
      : "radial-gradient(circle at 50% 50%, transparent 0%, rgba(59, 130, 246, 0.18) 32%, rgba(168, 85, 247, 0.16) 58%, rgba(248, 113, 113, 0.12) 88%, transparent 100%)";

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border p-2",
          shell,
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute -inset-2 z-0 rounded-3xl"
          style={{ background: navGlowBg }}
          variants={navGlowVariants}
        />
        <div
          className={cn(
            "relative z-10 flex min-w-0 items-center gap-2 sm:gap-3",
            items.length === 0 && endSlot && "w-full justify-between",
          )}
        >
          {logo ? (
            <div
              className={cn(
                "shrink-0 pr-2",
                items.length > 0 &&
                  cn(
                    "border-r sm:pr-3",
                    headerLight ? "border-black/10" : "border-white/15",
                  ),
              )}
            >
              {logo}
            </div>
          ) : null}
          {items.length > 0 ? (
            <ul className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;

            return (
              <motion.li key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => onItemClick?.(item.label)}
                  className="block w-full"
                >
                  <motion.div
                    className="group relative block overflow-visible rounded-xl"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-0"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "relative z-10 flex items-center gap-2 rounded-xl bg-transparent px-3 py-2 transition-colors sm:px-4",
                        isActive ? fg : cn(muted, groupHoverFg),
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : iconMuted,
                          !isActive && item.iconHoverClass,
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                      </span>
                      <span className="whitespace-nowrap text-xs font-medium sm:text-[13px]">
                        {item.label}
                      </span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "absolute inset-0 z-10 flex items-center gap-2 rounded-xl bg-transparent px-3 py-2 transition-colors sm:px-4",
                        isActive ? fg : cn(muted, groupHoverFg),
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : iconMuted,
                          !isActive && item.iconHoverClass,
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                      </span>
                      <span className="whitespace-nowrap text-xs font-medium sm:text-[13px]">
                        {item.label}
                      </span>
                    </motion.div>
                  </motion.div>
                </button>
              </motion.li>
            );
          })}
            </ul>
          ) : null}
          {endSlot ? (
            <div className="flex shrink-0 items-center justify-end">{endSlot}</div>
          ) : null}
        </div>
      </motion.nav>
    );
  },
);

MenuBar.displayName = "MenuBar";
