import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "@/components/JsonLdScript";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { Tag } from "@/components/ui/Tag";
import { contactHref } from "@/data/site";
import { hasLocale, localizedPath } from "@/i18n/config";
import { contentFor } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { filled } from "@/lib/todo";

export async function generateMetadata({ params }: PageProps<"/[lang]/services/sap-commerce">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { sapCommerce } = contentFor(lang);
  return pageMetadata({
    lang,
    title: sapCommerce.metaTitle,
    description: sapCommerce.metaDescription,
    path: sapCommerce.path,
  });
}

export default async function SapCommercePage() {
  const { lang, copy, services, sapCommerce } = await getContent();
  const { pages } = copy;
  const graph = [
    serviceSchema({
      lang,
      path: sapCommerce.path,
      name: sapCommerce.h1,
      description: sapCommerce.metaDescription,
      serviceType: sapCommerce.h1,
    }),
    breadcrumbSchema(lang, [{ name: sapCommerce.title, path: sapCommerce.path }]),
  ];
  const details = sapCommerce.details.filter((row) => filled(row.value));

  return (
    <PageShell>
      <JsonLdScript graph={graph} />
      <article className="mx-auto max-w-[900px]">
        <nav aria-label={pages.breadcrumbAria} className="text-small text-subtle">
          <Link href={localizedPath(lang, "/")} className="hover:text-white">
            {pages.home}
          </Link>{" "}
          / <span aria-current="page">{sapCommerce.title}</span>
        </nav>
        <div className="eyebrow mt-6">{pages.serviceEyebrow}</div>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{sapCommerce.h1}</h1>
        <p className="mt-6 max-w-[68ch] text-[17px] leading-[1.75] text-muted">{sapCommerce.intro}</p>
        <div className="actions mt-8">
          <Button href={localizedPath(lang, contactHref("architecture-checkup"))}>{copy.services.sapCta} →</Button>
          <Button href={localizedPath(lang, contactHref("technical-review"))} variant="secondary">
            {pages.requestReview}
          </Button>
        </div>

        <section aria-labelledby="problems-title" className="mt-10">
          <h2 id="problems-title" className="text-2xl font-bold tracking-[-0.03em]">{pages.whenToContact}</h2>
          <ul className="mt-4 grid list-disc gap-3 pl-5 text-body leading-[1.7] text-muted marker:text-label">
            {sapCommerce.problems.map((problem) => <li key={problem}>{problem}</li>)}
          </ul>
        </section>

        <section aria-labelledby="what-title" className="mt-12">
          <h2 id="what-title" className="text-[28px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[32px]">
            {pages.sapWhatWeDo}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {sapCommerce.offerings.map((item) => (
              <li key={item.title} className="card">
                <h3 className="text-[20px] font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-body leading-[1.65] text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="stack-title" className="mt-14">
          <h2 id="stack-title" className="text-[28px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[32px]">
            {pages.sapStackTitle}
          </h2>
          <p className="mt-3 max-w-[68ch] text-body leading-[1.7] text-muted">
            {pages.sapStackBefore}{" "}
            <Link href={localizedPath(lang, "/work/enterprise-ecommerce-platform")} className="text-label underline underline-offset-2 hover:text-white">
              {pages.sapStackLink}
            </Link>
            .
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={pages.technologiesAria}>
            {sapCommerce.relevant.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
          {details.length > 0 && (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {details.map((row) => (
                <div key={row.label} className="border-t border-line pt-4">
                  <dt className="text-body font-bold text-white">{row.label}</dt>
                  <dd className="mt-1 text-small leading-[1.6] text-muted">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        <section aria-labelledby="start-title" className="mt-14">
          <h2 id="start-title" className="text-[28px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[32px]">
            {pages.howToStart}
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {sapCommerce.start.map((step, i) => (
              <li key={step.title} className="border-t border-line pt-4">
                <span className="font-mono text-caption text-label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-[18px] font-bold">{step.title}</h3>
                <p className="mt-1 text-small leading-[1.6] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="actions mt-8">
            <Button href={localizedPath(lang, contactHref("architecture-checkup"))}>{copy.services.sapCta} →</Button>
          </div>
        </section>

        <RelatedProjects slugs={sapCommerce.caseSlugs} />

        <nav aria-label={pages.relatedServices} className="mt-14">
          <h2 className="mono-label text-label">{pages.relatedServices}</h2>
          <ul className="mt-3 grid gap-1">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={localizedPath(lang, `/services/${service.id}`)} className="link-quiet">
                  {service.title} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </PageShell>
  );
}
