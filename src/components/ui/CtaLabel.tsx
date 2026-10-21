/** The primary CTA text with its arrow. The arrow is decorative, so screen readers do not read "right arrow". */
export function CtaLabel({ label }: { label: string }) {
  return (
    <>
      {label} <span aria-hidden="true">→</span>
    </>
  );
}
