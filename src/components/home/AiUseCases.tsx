import { FileCheck, MessageSquare, Search, Workflow, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { UseCase } from "@/data/services";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";
import { FramedCard } from "@/components/ui/FramedCard";
import { cn } from "@/lib/utils";

const ICONS: Record<UseCase["icon"], LucideIcon> = {
  chat: MessageSquare,
  search: Search,
  document: FileCheck,
  workflow: Workflow,
};

/** Compact AI examples as one card: a 2×2 grid of use cases, each with an icon, rule-separated. */
export async function AiUseCases() {
  const { lang, copy, aiUseCases } = await getContent();
  const { eyebrow, title, link } = copy.services.aiCases;

  return (
    <FramedCard accent="violet" innerId="solutions" innerClassName="flex h-full flex-col p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h3 className="mt-3 text-[26px] leading-[1.15] font-bold tracking-[-0.03em]">{title}</h3>
        </div>
        <Link href={localizedPath(lang, "/services/ai")} className="link-quiet">
          {link} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <ul className="mt-6 grid flex-1 border-y border-line sm:grid-cols-2">
        {aiUseCases.map((useCase, i) => {
          const Icon = ICONS[useCase.icon];
          return (
            <li
              key={useCase.title}
              className={cn(
                "flex gap-4 border-line py-5 max-sm:border-b max-sm:last:border-b-0",
                i < 2 && "sm:border-b",
                i % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6",
              )}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[.12] bg-white/[.03] text-label">
                <Icon size={18} aria-hidden />
              </span>
              <div>
                <h4 className="text-base font-bold">{useCase.title}</h4>
                <p className="mt-1 text-small leading-[1.6] text-muted">{useCase.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </FramedCard>
  );
}
