"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface WaveTextHoverProps {
  text?: string;
  className?: string;
}

/**
 * Wave/Hover effect for hero text (per-character spring on hover).
 * Intended for desktop headline emphasis.
 */
export function WaveTextHover({ text = "Hover me", className = "" }: WaveTextHoverProps) {
  return (
    <motion.span
      className={cn("w-full inline-block cursor-pointer transition-all", className)}
      whileHover="hover"
      initial="initial"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={{
            initial: { y: 0, scale: 1 },
            hover: {
              y: -4,
              scale: 1.2,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: index * 0.03,
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

