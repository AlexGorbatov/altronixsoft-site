"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyEmailProps {
  email: string;
  labels: { copy: string; copied: string; status: string };
  className?: string;
}

/**
 * Shows the address as text (so contact never depends on a mail client being
 * configured) with a one-click copy. The mailto link still works.
 */
export function CopyEmail({ email, labels, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (permissions / insecure context): the visible address and link remain.
    }
  }

  return (
    <span className={cn("inline-flex max-w-full flex-wrap items-center gap-x-1", className)}>
      <a
        href={`mailto:${email}`}
        className="inline-flex min-h-11 items-center rounded-sm font-semibold text-ink underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-cyan"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? labels.copied : labels.copy}
        className="grid size-11 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:text-white"
      >
        {copied ? <Check size={16} aria-hidden className="text-success" /> : <Copy size={16} aria-hidden />}
      </button>
      <span role="status" aria-live="polite" className="text-xs text-success">
        {copied ? labels.status : ""}
      </span>
    </span>
  );
}
