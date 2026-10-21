import { todoLabel } from "@/lib/todo";
import { cn } from "@/lib/utils";

/**
 * Development-only reminder for a value that is still `TODO(owner)`. Renders nothing in production.
 * The tag says so on the note itself, so nobody mistakes the yellow box for part of the design.
 */
export function DevTodo({ value, className }: { value: string | null | undefined; className?: string }) {
  const note = todoLabel(value);
  if (!note) return null;
  return (
    <span
      className={cn(
        "inline-block rounded-lg border border-dashed border-[#ffcd80]/60 px-3 py-2 text-caption leading-[1.4] text-[#ffe0b0]",
        className,
      )}
    >
      <span className="mb-1.5 block w-fit rounded bg-[#ffcd80] px-2 py-[2px] font-mono text-caption font-bold tracking-[0.06em] text-[#1a1203] uppercase">
        Dev only — hidden on the live site
      </span>
      {note}
    </span>
  );
}
