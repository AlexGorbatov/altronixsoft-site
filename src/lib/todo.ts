/**
 * Content that the owner still has to provide is written as `TODO(owner): ...` in `src/data/*`.
 * Components render a value only when `filled()` says it is real, so placeholders never reach production.
 * In development they stay visible through `todoLabel()` so nothing gets forgotten.
 * List everything still open: `grep -rn "TODO(owner)" src`.
 */
export const TODO_MARKER = "TODO(owner)";

/** True when the value is real content, not empty and not a `TODO(owner)` placeholder. */
export function filled(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && !value.includes(TODO_MARKER);
}

/** Keep only the real values of a list. */
export function filledItems(values: readonly string[] | undefined): string[] {
  return (values ?? []).filter(filled);
}

/** Development-only: the placeholder text to show in the UI, or null in production. */
export function todoLabel(value: string | null | undefined): string | null {
  if (process.env.NODE_ENV === "production") return null;
  return typeof value === "string" && value.includes(TODO_MARKER) ? value : null;
}
