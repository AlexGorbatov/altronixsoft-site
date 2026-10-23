import type { Part } from "../content";

/** Deutsch: Startseite, Leistungen, Zusammenarbeit, Unternehmen, Prozess. */
export const hero: Part<"hero"> = {
  eyebrow: "Software-Engineering für Unternehmen",
  title: ["Komplexe Systeme.", "Klare Lösungen."],
  lead: "Wir entwickeln und modernisieren Software — von individuellen Plattformen und Integrationen bis zu SAP Commerce und KI-Lösungen.",
  leadMore: "Sie arbeiten direkt mit erfahrenen Engineers zusammen, von der Planung bis zum Launch.",
  facts: ["Von der Architektur bis zum Betrieb", "Klare Verantwortung. Transparente Umsetzung."],
};

export const navigation: Part<"navigation"> = [
  { label: "Leistungen" },
  { label: "Branchen" },
  { label: "Projekte" },
  { label: "Vorgehen" },
  { label: "Über uns" },
];

export const site: Part<"site"> = {
  title: "SAP Commerce, Java und KI-Entwicklung | Altronix Software",
  description:
    "Altronix Software entwickelt und modernisiert Unternehmenssoftware: Java/Spring, SAP Commerce Cloud, Integrationen und KI. Klare Verantwortung. Transparente Umsetzung.",
  tagline: "Komplexe Systeme. Klare Lösungen.",
};

export const services: Part<"services"> = [
  {
    title: "Individuelle Softwareentwicklung",
    shortTitle: "Individuelle Software",
    description: "Software, die auf Ihre Geschäftsprozesse zugeschnitten ist.",
    intro:
      "Wir konzipieren und entwickeln individuelle Software rund um Ihre Geschäftsprozesse, vom ersten MVP bis zum Produktivbetrieb: Webanwendungen, interne Plattformen, APIs und Integrationen.",
    metaDescription:
      "Individuelle Software für Ihre Geschäftsprozesse, vom MVP bis zum Produktivbetrieb: Web-Apps, interne Plattformen, APIs und Integrationen. Klare Verantwortung. Transparente Umsetzung.",
    capabilities: [
      "SaaS-Produkte",
      "Webanwendungen",
      "Interne Plattformen",
      "APIs",
      "Integrationen",
      "Vom MVP zum Produktivbetrieb",
    ],
    cta: { label: "Softwareentwicklung besprechen" },
  },
  {
    title: "Modernisierung und Integration",
    metaTitle: "Java/Spring-Modernisierung und Integration",
    shortTitle: "Modernisierung und Integration",
    description: "Bestehende Systeme modernisieren, ohne alles neu zu schreiben.",
    intro:
      "Wir verbessern die Systeme, die Ihr Geschäft heute tragen, ohne unnötige Neuentwicklungen: Java-/Spring-Modernisierung, Entwicklung und Support für SAP Commerce Cloud, Cloud-Migration und Enterprise-Integrationen.",
    metaDescription:
      "Bestehende Systeme ohne komplette Neuentwicklung modernisieren: Java/Spring, SAP Commerce Cloud, Cloud-Migration, Integrationen. Klare Verantwortung. Transparente Umsetzung.",
    capabilities: [
      "Java-/Spring-Modernisierung",
      "Entwicklung und Support für SAP Commerce Cloud",
      "Cloud-Migration",
      "Enterprise-Integrationen",
      "API-Architektur",
      "KI-Anbindung",
    ],
    cta: { label: "Modernisierung besprechen" },
  },
  {
    title: "KI-Lösungen und Automatisierung",
    metaTitle: "KI-Agenten, RAG und Workflow-Automatisierung",
    shortTitle: "KI und Automatisierung",
    description: "KI-Agenten, Suche und Dokumentenautomatisierung in Ihren Systemen.",
    intro:
      "Wir setzen KI dort ein, wo sie ein echtes Geschäftsproblem löst, und binden sie mit klaren Kontrollen an Ihre bestehenden Systeme an: Agenten, Retrieval über internes Wissen sowie Dokumenten- und Workflow-Automatisierung.",
    metaDescription:
      "KI-Agenten, Retrieval über internes Wissen, Dokumenten- und Workflow-Automatisierung, mit Kontrollen an Ihre Systeme angebunden. Klare Verantwortung. Transparente Umsetzung.",
    capabilities: [
      "KI-Agenten",
      "RAG und Wissenssysteme",
      "Dokumentenautomatisierung",
      "Workflow-Automatisierung",
      "LLM-Integrationen",
    ],
    cta: { label: "KI-Lösungen besprechen" },
  },
];

export const aiUseCases: Part<"aiUseCases"> = [
  { title: "Kundenservice", description: "Bestellstatus, Retouren, Richtlinienabfrage, Unterstützung für Servicemitarbeiter." },
  { title: "Wissensassistent", description: "Sichere Suche in internem Wissen und in Richtlinien." },
  { title: "Dokumentenautomatisierung", description: "Geschäftsdokumente auslesen, prüfen und verarbeiten." },
  { title: "Workflow-Agenten", description: "Systeme und Menschen zu kontrollierten Abläufen verbinden." },
];

