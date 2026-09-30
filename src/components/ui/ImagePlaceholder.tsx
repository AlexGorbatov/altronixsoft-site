import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Path under /public, e.g. "/team/oleksandr.jpg". Omit to show the placeholder. */
  src?: string;
  alt: string;
  initials: string;
  className?: string;
}

/**
 * Drop-in slot for a real photo. Pass `src` and it renders a next/image;
 * until then it shows a neutral monogram tile — never a generated portrait.
 */
export function ImagePlaceholder({ src, alt, initials, className }: ImagePlaceholderProps) {
  const frame = cn(
    "relative size-16 shrink-0 overflow-hidden rounded-[14px] border border-white/[.12]",
    className,
  );

  if (src) {
    return (
      <div className={frame}>
        <Image src={src} alt={alt} fill sizes="64px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} (photo placeholder)`}
      className={cn(
        frame,
        "grid place-items-center bg-[linear-gradient(135deg,rgba(26, 124, 251,.18),rgba(139, 92, 246,.22))]",
      )}
    >
      <span className="font-mono text-sm font-medium tracking-[0.08em] text-[#cfe9ff]">{initials}</span>
    </div>
  );
}
