import Image from "next/image";
import { filled } from "@/lib/todo";
import { cn } from "@/lib/utils";

interface AvatarProps {
  /** Path under /public. While it is empty or a placeholder, a monogram is shown instead. */
  src?: string;
  alt: string;
  initials: string;
  className?: string;
}

/** Round portrait with a brand-gradient monogram fallback. */
export function Avatar({ src, alt, initials, className }: AvatarProps) {
  if (filled(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={96}
        height={96}
        className={cn("size-24 shrink-0 rounded-full border border-white/15 object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "grid size-24 shrink-0 place-items-center rounded-full border border-white/15 bg-[linear-gradient(135deg,#1c3a78,#4b36fa)] text-[26px] font-extrabold tracking-[0.04em] text-white",
        className,
      )}
    >
      <span aria-hidden="true">{initials}</span>
    </div>
  );
}
