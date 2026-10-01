type IconName = "eu" | "contract" | "nda" | "gdpr" | "invoice" | "clock";

/** Inline stroke icons (20×20, `currentColor`); decorative, the chip's text carries the meaning. */
const paths: Record<IconName, string> = {
  eu: "M10 3a7 7 0 100 14 7 7 0 000-14z M3 10h14 M10 3c2.6 2.2 2.6 11.8 0 14 M10 3c-2.6 2.2-2.6 11.8 0 14",
  contract: "M5.5 2.5h6.5l3 3v12h-9.5z M12 2.5v3h3 M7.5 10h5 M7.5 13h5",
  nda: "M5.5 9h9v7.5h-9z M7.5 9V6.5a2.5 2.5 0 015 0V9",
  gdpr: "M10 2.5l6 2.2v4.6c0 3.8-2.5 6.7-6 8.2-3.5-1.5-6-4.4-6-8.2V4.7z M7.2 10l2 2 3.6-3.8",
  invoice: "M5 2.5h10v15l-2-1.3-1.5 1.3-1.5-1.3-1.5 1.3-1.5-1.3-2 1.3z M12.2 7.4a2.4 2.4 0 100 5 M7.8 9h3.4 M7.8 11h3",
  clock: "M10 3a7 7 0 100 14 7 7 0 000-14z M10 6.2V10l2.8 1.8",
};

export function AssuranceIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <path d={paths[name]} />
    </svg>
  );
}
