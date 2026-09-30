import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary";
}

/** Link styled as a button. All site CTAs are links (mailto / anchors) — no backend yet. */
export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <a className={cn("btn", variant === "primary" ? "btn-primary" : "btn-secondary", className)} {...props}>
      {children}
    </a>
  );
}
