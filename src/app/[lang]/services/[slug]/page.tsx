import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/JsonLdScript";
import { PageShell } from "@/components/layout/PageShell";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { contactHref } from "@/data/site";
import { hasLocale, localizedPath } from "@/i18n/config";
import { contentFor } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return contentFor("en").services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const service = contentFor(lang).services.find((item) => item.id === slug);
  if (!service) return {};
  return pageMetadata({
    lang,
    title: service.metaTitle ?? service.title,
    description: service.metaDescription,
    path: `/services/${service.id}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { slug } = await params;
  const { lang, copy, services, sapCommerce } = await getContent();
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();

  const path = `/services/${service.id}`;
  const graph = [
    serviceSchema({ lang, path, name: service.title, description: service.metaDescription, serviceType: service.title }),
    breadcrumbSchema(lang, [{ name: service.title, path }]),
  ];
  const { pages } = copy;

  return (
    <PageShell>
      <JsonLdScript graph={graph} />
      <article className="mx-auto max-w-[820px]">
        <nav aria-label={pages.breadcrumbAria}>
          <Link href={localizedPath(lang, "/#services")} className="link-quiet">
            <span aria-hidden="true">←</span> {pages.allServices}
          </Link>
        </nav>
        <div className="eyebrow mt-4">{pages.serviceNumber.replace("{number}", service.number)}</div>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{service.title}</h1>
        <p className="mt-6 text-[17px] leading-[1.75] text-muted">{service.intro}</p>

        <section aria-labelledby="problems-title" className="mt-10">
          <h2 id="problems-title" className="text-2xl font-bold tracking-[-0.03em]">{pages.whenToContact}</h2>
          <ul className="mt-4 grid list-disc gap-3 pl-5 text-body leading-[1.7] text-muted marker:text-label">
            {service.problems.map((problem) => <li key={problem}>{problem}</li>)}
          </ul>
        </section>

        <section aria-labelledby="deliverables-title" className="mt-10">
          <h2 id="deliverables-title" className="text-2xl font-bold tracking-[-0.03em]">{pages.deliverables}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {service.deliverables.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white/[.02] p-5">
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="mt-2 text-small leading-[1.7] text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="capabilities-title" className="mt-10">
          <h2 id="capabilities-title" className="mono-label text-label">
            {pages.whatWeDo}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={copy.services.capabilitiesLabel}>
            {service.capabilities.map((capability) => (
              <li key={capability}>
                <Tag>{capability}</Tag>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="start-title" className="mt-10 rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-6 sm:p-8">
          <h2 id="start-title" className="text-2xl font-bold tracking-[-0.03em]">
            {pages.howToStart}
          </h2>
          <p className="mt-3 text-body leading-[1.7] text-muted">
            {service.start}{" "}
            <Link href={localizedPath(lang, "/#engagement")} className="text-label underline underline-offset-2 hover:text-white">
              {copy.shared.allFormsLink}
            </Link>
            .
          </p>
          <div className="actions mt-6">
            <Button href={localizedPath(lang, contactHref(service.cta.type))}>{service.cta.label} →</Button>
            <Button href={localizedPath(lang, contactHref("technical-review"))} variant="secondary">
              {pages.requestReview}
            </Button>
          </div>
        </section>
        <RelatedProjects slugs={service.caseSlugs} />
        <nav aria-label={pages.otherServices} className="mt-10">
          <h2 className="mono-label text-label">{pages.otherServices}</h2>
          <ul className="mt-3 grid gap-1">
            <li>
              <Link href={localizedPath(lang, sapCommerce.path)} className="link-quiet">
                {sapCommerce.title} <span aria-hidden="true">→</span>
              </Link>
            </li>
            {services
              .filter((other) => other.id !== service.id)
              .map((other) => (
                <li key={other.id}>
                  <Link href={localizedPath(lang, `/services/${other.id}`)} className="link-quiet">
                    {other.title} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </article>
    </PageShell>
  );
}
