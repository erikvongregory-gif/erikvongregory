"use client";

import { type HTMLMotionProps, motion, type Variants } from "motion/react";
import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/utils";

type TimelineContentProps = {
  children: ReactNode;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  as?: "div" | "p" | "span" | "article" | "section" | "header";
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "custom">;

export function TimelineContent({
  children,
  animationNum,
  timelineRef: _timelineRef,
  customVariants,
  className,
  as = "div",
  ...props
}: TimelineContentProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      custom={animationNum}
      variants={customVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
