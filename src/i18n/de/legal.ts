import { siteConfig } from "@/data/site";
import type { Part } from "../content";

/**
 * Deutsch: Datenschutzerklärung und der Bereich Support/Sicherheit. Offene Platzhalter (TODO) bleiben bewusst
 * englisch und unsichtbar, bis sie im englischen Quelltext ausgefüllt werden. Der Rechtstext sollte vor dem Start
 * von einer deutschsprachigen Fachperson geprüft werden.
 */
export const privacy: Part<"privacy"> = {
  title: "Datenschutzerklärung",
  intro: `Diese Erklärung beschreibt, welche personenbezogenen Daten ${siteConfig.legalName} („wir“) über diese Website erhebt, warum wir sie verarbeiten und welche Rechte Sie haben.`,
  updated: "21. Oktober 2026",
  updatedLabel: "Zuletzt aktualisiert",
  backHome: "Zurück zur Startseite",
  metaDescription: `Wie ${siteConfig.legalName} personenbezogene Daten verarbeitet, die über das Kontaktformular gesendet werden.`,
  sections: [
    {
      title: "Wer verantwortlich ist",
      body: [
        `${siteConfig.legalName}, ein in Estland eingetragenes Unternehmen, ist Verantwortlicher für die hier beschriebenen personenbezogenen Daten.`,
        `Registernummer: ${siteConfig.legal.registryCode}`,
        `Adresse: ${siteConfig.legal.address}, Estland`,
        `Sie erreichen uns unter ${siteConfig.email}.`,
      ],
    },
    {
      title: "Welche Daten wir erheben",
      body: ["Nur das, was Sie uns über das Kontaktformular oder per E-Mail senden:"],
      bullets: ["Ihr Name und Ihre E-Mail-Adresse", "Ihr Unternehmen (optional)", "Die Art der Anfrage und Ihre Nachricht"],
    },
    {
      title: "Technische Daten",
      body: [
        "Wenn Sie diese Website besuchen, verarbeitet unser Hosting-Anbieter technische Daten wie Ihre IP-Adresse und Anfragedetails in Server-Logs, damit die Website ausgeliefert und abgesichert werden kann. Rechtsgrundlage ist unser berechtigtes Interesse am Betrieb und Schutz der Website (Art. 6 Abs. 1 lit. f DSGVO).",
        "Wenn Sie das Formular absenden, nutzen wir Ihre IP-Adresse außerdem kurzzeitig und nur im Arbeitsspeicher, um wiederholte Absendungen zu begrenzen. Sie wird nicht zusammen mit Ihrer Nachricht gespeichert und nicht an unser Postfach gesendet.",
      ],
    },
    {
      title: "Wozu wir die Daten nutzen und auf welcher Grundlage",
      body: [
        "Wir nutzen diese Angaben ausschließlich, um Ihre Anfrage zu lesen und zu beantworten und, wenn Sie es wünschen, ein Angebot vorzubereiten. Rechtsgrundlage sind Maßnahmen auf Ihre Anfrage vor einem möglichen Vertragsschluss und unser berechtigtes Interesse an der Beantwortung geschäftlicher Anfragen (Art. 6 Abs. 1 lit. b und f DSGVO). Das Kästchen im Formular bestätigt nur, dass Sie diese Erklärung gelesen haben.",
        "Wir verwenden Ihre Angaben nicht für Newsletter oder Werbung und verkaufen sie nicht.",
      ],
    },
    {
      title: "Wie lange wir sie speichern",
      body: [
        "Wir speichern Anfragen nur so lange, wie es für die Bearbeitung der Anfrage und eine daraus entstehende Geschäftsbeziehung nötig ist, und löschen sie danach.",
      ],
    },
    {
      title: "Wer sie erhält",
      body: [
        "Ihre Nachricht wird von einem E-Mail-Zustelldienst in unserem Auftrag in unser Postfach zugestellt. Wir geben sie an niemanden sonst weiter, außer wenn das Gesetz es verlangt.",
      ],
    },
    {
      title: "Übermittlung außerhalb des EWR",
      body: [
        "Wir übermitteln personenbezogene Daten nur dann außerhalb des Europäischen Wirtschaftsraums, wenn geeignete Garantien bestehen, etwa ein Angemessenheitsbeschluss der Europäischen Kommission oder die EU-Standardvertragsklauseln.",
      ],
    },
    {
      title: "Cookies und Analyse",
      body: [
        "Diese Website setzt keine Cookies und nutzt keine Analyse- oder Werbe-Tracker. Sollte sich das ändern, aktualisieren wir diese Erklärung und holen Ihre Einwilligung ein, wo das Gesetz es verlangt.",
      ],
    },
    {
      title: "Ihre Rechte",
      body: [
        "Sie können jederzeit Auskunft über Ihre Daten verlangen, sie berichtigen oder löschen lassen, ihre Verarbeitung einschränken oder ihr widersprechen und eine Kopie erhalten. Schreiben Sie uns, wir antworten innerhalb der gesetzlichen Fristen.",
        "Wo wir uns für irgendetwas auf Ihre Einwilligung stützen, können Sie sie jederzeit widerrufen. Der Widerruf berührt die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung nicht.",
        "Sie können sich außerdem bei der estnischen Datenschutzbehörde (Andmekaitse Inspektsioon, www.aki.ee) oder bei der Aufsichtsbehörde in Ihrem Land beschweren.",
      ],
    },
  ],
};

export const trust: Part<"trust"> = {
  eyebrow: "Support und Sicherheit",
  title: "Was nach dem Livegang passiert und wie wir mit Ihren Daten umgehen.",
  blocks: [
    {
      title: "Support",
      intro: "Wer antwortet, wie schnell und über welchen Kanal.",
      items: [{ title: "Reaktionszeit" }, { title: "Erreichbarkeit" }, { title: "Kanäle" }, { title: "Kontinuität" }],
    },
    {
      title: "Sicherheit",
      intro: "Wie wir mit Ihrem Code, Ihren Systemen und Ihren Daten umgehen.",
      items: [{ title: "Vertraulichkeit" }, { title: "Zugriff" }, { title: "Code und Daten" }, { title: "Compliance" }],
    },
  ],
};
