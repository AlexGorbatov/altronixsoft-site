/** A first sentence longer than this is a whole thought already: it is not split from the rest. */
export const LEAD_MAX = 180;

/** The first sentence of a block and the rest, so the point reads first and the detail after it. */
export function splitLead(text: string): [string, string | null] {
  const match = text.match(/^(.{20,}?[.!?])\s+(\S[\s\S]*)$/);
  if (!match || match[1].length > LEAD_MAX) return [text, null];
  return [match[1], match[2]];
}
