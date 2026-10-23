"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Tiles or a list. The choice lives in the address (?view=list), so it can be shared and survives a reload.
 * The page itself stays static: the server always sends the same cards, and this code only switches the layout.
 * Without JavaScript the cards are shown as tiles.
 */
export type ViewMode = "tiles" | "list";

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

function useView(): [ViewMode, (next: ViewMode) => void] {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const view: ViewMode = new URLSearchParams(search).get(VIEW_PARAM) === "list" ? "list" : "tiles";

  const setView = (next: ViewMode) => {
    const url = new URL(window.location.href);
    if (next === "tiles") url.searchParams.delete(VIEW_PARAM);
    else url.searchParams.set(VIEW_PARAM, next);
    window.history.replaceState(window.history.state, "", url);
    listeners.forEach((notify) => notify());
  };
  return [view, setView];
}

interface ViewToggleProps {
  labels: { label: string; tiles: string; list: string };
}

/** The switch between tiles and a list, with its words. Shown from 640px up, where there is a choice (below it both are one column). */
export function ViewToggle({ labels }: ViewToggleProps) {
  const [view, setView] = useView();
  return (
    <div role="group" aria-label={labels.label} className="hidden gap-1 rounded-full border border-white/[.14] p-1 sm:flex">
      {(["tiles", "list"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          aria-pressed={view === mode}
          onClick={() => setView(mode)}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-full px-4 text-small font-semibold transition-colors",
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
          {labels[mode]}
        </button>
      ))}
    </div>
  );
}

interface ProjectListProps {
  label: string;
  /** One entry per project, already rendered on the server. */
  items: { slug: string; node: ReactNode }[];
  /** Shown after the projects (the "your project could be next" card). */
  footer?: ReactNode;
}

export function ProjectList({ label, items, footer }: ProjectListProps) {
  const [view] = useView();
  return (
    <ul
      aria-label={label}
      data-view={view}
      className={cn("grid gap-[22px] lg:gap-8", view === "tiles" && "lg:grid-cols-2")}
    >
      {items.map(({ slug, node }) => (
        <li key={slug} className="min-w-0">
          {node}
        </li>
      ))}
      {footer && <li className={cn("min-w-0", view === "tiles" && "lg:col-span-2")}>{footer}</li>}
    </ul>
  );
}
