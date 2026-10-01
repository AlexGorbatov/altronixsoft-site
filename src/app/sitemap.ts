import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/projects";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { hasResult } from "@/lib/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({
      url: url(`/services/${service.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: url("/services/sap-commerce"), changeFrequency: "monthly" as const, priority: 0.9 },
    // Case studies without a measurable result are noindex, so they stay out of the sitemap too.
    ...caseStudies
      .filter(hasResult)
      .map((study) => ({ url: url(`/work/${study.slug}`), changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
