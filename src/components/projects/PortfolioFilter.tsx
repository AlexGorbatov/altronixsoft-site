"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import type { ProjectKind } from "@/data/projects";
import { cn } from "@/lib/utils";

/*
 * The portfolio filter and view live in the address (?kind=ai&view=list), so a view can be shared and survives
 * a reload. The page itself stays static: the server always sends every card, and this code only hides the
 * ones outside the filter and switches the layout. Without JavaScript all cards are shown as tiles.
 */
export type KindFilter = "all" | ProjectKind;
export type ViewMode = "tiles" | "list";

const KINDS: readonly KindFilter[] = ["all", "client", "ai", "product"];
const KIND_PARAM = "kind";
const VIEW_PARAM = "view";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/** The snapshot is the query string itself: a plain string, so React can compare it. */
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

function usePortfolioView() {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const params = new URLSearchParams(search);
  const kind = KINDS.find((value) => value === params.get(KIND_PARAM)) ?? "all";
  const view: ViewMode = params.get(VIEW_PARAM) === "list" ? "list" : "tiles";

  const update = (name: string, value: string | null) => {
    const url = new URL(window.location.href);
    if (value === null) url.searchParams.delete(name);
    else url.searchParams.set(name, value);
    window.history.replaceState(window.history.state, "", url);
    listeners.forEach((notify) => notify());
  };
  return {
    kind,
    view,
    setKind: (next: KindFilter) => update(KIND_PARAM, next === "all" ? null : next),
    setView: (next: ViewMode) => update(VIEW_PARAM, next === "tiles" ? null : next),
  };
}

const CHIP =
  "inline-flex h-[34px] items-center rounded-full border px-[15px] text-small font-semibold transition-colors";
const CHIP_ON = "border-cyan/50 bg-cyan/10 text-white";
const CHIP_OFF = "border-white/[.14] bg-white/[.02] text-muted hover:border-white/30 hover:text-white";

interface FilterBarProps {
  label: string;
  /** Chip text and number of projects, in the order all, client, ai, product. */
  chips: { kind: KindFilter; label: string; count: number }[];
  view: { label: string; tiles: string; list: string };
}

/** The kind filter, and (from 640px up, where there is a choice) the switch between tiles and a list. */
export function FilterBar({ label, chips, view: viewLabels }: FilterBarProps) {
  const { kind: current, setKind, view, setView } = usePortfolioView();
  return (
    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
      <div role="group" aria-label={label} className="flex flex-wrap gap-2 lg:justify-end">
        {chips.map(({ kind, label: text, count }) => {
          const pressed = current === kind;
          return (
            <button
              key={kind}
              type="button"
              aria-pressed={pressed}
              onClick={() => setKind(kind)}
              className={cn(CHIP, pressed ? CHIP_ON : CHIP_OFF)}
            >
              {text} · {count}
            </button>
          );
        })}
      </div>
      <div role="group" aria-label={viewLabels.label} className="ml-1 hidden gap-1 rounded-full border border-white/[.14] p-[3px] sm:flex">
        {(["tiles", "list"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={view === mode}
            aria-label={viewLabels[mode]}
            title={viewLabels[mode]}
            onClick={() => setView(mode)}
            className={cn(
              "grid size-7 place-items-center rounded-full transition-colors",
              view === mode ? "bg-cyan/15 text-white" : "text-muted hover:text-white",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
              {mode === "tiles" ? (
                <>
                  <rect x="1.5" y="1.5" width="4" height="4" rx="1" />
                  <rect x="8.5" y="1.5" width="4" height="4" rx="1" />
                  <rect x="1.5" y="8.5" width="4" height="4" rx="1" />
                  <rect x="8.5" y="8.5" width="4" height="4" rx="1" />
                </>
              ) : (
                <>
                  <rect x="1.5" y="1.5" width="11" height="4" rx="1" />
                  <rect x="1.5" y="8.5" width="11" height="4" rx="1" />
                </>
              )}
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

interface FilteredListProps {
  label: string;
  /** One entry per project, already rendered on the server. */
  items: { slug: string; kind: ProjectKind; node: ReactNode }[];
  /** Always shown, after the projects (the "your project could be next" card). */
  footer?: ReactNode;
}

export function FilteredList({ label, items, footer }: FilteredListProps) {
  const { kind: current, view } = usePortfolioView();
  return (
    <ul
      aria-label={label}
      data-view={view}
      className={cn("grid gap-[22px] lg:gap-8", view === "tiles" && "lg:grid-cols-2")}
    >
      {items.map(({ slug, kind, node }) => (
        <li key={slug} hidden={current !== "all" && current !== kind} className="min-w-0">
          {node}
        </li>
      ))}
      {footer && <li className={cn("min-w-0", view === "tiles" && "lg:col-span-2")}>{footer}</li>}
    </ul>
  );
}
