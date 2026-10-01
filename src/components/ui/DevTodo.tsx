import { todoLabel } from "@/lib/todo";
import { cn } from "@/lib/utils";

/** Development-only reminder for a value that is still `TODO(owner)`. Renders nothing in production. */
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
      {note}
    </span>
  );
}
