import Link from "next/link";
import { JsonLdScript } from "@/components/JsonLdScript";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { DevTodo } from "@/components/ui/DevTodo";
import { Tag } from "@/components/ui/Tag";
import { sapCommerce } from "@/data/sap-commerce";
import { services } from "@/data/services";
import { contactHref } from "@/data/site";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { filled, todoLabel } from "@/lib/todo";

export const metadata = pageMetadata({
  title: sapCommerce.title,
  description: sapCommerce.metaDescription,
  path: sapCommerce.path,
});

export default function SapCommercePage() {
  const graph = [
    serviceSchema({
      path: sapCommerce.path,
      name: sapCommerce.h1,
      description: sapCommerce.metaDescription,
      serviceType: "SAP Commerce Cloud development and support",
    }),
    breadcrumbSchema([{ name: sapCommerce.title, path: sapCommerce.path }]),
  ];
  const details = sapCommerce.details.filter((row) => filled(row.value) || todoLabel(row.value));

  return (
    <PageShell>
      <JsonLdScript graph={graph} />
      <article className="mx-auto max-w-[900px]">
        <nav aria-label="Breadcrumb" className="text-small text-subtle">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / <span aria-current="page">{sapCommerce.title}</span>
        </nav>
        <div className="eyebrow mt-6">Service</div>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{sapCommerce.h1}</h1>
        <p className="mt-6 max-w-[68ch] text-[17px] leading-[1.75] text-muted">{sapCommerce.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={contactHref("architecture-checkup")}>Book a free check-up →</Button>
          <Button href={contactHref("technical-review")} variant="secondary">
            Request a technical review
          </Button>
        </div>

        <section aria-labelledby="what-title" className="mt-14">
          <h2 id="what-title" className="text-[28px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[32px]">
            What we do on SAP Commerce Cloud
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
            Engineering stack
          </h2>
          <p className="mt-3 max-w-[68ch] text-body leading-[1.7] text-muted">
            Backend and integration work in Java and Spring, applied to e-commerce and product information platforms.
            See <Link href="/#work" className="text-label underline underline-offset-2 hover:text-white">client projects</Link>.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
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
                    {filled(row.value) ? row.value : <DevTodo value={row.value} />}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        <section aria-labelledby="start-title" className="mt-14">
          <h2 id="start-title" className="text-[28px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[32px]">
            How to start
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
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={contactHref("architecture-checkup")}>Book a free check-up →</Button>
          </div>
        </section>

        <nav aria-label="Related services" className="mt-14">
          <h2 className="mono-label text-label">Related services</h2>
          <ul className="mt-3 grid gap-1">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/services/${service.id}`} className="link-quiet">
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
