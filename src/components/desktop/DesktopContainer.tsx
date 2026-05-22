import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type DesktopContainerProps = {
  children: ReactNode;
  className?: string;
};

export function DesktopContainer({ children, className }: DesktopContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-12", className)}>{children}</div>;
}
