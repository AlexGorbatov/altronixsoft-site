import type { Part } from "../content";

/** Deutsch: Startseite, Leistungen, Zusammenarbeit, Unternehmen, Prozess. */
export const hero: Part<"hero"> = {
  eyebrow: "Unabhängiges Software-Engineering-Studio",
  title: ["Komplexe Aufgaben.", "Klare Lösungen."],
  lead: "Wir entwickeln, integrieren und modernisieren komplexe Software: individuelle Plattformen, Java-/Spring-Services, SAP Commerce und KI-Anbindung.",
  leadMore: "Sie arbeiten direkt mit den für die Umsetzung verantwortlichen Engineers. Weitere Spezialisten kommen entsprechend dem Projektbedarf hinzu.",
  facts: ["Direkte technische Verantwortung", "Teams nach Projektbedarf"],
};

export const navigation: Part<"navigation"> = [
  { label: "Leistungen" },
  { label: "KI-Integration" },
  { label: "Branchen" },
  { label: "Projekte" },
  { label: "Vorgehen" },
  { label: "Über uns" },
];

export const site: Part<"site"> = {
  title: "Unabhängiges Software-Engineering-Studio | AltronixSoft",
  description:
    "Unabhängiges Engineering-Studio für individuelle Software, Java/Spring, Integrationen, Modernisierung, SAP Commerce und KI. Direkte technische Verantwortung.",
  tagline: "Komplexe Aufgaben. Klare Lösungen.",
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
    problems: [
      "Ein Produkt oder interner Ablauf braucht eine passende Anwendung, ein Backend oder eine API.",
      "Geschäftsdaten sind auf Werkzeuge verteilt, die zusammenarbeiten müssen.",
      "Ein MVP braucht einen praktikablen Weg zu einem wartbaren Produktivsystem."
    ],
    deliverables: [
      {
        title: "Anwendungen und Plattformen",
        text: "SaaS-Produkte, interne Plattformen und Webanwendungen für den konkreten Ablauf und seine Nutzer."
      },
      {
        title: "Backend und APIs",
        text: "Java-/Spring-Services, API-Verträge, Zugriffskontrollen und die Geschäftslogik der Anwendung."
      },
      {
        title: "Integration und Umsetzung",
        text: "Anbindungen an bestehende Systeme, automatisierte Tests, Deployment-Abläufe und Dokumentation für die Übergabe."
      }
    ],
    start: "Ausgangspunkt sind Geschäftsablauf, vorhandene Systeme und Erfolgskriterien. Ein Check-up oder klar abgegrenztes technisches Review bestimmt das kleinste nützliche Release, Integrationsgrenzen und den nächsten Umsetzungsschritt.",
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
    problems: [
      "Änderungen dauern zu lange, weil Abhängigkeiten, Anwendungsgrenzen oder Integrationen schwer wartbar sind.",
      "Ein Java-/Spring- oder SAP-Commerce-System soll sich weiterentwickeln, ohne alles gleichzeitig zu ersetzen.",
      "Commerce-, Produktdaten- und operative Systeme brauchen einen verlässlicheren Datenaustausch."
    ],
    deliverables: [
      {
        title: "Schrittweise Modernisierung",
        text: "Bestehende Architektur und Abhängigkeiten prüfen, dann Änderungen mit klaren Grenzen und Regressionstests planen."
      },
      {
        title: "Systemintegrationen",
        text: "REST- und SOAP-APIs, Produktdatenimporte und Synchronisierung zwischen Commerce-, PIM- und operativen Systemen."
      },
      {
        title: "Wartung im Betrieb",
        text: "Gezielte Fehlerbehebungen, Verbesserungen an Suche und Checkout, CI/CD-Anpassungen und Unterstützung geplanter Cloud-Migrationen."
      }
    ],
    start: "Ausgangspunkt sind die bestehende Architektur, die blockierte Änderung und betriebliche Grenzen. Ein technisches Review klärt, was geändert werden sollte, was bestehen bleibt und wie der Übergang überprüft wird.",
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
    title: "KI-Integration und Automatisierung",
    metaTitle: "KI-Agenten, RAG und Workflow-Automatisierung",
    shortTitle: "KI und Automatisierung",
    description: "KI-Agenten, Suche und Dokumentenautomatisierung in Ihren Systemen.",
    intro:
      "Wir setzen KI dort ein, wo sie ein echtes Geschäftsproblem löst, und binden sie mit klaren Kontrollen an Ihre bestehenden Systeme an: Agenten, Retrieval über internes Wissen sowie Dokumenten- und Workflow-Automatisierung.",
    metaDescription:
      "KI-Agenten, Retrieval über internes Wissen, Dokumenten- und Workflow-Automatisierung, mit Kontrollen an Ihre Systeme angebunden. Klare Verantwortung. Transparente Umsetzung.",
    problems: [
      "Mitarbeiter brauchen Antworten aus internen Dokumenten, ohne zusätzliche Zugriffsrechte zu erhalten.",
      "Ein wiederkehrender E-Mail- oder Dokumentenablauf braucht Datenextraktion, Validierung und kontrollierte Folgeaktionen.",
      "Ein KI-Prototyp soll mit Freigaberegeln und nachvollziehbarer Fehlerbehandlung an reale Systeme angebunden werden."
    ],
    deliverables: [
      {
        title: "Wissen und Retrieval",
        text: "RAG über interne Dokumente mit Zugriffsfiltern während der Suche und Quellenverweisen in den Antworten."
      },
      {
        title: "Workflow-Integration",
        text: "Agenten und LLM-Anbindungen an bestehende APIs und Werkzeuge, mit Geschäftsregeln und menschlicher Freigabe bei Bedarf."
      },
      {
        title: "Evaluation und Kontrollen",
        text: "Repräsentative Evaluationsfälle, Audit-Protokolle, deterministische Geschäftsberechnungen und Prüfungen nicht vertrauenswürdiger Eingaben."
      }
    ],
    start: "Ausgangspunkt sind ein begrenzter Ablauf, repräsentative Daten und ein Maßstab für Korrektheit. Das erste Review oder der Proof of value legt Zugriffsrechte, Freigabepunkte und Fehlerfälle vor der größeren Umsetzung fest.",
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
  { title: "Technologie und SaaS", line: "Individuelle Softwareprodukte, Cloud-Plattformen und KI-gestützte Geschäftsanwendungen." },
  { title: "Logistik und Lieferkette", line: "Operative Plattformen, Backend-Systeme, Workflow-Automatisierung und API-Integrationen." },
  { title: "Retail und E-Commerce", line: "Commerce-Plattformen, Produktkataloge, SAP Commerce Cloud und Enterprise-Integrationen." },
];

