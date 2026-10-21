import { siteConfig } from "@/data/site";
import { getContent } from "@/i18n/server";
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
export async function JsonLd() {
  const { lang, services, site } = await getContent();
  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
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
    inLanguage: lang,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: site.description,
    inLanguage: lang,
    email: siteConfig.email,
    areaServed: "Europe",
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    knowsAbout: services.flatMap((service) => service.capabilities),
    serviceType: services.map((service) => service.title),
  };

  return <JsonLdScript graph={[organization, website, professionalService]} />;
}
