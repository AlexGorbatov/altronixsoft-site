import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

/**
 * Structured data for search engines. Only facts already on the site:
 * no address, ratings or reviews.
 */
export function JsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    slogan: siteConfig.tagline,
    founder: { "@type": "Person", name: siteConfig.founder.name, jobTitle: "Founder" },
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    knowsAbout: services.flatMap((service) => service.capabilities),
    serviceType: services.map((service) => service.title),
  };

  const data = { "@context": "https://schema.org", "@graph": [organization, professionalService] };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