export const engagementModels: Part<"engagementModels"> = [
  {
    title: "Technisches Review",
    description:
      "Brauchen Sie eine fachliche Einschätzung Ihres Systems?",
    outcome: "Schriftliche Ergebnisse und ein empfohlener Umfang.",
    cta: { label: "Review anfragen" },
  },
  {
    title: "Proof of value",
    description: "Möchten Sie eine KI-Idee mit echten Daten testen?",
    outcome: "Ein lauffähiger Prototyp und eine Go-/No-go-Empfehlung.",
    cta: { label: "Proof of value planen" },
  },
  {
    title: "Projekt mit festem Umfang",
    description:
      "Wissen Sie, was gebaut werden soll?",
    outcome: "Vereinbarter Umfang und Zeitplan, Release in Produktion.",
    cta: { label: "Projekt planen" },
  },
  {
    title: "Dediziertes Team",
    description:
      "Brauchen Sie Entwickler in Ihrem Team?",
    outcome: "Senior Engineers, langfristig oder für einen festen Zeitraum.",
    cta: { label: "Dediziertes Team besprechen" },
  },
];

export const checkup: Part<"checkup"> = {
  title: "Architektur-Check-up",
  meta: "Unverbindlich",
  text: "Ein Gespräch, um Ihr System anzuschauen. Keine Vorbereitung nötig.",
  cta: { label: "Check-up anfragen" },
};

export const about: Part<"about"> = {
  eyebrow: "Über uns",
  title: "Ein fokussiertes Studio für komplexe Software.",
  lead: "AltronixSoft ist ein kleines, unabhängiges Software-Engineering-Studio. Praktische Erfahrung mit Java/Spring und Unternehmenssystemen bildet die Grundlage für individuelle Produkte, Integrationen und Modernisierung. Das Team richtet sich nach dem Arbeitsumfang; weitere Engineering-Spezialisten kommen bei Bedarf hinzu.",
  stats: [{ value: "Seit 2023", label: "in der Zusammenarbeit mit Kunden" }],
  operateTitle: "So arbeiten wir",
  operate: [
    {
      title: "Direkte technische Verantwortung.",
      text: "Sie arbeiten direkt mit dem Engineer, der den technischen Umfang und die Umsetzungsentscheidungen verantwortet.",
    },
    {
      title: "Spezialisten nach Bedarf.",
      text: "Weitere Engineering-Spezialisten kommen entsprechend dem Projektumfang hinzu, statt einer festen Teamstruktur zu folgen.",
    },
    {
      title: "Umfang und Vertraulichkeit zuerst.",
      text: "Arbeitsumfang, Zugriffsanforderungen und Vertraulichkeitsbedingungen werden vor der Umsetzung vereinbart.",
    },
    {
      title: "Sie erhalten Code und Dokumentation.",
      text: "Die Übergabe erfolgt nach den Vertragsbedingungen.",
    },
    {
      title: "Dokumentierte Entscheidungen.",
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
  { label: "Noch unklar" },
  { label: "Architektur-Check-up" },
  { label: "Technisches Review" },
  { label: "Proof of value" },
  { label: "Projekt mit festem Umfang" },
  { label: "Dediziertes Team" },
  { label: "Sonstiges" },
];

/** Beschriftungen im Diagramm der Startseite; Reihenfolge wie im Original. */
export const flowNodes: Part<"flowNodes"> = [
  { label: "Geschäftsbedarf", sub: "Eingangsdaten" },
  { label: "Software", sub: "Geschäftslogik" },
  { label: "Integration", sub: "APIs und Daten" },
  { label: "Automatisierung", sub: "Regeln und KI" },
  { label: "ERP und Commerce", sub: "Aufträge und Bestand" },
  { label: "CRM und APIs", sub: "Kundendaten" },
  { label: "Daten und Dokumente", sub: "Wissen und Richtlinien" },
  { label: "Umsetzungskontrolle", sub: "Tests und Freigaben" },
  { label: "Laufende Software", sub: "Betrieb und Monitoring" },
];
