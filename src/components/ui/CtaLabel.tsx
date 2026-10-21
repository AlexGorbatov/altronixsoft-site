import { CTA_LABEL } from "@/data/site";

/** The primary CTA text with its arrow. The arrow is decorative, so screen readers do not read "right arrow". */
export function CtaLabel() {
  return (
    <>
      {CTA_LABEL} <span aria-hidden="true">→</span>
    </>
  );
}
