import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getContent();
  return { title: copy.notFound.title };
}

export default async function NotFound() {
  const { lang, copy } = await getContent();
  return (
    <PageShell>
      <div className="mx-auto max-w-[620px] py-16 text-center">
        <p className="font-mono text-caption tracking-[0.1em] text-label">404</p>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[48px]">{copy.notFound.title}</h1>
        <p className="mt-5 text-body leading-[1.7] text-muted">{copy.notFound.text}</p>
        <Link href={localizedPath(lang, "/")} className="link-quiet mt-6 justify-center">
          <span aria-hidden="true">←</span> {copy.notFound.home}
        </Link>
      </div>
    </PageShell>
  );
}
