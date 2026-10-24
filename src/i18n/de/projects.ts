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
    relationship: "Erfahrung aus einem kommerziellen Projekt",
    contribution: "Die beschriebene Arbeit umfasst Backend und Integrationen in einem fünfköpfigen Projektteam: Datenaustausch mit Drittsystemen, Storefront-APIs, Suche, Aktionen, Checkout und Delivery-Werkzeuge.",
    context: "Händler für Möbel und Wohndekoration in Deutschland.",
    challenge:
      "Die SAP-Hybris-Plattform an externe Drittsysteme anbinden, große Datenmengen einspielen und ein hochbelastetes Produktivsystem stabil halten.",
    whatWeDid:
      "Integrationen mit Drittsystemen wurden über REST- und SOAP-Webservices umgesetzt und große Datenmengen über den Data Hub in die Plattform geladen. Konfiguriert wurden die OCC-Webservices, die Benutzer-, Konto-, Warenkorb- und Bestelldaten für das Frontend bereitstellen. Die Solr-Suche wurde um neue Filter für die Produktlisten, die Extraktion von Kategorien und Facetten erweitert. Vorlagen für Aktionsregeln und der Prozess der E-Mail-Benachrichtigungen wurden angepasst. Die CI/CD-Pipeline und die Nightly Builds wurden eingerichtet und verbessert, der Checkout und die Warenkorbverwaltung angepasst, eine angemessene Testabdeckung sichergestellt sowie Produktionsprobleme und Fehler behoben. Das Team arbeitete nach Scrum, mit regelmäßigen Code-Reviews und Mentoring.",
    result:
      "Funktionen wurden dank des CI/CD-Prozesses pünktlich geliefert, und die Plattform blieb unter hoher Last stabil.",
    duration: "5 Monate",
    team: "5 Personen",
    focus: "OCC-Webservices, Solr-Suche und Aktionsregeln",
  },
  {
    ...pim,
    relationship: "Referenzimplementierung des Studios",
    contribution: "Eine Referenzimplementierung von AltronixSoft für den Import von Lieferantenkatalogen, Produktdaten-Mapping und die Synchronisierung mit dem Shop.",
    role: "Backend- und Integrationsentwicklung",
    focus: "Datenflüsse und Workflow-Integrität",
  },
  {
    ...logistics,
    relationship: "Referenzimplementierung des Studios",
    contribution: "Eine Referenzimplementierung von AltronixSoft für ein Logistik-CRM-Backend, API-Verträge, Bildspeicherung und geplante Verarbeitung.",
    role: "Backend-Entwicklung",
    focus: "Operative Workflows und API-Design",
  },
  {
    ...nexus,
    relationship: "Partnerprodukt · GeroWallet / A.D. Labs",
    contribution: "AltronixSoft war an der Engineering-Arbeit an diesem Partnerprodukt beteiligt. Die folgenden API-Funktionen und die Architektur beschreiben die umfassendere Nexus-Plattform.",
    context: "Blockchain-Infrastruktur für Wallets, dApps, Börsen und KI-Agenten auf Cardano, Bitcoin und Midnight.",
    challenge:
      "Wallets, dApps und KI-Agenten einen verlässlichen Zugang zu drei verschiedenen Blockchains geben: Chain-Daten, Marktdaten und Transaktionen hinter einer Basis-URL und einem Authentifizierungsheader, mit Schlüsseln für eine bestimmte Chain und ein Netzwerk, ohne Abhängigkeit von einem einzelnen Upstream-Provider und ohne jemals die privaten Schlüssel der Nutzer zu halten.",
    whatWeDid: "Eine einheitliche API verbindet drei Blockchains, mehrere Datenanbieter und verschiedene Zugangswege. Der Engineering-Ansatz umfasst fünf Bereiche.",
    workItems: [
      {
        title: "Eine API für drei Chains",
        text: "Cardano, Bitcoin und Midnight nutzen eine Basis-URL und den Authentifizierungsheader X-Api-Key. Jeder Schlüssel gilt für eine Chain und ein Netzwerk."
      },
      {
        title: "Provider-Routing und Caching",
        text: "Anfragen werden über Yaci, Koios, Blockfrost und die Indexer der Plattform bedient. Health Checks pro Provider wählen für jeden Aufruf einen gesunden Upstream; häufig angefragte Daten kommen aus dem Cache."
      },
      {
        title: "Daten und Analysen",
        text: "Die API bietet Chain-Daten in zehn Endpunktgruppen, Marktdaten über 11 Cardano-DEXes, Wallet-Analysen und Swap-Routing zum besten Preis."
      },
      {
        title: "Transaktionen ohne Schlüsselverwahrung",
        text: "Der serverseitige Transaktionsaufbau liefert unsigniertes CBOR. Signiert wird auf dem Client; private Schlüssel erreichen die Plattform nicht."
      },
      {
        title: "Zugang für Entwickler und Agenten",
        text: "Anwendungen nutzen REST und WebSocket-Streaming; ein gehosteter MCP-Server bietet KI-Agenten dieselben Daten. Eine OpenAPI-3.1-Spezifikation beschreibt die Endpunkte und dient zur Generierung eines typisierten TypeScript-SDKs."
      }
    ],
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
  {
    relationship: "Partnerprojekt · Lobby9",
    contribution: "AltronixSoft war an der Engineering-Arbeit an der Plattform beteiligt. Spielerprofil, Integrationen und Community-Funktionen beschreiben Lobby9 als Ganzes.",
  },
  {
    relationship: "Referenzimplementierung des Studios",
    contribution: "Eine Referenzimplementierung von AltronixSoft für kontrollierte E-Mail-Angebotsprozesse, deterministische Preisberechnung und menschliche Freigabe.",
  },
  {
    relationship: "Referenzimplementierung des Studios",
    contribution: "Eine Referenzimplementierung von AltronixSoft für Dokumenten-Retrieval mit Zugriffskontrollen und Antworten mit Verweisen auf erlaubte Quellen.",
  },
  {
    relationship: "Referenzimplementierung des Studios",
    contribution: "Eine Referenzimplementierung von AltronixSoft für ereignisgesteuerte Bestellungen und Zahlungen, Idempotenz und Wiederherstellungsszenarien im Stripe-Testmodus.",
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
    "Referenzimplementierungen zum Erproben von Architektur, Integrationsmustern und neuen Technologien, einschließlich KI.",
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
  problems: [
      "Suche, Checkout oder Aktionen einer bestehenden SAP-Commerce-Plattform müssen angepasst werden.",
      "ERP-, PIM- und Drittsysteme brauchen zuverlässige APIs oder Produktdatenimporte.",
      "Ein laufendes Commerce-System braucht Wartung, ein Upgrade oder eine geplante Cloud-Migration."
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
      text: "Ein vereinbarter Umfang und ein Projektteam mit den benötigten Fähigkeiten, mit direkter technischer Verantwortung.",
    },
  ],
};