export const industries: Part<"industries"> = [
  { title: "Retail & E-Commerce", line: "Commerce-Plattformen, Produktkataloge, SAP Commerce Cloud und Enterprise-Integrationen." },
  { title: "Logistik & Lieferkette", line: "Operative Plattformen, Backend-Systeme, Workflow-Automatisierung und API-Integrationen." },
  { title: "Technologie & SaaS", line: "Individuelle Softwareprodukte, Cloud-Plattformen und KI-gestützte Geschäftsanwendungen." },
  { title: "Blockchain & Web3", line: "Blockchain-Infrastruktur, Multi-Chain-APIs, Datenaggregation und Integrationen dezentraler Anwendungen." },
  { title: "Gaming & digitale Unterhaltung", line: "Integrationen von Gaming-Plattformen, Tracking der Spieleraktivität, Kampagnensysteme und Backend-Services." },
];

export const engagementModels: Part<"engagementModels"> = [
  {
    title: "Technisches Review",
    description:
      "Eine kurze, fokussierte Prüfung Ihrer Architektur, Ihres Codes oder Ihrer Idee. Der erste kostenpflichtige Schritt.",
    outcome: "Klare Erkenntnisse, ein schriftlicher Bericht und ein Gespräch zur Erläuterung.",
    cta: { label: "Review anfragen" },
  },
  {
    title: "Proof of Value",
    description: "Ein kleiner funktionierender Prototyp auf Ihren eigenen Daten, bevor Sie größer investieren.",
    outcome: "Ein funktionierender Prototyp und eine Go-/No-go-Empfehlung.",
    cta: { label: "Proof of Value planen" },
  },
  {
    title: "Projekt mit festem Umfang",
    description:
      "Vereinbarter Umfang, Zeitplan und Ergebnis. Code und Dokumentation werden am Ende übergeben.",
    outcome: "Ein Release im Produktivbetrieb.",
    cta: { label: "Projekt planen" },
  },
  {
    title: "Dediziertes Team",
    description:
      "Senior Engineers, eingebettet in Ihr Produktteam, langfristig oder für einen festgelegten Zeitraum.",
    outcome: "Engineers, die in Ihrem Team arbeiten.",
    cta: { label: "Dediziertes Team besprechen" },
  },
];

export const checkup: Part<"checkup"> = {
  title: "Architektur-Check-up",
  meta: "Unverbindlich",
  text: "Ein Gespräch, in dem wir Ihr System ansehen und entscheiden, ob ein Technisches Review sinnvoll ist. Keine Vorbereitung nötig.",
  cta: { label: "Check-up anfragen" },
};

export const about: Part<"about"> = {
  eyebrow: "Über uns",
  title: "Senior Engineers für Unternehmen und ambitionierte Startups.",
  lead: "Altronix Software ist ein Engineering-Unternehmen unter der Leitung von Enterprise-Architekten. Startups bringen uns ein Produkt, das wir vom MVP bis zum Produktivbetrieb führen. Unternehmen bringen uns Systeme, die wir modernisieren, integrieren und betreuen. KI ist Teil mancher Systeme, nicht der Ausgangspunkt.",
  stats: [{ value: "Seit 2023", label: "in der Zusammenarbeit mit Kunden" }],
  operateTitle: "So arbeiten wir",
  operate: [
    {
      title: "Ein Senior Engineer leitet jedes Projekt.",
      text: "Sie arbeiten direkt mit der Person, die für die Umsetzung verantwortlich ist.",
    },
    {
      title: "Zuerst das Review.",
      text: "Ein Review oder Proof of Value mit festem Umfang kommt vor jeder größeren Verpflichtung.",
    },
    {
      title: "NDA vor Arbeitsbeginn.",
      text: "Wir unterzeichnen eine Vertraulichkeitsvereinbarung, bevor wir an Ihrem System arbeiten.",
    },
    {
      title: "Sie erhalten Code und Dokumentation.",
      text: "Die Übergabe erfolgt nach den Vertragsbedingungen.",
    },
    {
      title: "Schriftliche Kommunikation.",
      text: "Regelmäßige Statusberichte und dokumentierte Entscheidungen.",
    },
  ],
};

export const processPhases: Part<"processPhases"> = [
  { title: "Verstehen", description: "Geschäftsziel, aktueller Ablauf, Rahmenbedingungen und Erfolgskriterien." },
  { title: "Entwerfen", description: "Architektur, Integrationen, Lieferplan und der kleinste sinnvolle Umfang." },
  { title: "Bauen und belegen", description: "Funktionierende Software, getestet mit Ihren Daten und Ihren Nutzern." },
  { title: "Starten und verbessern", description: "Livegang, Monitoring, Support und die nächste Iteration." },
];

export const requestTypes: Part<"requestTypes"> = [
  { label: "Architektur-Check-up" },
  { label: "Technisches Review" },
  { label: "Proof of Value" },
  { label: "Projekt mit festem Umfang" },
  { label: "Dediziertes Team" },
  { label: "Sonstiges" },
];

/** Beschriftungen im Diagramm der Startseite; Reihenfolge wie im Original. */
export const flowNodes: Part<"flowNodes"> = [
  { label: "Anfrage erhalten", sub: "Auslöser" },
  { label: "KI-Agent", sub: "Versteht die Anfrage" },
  { label: "KI-Agent", sub: "Versteht die Anfrage" },
  { label: "KI-Agent", sub: "Versteht die Anfrage" },
  { label: "Prüft ERP", sub: "Aufträge und Bestand" },
  { label: "Prüft CRM", sub: "Kundenhistorie" },
  { label: "Prüft Dokumente", sub: "Richtlinien" },
  { label: "Geschäftsregeln", sub: "Freigabe durch Menschen" },
  { label: "Aktion ausgeführt", sub: "Protokolliert" },
];
