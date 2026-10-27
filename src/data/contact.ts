import type { RequestType } from "@/data/site";

export const requestTypes: { value: RequestType; label: string }[] = [
  { value: "exploring", label: "Not sure yet" },
  { value: "architecture-checkup", label: "Scoping call" },
  { value: "technical-review", label: "Technical review" },
  { value: "proof-of-value", label: "Proof of value" },
  { value: "project", label: "Fixed-scope project" },
  { value: "team", label: "Dedicated team" },
  { value: "other", label: "Other" },
];

export interface FormOption {
  value: string;
  label: string;
}

/** Optional qualifying fields of the contact form. The empty value means the visitor did not choose. */
export const budgetRanges: FormOption[] = [
  { value: "", label: "Not sure yet" },
  { value: "under-10k", label: "Under €10k" },
  { value: "10k-30k", label: "€10k–30k" },
  { value: "30k-60k", label: "€30k–60k" },
  { value: "over-60k", label: "Over €60k" },
];

export const timelines: FormOption[] = [
  { value: "", label: "Not sure yet" },
  { value: "within-month", label: "Within a month" },
  { value: "one-to-three-months", label: "In one to three months" },
  { value: "later", label: "Later or flexible" },
];

/** The English label of an option, for the notification email; "—" when nothing was chosen. */
export function optionLabel(options: FormOption[], value: string): string {
  return value ? (options.find((option) => option.value === value)?.label ?? "—") : "—";
}

/** The general "Discuss a project" buttons land here, so nobody starts in a format they did not choose. */
export const DEFAULT_REQUEST_TYPE: RequestType = "exploring";

/** Narrow an arbitrary string (e.g. a query parameter) to a known request type. */
export function parseRequestType(value: string | null | undefined): RequestType | undefined {
  return requestTypes.find((type) => type.value === value)?.value;
}

export function requestTypeLabel(value: RequestType): string {
  return requestTypes.find((type) => type.value === value)?.label ?? "Other";
}
