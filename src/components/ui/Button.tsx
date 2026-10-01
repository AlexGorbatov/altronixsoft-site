import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary";
}

/** Site-internal targets go through next/link (soft navigation, hash scrolling); everything else is a plain anchor. */
const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

/** Link styled as a button: internal route / anchor, mailto: or an external URL. */
export function Button({ variant = "primary", className, children, href, ...props }: ButtonProps) {
  const classes = cn("btn", variant === "primary" ? "btn-primary" : "btn-secondary", className);

  if (isInternal(href)) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
