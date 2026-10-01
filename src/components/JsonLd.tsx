import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { filled } from "@/lib/todo";
import { JsonLdScript } from "./JsonLdScript";

/** "Kaupmehe tn 7-120, 10114 Tallinn" → PostalAddress, only when the legal address is filled in. */
function postalAddress() {
  const { address, country } = siteConfig.legal;
  if (!filled(address)) return undefined;
  const [street, rest = ""] = address.split(",").map((part) => part.trim());
  const [postalCode, ...city] = rest.split(" ");
  return { "@type": "PostalAddress", streetAddress: street, postalCode, addressLocality: city.join(" "), addressCountry: country === "Estonia" ? "EE" : country };
}

/**
 * Structured data for search engines. Only facts already on the site: the registered address appears
 * once it is filled in; no ratings or reviews.
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
    logo: `${siteConfig.url}/apple-icon.png`,
    sameAs: [siteConfig.social.linkedin],
    address: postalAddress(),
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: siteConfig.email, availableLanguage: "English" },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: "Europe",
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    knowsAbout: services.flatMap((service) => service.capabilities),
    serviceType: services.map((service) => service.title),
  };

  return <JsonLdScript graph={[organization, website, professionalService]} />;
}
