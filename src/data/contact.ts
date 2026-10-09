import type { RequestType } from "@/data/site";

export const requestTypes: { value: RequestType; label: string }[] = [
  { value: "technical-review", label: "Platform review" },
  { value: "architecture-checkup", label: "Architecture check-up (free, 30 min)" },
  { value: "project", label: "Fixed-scope project" },
  { value: "proof-of-value", label: "AI proof of value" },
  { value: "other", label: "Other" },
];

export const DEFAULT_REQUEST_TYPE: RequestType = "project";

/** Values that older links may still carry, mapped to the topic that replaced them. */
const legacyRequestTypes: Record<string, RequestType> = { team: "project" };

/** Narrow an arbitrary string (e.g. a query parameter) to a known request type. */
export function parseRequestType(value: string | null | undefined): RequestType | undefined {
  if (value && Object.hasOwn(legacyRequestTypes, value)) return legacyRequestTypes[value];
  return requestTypes.find((type) => type.value === value)?.value;
}

export function requestTypeLabel(value: RequestType): string {
  return requestTypes.find((type) => type.value === value)?.label ?? "Other";
}
