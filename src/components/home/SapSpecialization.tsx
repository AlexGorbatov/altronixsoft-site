import Link from "next/link";
import { contactHref } from "@/data/site";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";
import { Button } from "@/components/ui/Button";
import { FramedCard } from "@/components/ui/FramedCard";

/** The SAP Commerce Cloud specialization card under the three service cards. Content: `sapCommerce.specialization`. */
export async function SapSpecialization() {
  const { lang, copy, sapCommerce } = await getContent();
  const { badge, title, text, stats } = sapCommerce.specialization;

  return (
    <FramedCard accent="blue" innerClassName="flex h-full flex-col p-6 sm:p-8">
      <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-[image:var(--brand-gradient)] opacity-70" />
      <div className="mono-label w-fit rounded-lg border border-white/[.18] px-3 py-[7px] text-label">{badge}</div>
      <h3 className="mt-6 text-[30px] leading-[1.1] font-bold tracking-[-0.03em]">{title}</h3>
      <p className="mt-3 max-w-[46ch] text-body leading-[1.65] text-muted">{text}</p>

      <dl className="mt-6 grid divide-y divide-line rounded-xl border border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline justify-start gap-3 px-4 py-3 text-left sm:flex-col sm:items-center sm:justify-center sm:gap-1 sm:py-4 sm:text-center">
            <dt className="text-small leading-[1.3] text-subtle">{stat.label}</dt>
            <dd className="order-first text-[22px] leading-[1.15] font-bold sm:text-[24px]">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-col items-stretch gap-3 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
        <Button href={localizedPath(lang, contactHref("architecture-checkup"))}>{copy.services.sapCta}</Button>
        <Link href={localizedPath(lang, sapCommerce.path)} className="link-quiet justify-center sm:justify-start">
          {copy.services.sapLink} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </FramedCard>
  );
}
