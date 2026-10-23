import type { Part } from "../content";

/** Shared by the case studies and the portfolio tiles, so a case and its tile never say different things. */
const hybris = {
  title: "SAP-Hybris-E-Commerce-Plattform",
  industry: "E-Commerce",
  summary:
    "OCC-Webservices, Solr-Suche, Aktionen und Integrationen für einen Händler für Möbel und Wohndekoration.",
};
const pim = {
  title: "Produktinformationsplattform",
  industry: "Produktinformation (PIM)",
  summary:
    "Zentralisierte Produktinformationen, Integrationen und Unternehmens-Workflows.",
};
const logistics = {
  title: "Logistik-Betriebsplattform",
  industry: "Logistik",
  summary:
    "Backend-Systeme für Logistik-Workflows, APIs und den täglichen Betrieb.",
};

const nexus = {
  title: "Nexus",
  industry: "Blockchain · Daten-API",
  summary:
    "Verwaltete Multi-Chain-Daten- und Transaktions-API für Cardano, Midnight und Bitcoin, mit Provider-Failover und OpenAPI 3.1.",
};

/** Deutsch: Fallstudien, Labs und die SAP-Commerce-Seite. */
export const caseStudies: Part<"caseStudies"> = [
  {
    ...hybris,
    context: "Händler für Möbel und Wohndekoration in Deutschland.",
    challenge:
      "Die SAP-Hybris-Plattform an externe Drittsysteme anbinden, große Datenmengen einspielen und ein hochbelastetes Produktivsystem stabil halten.",
    whatWeDid:
      "Wir haben die Integrationen mit Drittsystemen über REST- und SOAP-Webservices umgesetzt und große Datenmengen über den Data Hub in die Plattform geladen. Wir haben die OCC-Webservices konfiguriert, die Benutzer-, Konto-, Warenkorb- und Bestelldaten für das Frontend bereitstellen, die Solr-Suche um neue Filter für die Produktlisten, die Extraktion von Kategorien und Facetten erweitert sowie Vorlagen für Aktionsregeln und den Prozess der E-Mail-Benachrichtigungen angepasst. Wir haben die CI/CD-Pipeline und die Nightly Builds aufgesetzt und verbessert, den Checkout und die Warenkorbverwaltung angepasst, für eine angemessene Testabdeckung gesorgt sowie Produktionsprobleme und Fehler behoben. Das Team arbeitete nach Scrum, mit regelmäßigen Code-Reviews und Mentoring.",
    result:
      "Funktionen wurden dank des CI/CD-Prozesses pünktlich geliefert, und die Plattform blieb unter hoher Last stabil.",
    duration: "5 Monate",
    team: "5 Personen",
    focus: "OCC-Webservices, Solr-Suche und Aktionsregeln",
  },
  {
    ...pim,
    role: "Backend- und Integrationsentwicklung",
    focus: "Datenflüsse und Workflow-Integrität",
  },
  {
    ...logistics,
    role: "Backend-Entwicklung",
    focus: "Operative Workflows und API-Design",
  },
  {
    ...nexus,
    context: "Blockchain-Infrastruktur für Wallets, dApps, Börsen und KI-Agenten auf Cardano, Bitcoin und Midnight.",
    challenge:
      "Wallets, dApps und KI-Agenten einen verlässlichen Zugang zu drei verschiedenen Blockchains geben: Chain-Daten, Marktdaten und Transaktionen hinter einer Basis-URL und einem API-Schlüssel, ohne Abhängigkeit von einem einzelnen Upstream-Provider und ohne jemals die privaten Schlüssel der Nutzer zu halten.",
    whatWeDid:
      "Wir haben eine API-Oberfläche über Cardano, Bitcoin und Midnight gebaut. Jede Anfrage läuft hinter mehreren Upstreams, Yaci, Koios, Blockfrost und eigenen Indexern: Health Checks pro Provider wählen für jeden Aufruf einen gesunden aus, und häufig abgefragte Daten kommen aus dem Cache. Darauf liegen Chain-Daten in zehn Endpunktgruppen, Marktdaten über 11 Cardano-DEXes, Wallet-Analysen, Swap-Routing zum besten Preis und serverseitiger Transaktionsaufbau, der unsigniertes CBOR zurückgibt, sodass die Schlüssel den Client nie verlassen. Dieselben Daten werden per WebSocket-Streaming gepusht und KI-Agenten über einen gehosteten MCP-Server angeboten; die gesamte Oberfläche ist durch eine OpenAPI-3.1-Spezifikation beschrieben, aus der ein typisiertes TypeScript-SDK generiert wird.",
    result:
      "Die eigene Non-Custodial-Wallet des Kunden läuft produktiv auf der Plattform: Swap-Routing, Marktdaten und Transaktionsaufbau laufen über dieselbe API, die auch externe Entwickler nutzen.",
    duration: "TODO(owner): duration, e.g. N months",
    focus: "Multi-Provider-Failover, eine API-Oberfläche über drei Chains und Transaktionsaufbau ohne Verwahrung von Schlüsseln",
    architecture: [
      {
        title: "Clients",
        text: "Wallets, dApps, Börsen und KI-Agenten verbinden sich über REST, WebSocket-Streaming oder den gehosteten MCP-Server, mit dem typisierten TypeScript-SDK oder jedem HTTP-Client.",
      },
      {
        title: "Eine API-Oberfläche",
        text: "Eine Basis-URL und ein X-Api-Key-Header für jede Chain. Jeder Schlüssel gilt für eine Chain und ein Netzwerk, und eine OpenAPI-3.1-Spezifikation mit Live-Playground beschreibt jeden Endpunkt.",
      },
      {
        title: "Produkte",
        text: "Chain-Daten, Marktdaten über 11 Cardano-DEXes, Wallet-Analysen, Swap-Routing zum besten Preis und serverseitiger Transaktionsaufbau.",
      },
      {
        title: "Routing und Cache",
        text: "Health Checks pro Provider wählen für jeden Aufruf einen gesunden Upstream und umgehen einen gestörten. Häufig abgefragte Daten kommen aus dem Cache, die Nutzung wird pro Schlüssel gezählt.",
      },
      {
        title: "Upstreams und Chains",
        text: "Yaci, Koios, Blockfrost und eigene Indexer, über Cardano, Bitcoin und Midnight.",
      },
      {
        title: "Ohne Verwahrung von Schlüsseln",
        text: "Transaktionen werden unsigniert aufgebaut und auf dem Client signiert, sodass private Schlüssel die Plattform nie erreichen.",
      },
    ],
  },
];

