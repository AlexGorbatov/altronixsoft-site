import type { ProjectVisual as Variant } from "@/data/projects";

const LINE = "#263957";
const TILE = "#1a2b48";
const CYAN = "#22d6f4";
const VIOLET = "#b79bfd";

/** One abstract scene per project theme. Illustrative only — no real UI, data or client marks. */
function Scene({ variant }: { variant: Variant }) {
  if (variant === "commerce") {
    // Catalogue grid + order panel
    return (
      <>
        {[0, 62, 124].flatMap((x) =>
          [0, 50].map((y) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="54" height="42" rx="6" fill={TILE} />
              <rect x={x + 8} y={y + 30} width="26" height="4" rx="2" fill={CYAN} opacity=".45" />
            </g>
          )),
        )}
        <rect x="196" y="0" width="104" height="92" rx="8" fill="#0b1425" stroke={LINE} />
        <rect x="206" y="12" width="60" height="6" rx="3" fill={LINE} />
        <rect x="206" y="26" width="82" height="6" rx="3" fill={LINE} />
        <rect x="206" y="40" width="48" height="6" rx="3" fill={LINE} />
        <rect x="206" y="68" width="84" height="16" rx="5" fill={CYAN} opacity=".35" />
      </>
    );
  }

  if (variant === "integration") {
    // External systems → platform (REST / SOAP), data feed through Data Hub, CI/CD pipeline underneath
    const label = { fontFamily: "var(--font-mono), monospace", fontSize: 7.5, letterSpacing: 0.5, fill: "#7b90b0" };
    return (
      <>
        {[0, 22, 44].map((y) => (
          <g key={y}>
            <path d={`M46 ${y + 8} C84 ${y + 8} 82 33 118 33`} fill="none" stroke={CYAN} strokeOpacity=".5" strokeDasharray="4 4" />
            <rect x="0" y={y} width="46" height="16" rx="4" fill={TILE} />
            <rect x="8" y={y + 6} width="20" height="4" rx="2" fill={LINE} />
          </g>
        ))}
        <text x="78" y="70" textAnchor="middle" {...label}>
          REST · SOAP
        </text>
        <rect x="118" y="11" width="64" height="44" rx="8" fill={CYAN} fillOpacity=".12" stroke={CYAN} strokeOpacity=".6" />
        <rect x="130" y="23" width="40" height="5" rx="2.5" fill={CYAN} opacity=".6" />
        <rect x="130" y="35" width="26" height="5" rx="2.5" fill={LINE} />
        <path d="M254 33 H182" fill="none" stroke={VIOLET} strokeOpacity=".6" strokeDasharray="4 4" />
        <rect x="254" y="11" width="46" height="44" rx="6" fill={TILE} />
        {[22, 32, 42].map((y) => (
          <rect key={y} x="262" y={y} width="30" height="4" rx="2" fill={VIOLET} opacity=".4" />
        ))}
        <text x="277" y="70" textAnchor="middle" {...label}>
          DATA HUB
        </text>
        <path d="M34 86 H260" stroke={LINE} strokeWidth="1.2" />
        {[60, 110, 160, 210, 260].map((x, i) => (
          <circle key={x} cx={x} cy="86" r="3.2" fill="#101b31" stroke={i === 4 ? VIOLET : CYAN} strokeWidth="1.4" />
        ))}
        <text x="0" y="89" {...label}>
          CI/CD
        </text>
      </>
    );
  }

  if (variant === "data") {
    // Sources → central hub → consumers
    const rows = [6, 34, 62];
    return (
      <>
        {rows.map((y) => (
          <g key={y}>
            <path d={`M46 ${y + 11} C86 ${y + 11} 84 46 118 46`} fill="none" stroke={CYAN} strokeOpacity=".5" strokeDasharray="4 4" />
            <path d={`M182 46 C216 46 214 ${y + 11} 254 ${y + 11}`} fill="none" stroke={VIOLET} strokeOpacity=".5" strokeDasharray="4 4" />
            <rect x="0" y={y} width="46" height="22" rx="5" fill={TILE} />
            <rect x="8" y={y + 9} width="22" height="4" rx="2" fill={LINE} />
            <rect x="254" y={y} width="46" height="22" rx="5" fill={TILE} />
            <rect x="262" y={y + 9} width="22" height="4" rx="2" fill={LINE} />
          </g>
        ))}
        <rect x="118" y="24" width="64" height="44" rx="8" fill={CYAN} fillOpacity=".12" stroke={CYAN} strokeOpacity=".6" />
        <rect x="130" y="38" width="40" height="5" rx="2.5" fill={CYAN} opacity=".6" />
        <rect x="130" y="50" width="26" height="5" rx="2.5" fill={LINE} />
      </>
    );
  }

  // logistics: route through a few stops
  const stops: Array<[number, number]> = [
    [22, 66],
    [92, 26],
    [172, 60],
    [252, 22],
  ];
  return (
    <>
      {[20, 46, 72].map((y) => (
        <path key={y} d={`M0 ${y} H300`} stroke={LINE} strokeOpacity=".5" />
      ))}
      <path
        d="M22 66 C52 66 62 26 92 26 S142 60 172 60 S222 22 252 22"
        fill="none"
        stroke={CYAN}
        strokeOpacity=".7"
        strokeWidth="1.6"
        strokeDasharray="5 4"
      />
      {stops.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="8" fill={i === 2 ? VIOLET : CYAN} opacity=".14" />
          <circle cx={x} cy={y} r="4.5" fill="#101b31" stroke={i === 2 ? VIOLET : CYAN} strokeWidth="1.6" />
        </g>
      ))}
    </>
  );
}

export function ProjectVisual({ variant }: { variant: Variant }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-[180px] overflow-hidden bg-[linear-gradient(135deg,#111d35,#0c1426)] p-[18px] after:absolute after:-right-[70px] after:-bottom-20 after:size-[180px] after:animate-[float_8s_ease-in-out_infinite_alternate] after:rounded-full after:bg-[rgba(139, 92, 246,.16)] after:blur-[32px] after:content-['']"
    >
      <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#101b31] p-[14px]">
        <div className="mb-3 flex gap-[6px]">
          {[0, 1, 2].map((dot) => (
            <i key={dot} className="size-[7px] rounded-full bg-[#38516e]" />
          ))}
        </div>
        <svg viewBox="0 0 300 92" preserveAspectRatio="xMidYMid meet" className="min-h-0 w-full flex-1">
          <Scene variant={variant} />
        </svg>
      </div>
    </div>
  );
}
