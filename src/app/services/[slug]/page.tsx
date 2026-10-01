import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/JsonLdScript";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { copy } from "@/data/copy";
import { getService, services } from "@/data/services";
import { contactHref } from "@/data/site";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.metaDescription, path: `/services/${service.id}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.id}`;
  const graph = [
    serviceSchema({ path, name: service.title, description: service.metaDescription, serviceType: service.title }),
    breadcrumbSchema([{ name: service.title, path }]),
  ];

  return (
    <PageShell>
      <JsonLdScript graph={graph} />
      <article className="mx-auto max-w-[820px]">
        <Link href="/#services" className="link-quiet">
          <span aria-hidden="true">←</span> All services
        </Link>
        <div className="eyebrow mt-4">Service {service.number}</div>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{service.title}</h1>
        <p className="mt-6 text-[17px] leading-[1.75] text-muted">{service.intro}</p>

        <section aria-labelledby="capabilities-title" className="mt-10">
          <h2 id="capabilities-title" className="mono-label text-label">
            What we do
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Capabilities">
            {service.capabilities.map((capability) => (
              <li key={capability}>
                <Tag>{capability}</Tag>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="start-title" className="mt-10 rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-6 sm:p-8">
          <h2 id="start-title" className="text-2xl font-bold tracking-[-0.03em]">
            How to start
          </h2>
          <p className="mt-3 text-body leading-[1.7] text-muted">
            {copy.shared.startParagraph}{" "}
            <Link href="/#engagement" className="text-label underline underline-offset-2 hover:text-white">{copy.shared.allFormsLink}</Link>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={contactHref(service.cta.type)}>{service.cta.label} →</Button>
            <Button href={contactHref("technical-review")} variant="secondary">
              Request a Technical Review
            </Button>
          </div>
        </section>
        <nav aria-label="Other services" className="mt-10">
          <h2 className="mono-label text-label">Other services</h2>
          <ul className="mt-3 grid gap-1">
            <li>
              <Link href="/services/sap-commerce" className="link-quiet">
                SAP Commerce Cloud services <span aria-hidden="true">→</span>
              </Link>
            </li>
            {services
              .filter((other) => other.id !== service.id)
              .map((other) => (
                <li key={other.id}>
                  <Link href={`/services/${other.id}`} className="link-quiet">
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
