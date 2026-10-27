import type { RequestType } from "@/data/site";

export const requestTypes: { value: RequestType; label: string }[] = [
  { value: "exploring", label: "Not sure yet" },
  { value: "architecture-checkup", label: "Architecture check-up" },
  { value: "technical-review", label: "Technical review" },
  { value: "proof-of-value", label: "Proof of value" },
  { value: "project", label: "Fixed-scope project" },
  { value: "team", label: "Dedicated team" },
  { value: "other", label: "Other" },
];

/** The general "Discuss a project" buttons land here, so nobody starts in a format they did not choose. */
export const DEFAULT_REQUEST_TYPE: RequestType = "exploring";

/** Narrow an arbitrary string (e.g. a query parameter) to a known request type. */
export function parseRequestType(value: string | null | undefined): RequestType | undefined {
  return requestTypes.find((type) => type.value === value)?.value;
}

export function requestTypeLabel(value: RequestType): string {
  return requestTypes.find((type) => type.value === value)?.label ?? "Other";
}
