/** String literals widen to `string`, so a translation can hold other text than the English source. */
export type Widen<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { -readonly [K in keyof T]: Widen<T[K]> }
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

/** A translation only has to hold the keys it changes; everything else falls back to the source. */
export type Overlay<T> = T extends readonly (infer U)[]
  ? U extends string
    ? string[]
    : Overlay<U>[]
  : T extends object
    ? { [K in keyof T]?: Overlay<T[K]> }
    : T extends string
      ? string
      : T;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Lay a translation over the English source.
 * - objects merge key by key, so a missing key keeps its English text;
 * - arrays of objects merge by position (the translation lists the same items in the same order);
 * - arrays of strings (capabilities, bullet lists, paragraphs) merge by position too.
 */
export function overlay<T>(base: T, translation: unknown): T {
  if (translation === undefined || translation === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(translation)) return base;
    if (base.every((item) => typeof item === "string")) {
      // Strings merge by position, so an item the translation leaves out (e.g. an open TODO) stays as it is.
      const length = Math.max(base.length, translation.length);
      return Array.from({ length }, (_, i) => translation[i] ?? base[i]) as T;
    }
    return base.map((item, i) => overlay(item, translation[i])) as T;
  }
  if (isPlainObject(base) && isPlainObject(translation)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(translation)) out[key] = overlay(base[key], translation[key]);
    return out as T;
  }
  return translation as T;
}