/** The portfolio tiles, in the order of the English source. Tiles 1–4 are the case studies above. */
export const projects: Part<"projects"> = [
  { title: hybris.title, category: hybris.industry, summary: hybris.summary },
  { title: pim.title, category: pim.industry, summary: pim.summary },
  { title: logistics.title, category: logistics.industry, summary: logistics.summary },
  { title: nexus.title, category: nexus.industry, summary: nexus.summary },
  {
    title: "Secure RAG",
    category: "KI · Retrieval",
    summary: "Retrieval-Augmented Generation für Unternehmen in Java, mit Zugriffskontrolle vor dem Modell.",
  },
  {
    title: "KI-Agent für Geschäftsprozesse",
    category: "KI · Agenten",
    summary: "Ein Agent, der einen Geschäftsprozess über mehrere Systeme steuert, mit Freigabeschritt durch einen Menschen.",
  },
  {
    title: "KI-Dokumentenverarbeitung",
    category: "KI · Dokumente",
    summary: "Macht aus eingehenden Dokumenten strukturierte, geprüfte Daten, die nachgelagerte Systeme nutzen können.",
  },
  {
    title: "LLM Gateway",
    category: "KI · Infrastruktur",
    summary: "Ein Zugangspunkt zu mehreren Sprachmodellen, mit Routing, Limits und Audit-Trail.",
  },
];

export const labs: Part<"labs"> = {
  eyebrow: "Referenzimplementierungen",
  description:
    "Hier erproben wir Architektur, Integrationsmuster und neue Technologien, auch KI, praktisch.",
  projects: [
    { title: "Enterprise-Wissensassistent", tag: "RAG" },
    { title: "KI-Plattform zur Projektanalyse", tag: "Analyse" },
    { title: "KI-Workflow-Automatisierung", tag: "Agenten" },
  ],
};

export const sapCommerce: Part<"sapCommerce"> = {
  title: "SAP-Commerce-Cloud-Leistungen",
  metaTitle: "SAP Commerce Cloud (Hybris) Entwicklung",
  metaDescription:
    "SAP Commerce Cloud (Hybris): Entwicklung, Support, Integrationen und Upgrades durch Senior-Java-/Spring-Engineers. Klare Verantwortung. Transparente Umsetzung.",
  h1: "SAP-Commerce-Cloud-Entwicklung und -Support",
  intro:
    "Wir entwickeln, erweitern und betreuen SAP-Commerce-Cloud-Plattformen (Hybris) für E-Commerce- und Produktdaten-Teams. Die Arbeit ist Backend- und Integrationsentwicklung in Java und Spring, geleitet von Senior Engineers.",
  specialization: {
    badge: "Spezialisierung",
    title: "SAP Commerce Cloud",
    text: "Entwicklung, Betriebssupport, Integrationen und Upgrades für SAP-Commerce-Cloud-Plattformen (Hybris).",
    stats: [
      { value: "10+", label: "Projekte" },
      { value: "ERP · PIM", label: "Integrationen" },
    ],
  },
  details: [
    { label: "Versionen und Storefronts" },
    { label: "Zertifizierungen" },
    { label: "Typischer Projektrahmen" },
  ],
  offerings: [
    {
      title: "Entwicklung",
      text: "Neue Funktionen, individuelle Erweiterungen und Backend-Logik auf SAP Commerce Cloud, passend zu den Standards Ihrer Plattform.",
    },
    {
      title: "Support und Wartung",
      text: "Produktionssupport, Störungsanalyse und regelmäßige Wartung für laufende Commerce-Plattformen.",
    },
    {
      title: "Integrationen",
      text: "Anbindungen an ERP, PIM, Zahlung, Logistik und weitere Unternehmenssysteme über Enterprise-APIs.",
    },
    {
      title: "Upgrades und Cloud-Migration",
      text: "Geplante Upgrades und Umzüge in die Cloud-Infrastruktur ohne unnötige Neuentwicklung.",
    },
  ],
  start: [
    {
      title: "Architektur-Check-up",
      text: "Ein Gespräch über Ihre Plattform, um zu entscheiden, was als Nächstes sinnvoll ist.",
    },
    {
      title: "Technisches Review",
      text: "Eine kurze Prüfung Ihres Codes, Ihrer Architektur und Ihrer Integrationen mit schriftlichem Bericht.",
    },
    {
      title: "Umsetzung",
      text: "Arbeit mit festem Umfang oder ein dediziertes Team, geleitet von einem Senior Engineer.",
    },
  ],
};
