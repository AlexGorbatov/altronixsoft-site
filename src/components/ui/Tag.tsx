import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  variant?: "pill" | "chip";
  className?: string;
}

/** Small bordered label. `pill` = capability tag, `chip` = tech marquee item. */
export function Tag({ children, variant = "pill", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block border text-[#c7d0dc]",
        variant === "pill" &&
          "rounded-lg border-white/[.09] bg-white/[.02] px-[10px] py-[7px] text-xs leading-none",
        variant === "chip" &&
          "whitespace-nowrap rounded-full border-line bg-white/[.02] px-[14px] py-[9px] text-xs text-[#aeb9ca]",
        className,
      )}
    >
      {children}
    </span>
  );
}
