import { useId } from "react";

/** Three interlocking diamonds + wordmark, from the approved prototype. */
export function Logo() {
  const gradientId = useId();

  return (
    <span className="flex items-center gap-[10px] text-[17px] leading-none">
      <svg viewBox="0 0 120 64" aria-hidden="true" className="h-[34px] w-[58px]">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1368E8" />
            <stop offset="1" stopColor="#21C6D9" />
          </linearGradient>
        </defs>
        <rect x="17.8" y="16.8" width="30.4" height="30.4" rx="2.4" transform="rotate(45 33 32)" fill="none" stroke={`url(#${gradientId})`} strokeWidth="7.8" />
        <rect x="71.8" y="16.8" width="30.4" height="30.4" rx="2.4" transform="rotate(45 87 32)" fill="none" stroke={`url(#${gradientId})`} strokeWidth="7.8" />
        <rect x="44.8" y="16.8" width="30.4" height="30.4" rx="2.4" transform="rotate(45 60 32)" fill="none" stroke="#21C6D9" strokeWidth="7.8" />
      </svg>
      <span className="flex flex-col gap-[3px]">
        <b className="font-extrabold">Altronix</b>
        <span className="font-medium text-[#cdd6e5]">Software</span>
      </span>
    </span>
  );
}
