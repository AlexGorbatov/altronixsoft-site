import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-[min(calc(100%-32px),var(--container-max))] sm:w-[min(calc(100%-48px),var(--container-max))]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
