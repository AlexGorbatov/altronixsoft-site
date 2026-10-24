/** The architecture diagram drawn for a project (see `ProjectScene`). */
export type ProjectVisual = "shop" | "pim" | "logistics" | "chain" | "lobby" | "agent" | "documents" | "payments";

export interface CaseStudy {
  /** URL slug of /work/[slug]. */
  slug: string;
  title: string;
  /** Which abstract diagram is drawn on the card (no real screenshots or client data). */
  visual: ProjectVisual;
  /** Short industry label, also used as the card's mono eyebrow. */
  industry: string;
  /** One-line summary for the card and the top of the case page. */
  summary: string;
  /** Industry and scale: users / orders / SKUs / countries. */
  context: string;
  challenge: string;
  /** Completed work, described neutrally: one paragraph, or the introduction to `workItems`. */
  whatWeDid: string;
  /** Verified project relationship, separate from product ownership or sole delivery. */
  relationship?: string;
  /** The recorded level of participation; never infer an unverified personal/company history. */
  contribution?: string;
  /** Search and sharing title (without the site name). Defaults to `title`. */
  metaTitle?: string;
  /** Search description, about 150–160 characters. Defaults to `summary`. */
  metaDescription?: string;
  /** The service page this case belongs to; the case page links to it. */
  relatedService?: "software" | "modernization" | "ai" | "sap-commerce";
  /** The work split into areas, each shown as its own block under "Work completed". */
  workItems?: { title: string; text: string }[];
  /** Measurable outcome. Cases without a filled `result` still render; dev mode warns about them. */
  result: string;
  stack: string[];
  duration: string;
  /** Team size, e.g. "5 people". Optional; hidden when empty. */
  team?: string;
  /** Our part in the engagement. Leave empty to hide the Role line. */
  role: string;
  /** What the engagement concentrated on. Known today, shown as highlights on the case page. */
  focus: string;
  /** The layers of the system, from the user down to the data, as listed on the case page. */
  architecture?: { title: string; text: string }[];
  /** The public product, when there is one: linked from the case page. */
  liveUrl?: string;
}

/**
 * Commercial, partner and reference project experience. Confidential client details are generalized; public product links and existing technical facts are retained.
 * Every `TODO(owner)` value is hidden on the site until it is replaced with a real fact
 * (see `filled()` in `src/lib/todo.ts`).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-ecommerce-platform",
    title: "SAP Commerce (Hybris) platform",
    visual: "shop",
    industry: "E-commerce",
    summary: "Integrations, Solr search, promotions and checkout on a high-load SAP Hybris store for a German furniture retailer.",
    relationship: "Commercial project experience",
    contribution: "The recorded work covers backend and integrations within a five-person project team: third-party data exchange, storefront APIs, search, promotions, checkout and delivery tooling.",
    context: "Furniture and home decor retailer in Germany.",
    challenge:
      "The retailer's SAP Hybris store had to exchange data with external third-party systems, take in large volumes of data, and stay stable under high production load while new features kept shipping.",
    whatWeDid:
      "A team of five worked on the store for five months, in Scrum, with regular code reviews and mentoring. The work covered six areas.",
    workItems: [
      {
        title: "Integrations and data",
        text: "REST and SOAP integrations with third-party systems, and large data volumes loaded into the platform through Data Hub.",
      },
      {
        title: "Storefront APIs",
        text: "OCC web services that serve user, account, cart and order data to the Spartacus frontend.",
      },
      {
        title: "Search",
        text: "Solr search extended with new product listing filters, category extraction and facets.",
      },
      {
        title: "Promotions and notifications",
        text: "Custom promotion rule templates and a reworked email notification process.",
      },
      {
        title: "Checkout",
        text: "A customized checkout flow and cart management.",
      },
      {
        title: "Delivery",
        text: "The CI/CD pipeline and nightly builds set up and improved, test coverage kept adequate, and production issues and bugs fixed.",
      },
    ],
    result: "Features were delivered on time through the CI/CD pipeline, and the platform stayed stable under high load.",
    stack: ["SAP Commerce (Hybris) 2011", "Java 11", "Spring", "OCC", "Spartacus", "Solr", "Data Hub", "CI/CD"],
    duration: "5 months",
    team: "5 people",
    role: "",
    focus: "Integrations, storefront APIs and search on a high-load store",
    metaDescription:
      "Integrations, OCC web services, Solr search and checkout enhancements for a high-load SAP Commerce (Hybris) store for a German furniture retailer.",
    relatedService: "sap-commerce",
    architecture: [
      {
        title: "Storefront",
        text: "The Spartacus frontend: product listings with search filters, the cart and the checkout.",
      },
      {
        title: "Storefront APIs",
        text: "OCC web services that serve users, accounts, carts and orders to the storefront.",
      },
      {
        title: "Commerce core",
        text: "SAP Commerce (Hybris) 2011 on Java 11 and Spring: cart and checkout, orders, promotion rules and email notifications.",
      },
      {
        title: "Search",
        text: "Solr, with product listing filters, category extraction and facets.",
      },
      {
        title: "Integrations and data",
        text: "REST and SOAP web services to third-party systems, and Data Hub for large data loads.",
      },
      {
        title: "Delivery",
        text: "A CI/CD pipeline with nightly builds and test coverage.",
      },
    ],
  },
  {
    slug: "product-information-platform",
    title: "PIM system for e-commerce",
    visual: "pim",
    industry: "E-commerce · PIM",
    summary: "Vendor catalogs in CSV, Excel, JSON and XML mapped into one product model and synced to the e-commerce storefront.",
    relationship: "Studio reference implementation",
    contribution: "An AltronixSoft reference implementation demonstrating vendor-catalog ingestion, product-data mapping and storefront synchronization.",
    context: "An AltronixSoft reference project: product information management (PIM) for an e-commerce storefront, fed by catalogs from multiple vendors.",
    challenge:
      "Vendors send their catalogs in their own formats and structures. The data has to become one unified product model, be imported in large batches, and reach the storefront with current products and stock.",
    whatWeDid:
      "The PIM import pipeline was implemented from vendor files through to products on the storefront. The work covered six areas.",
    workItems: [
      {
        title: "Ingestion pipeline",
        text: "A data ingestion pipeline that processes product catalogs from multiple vendors in CSV, Excel, JSON and XML.",
      },
      {
        title: "Import framework",
        text: "A flexible framework that maps, transforms and validates heterogeneous data into a unified product model.",
      },
      {
        title: "Vendor parsers",
        text: "Vendor-specific parsers, each driven by its own customizable mapping configuration.",
      },
      {
        title: "Asynchronous processing",
        text: "Imports run asynchronously on Spring Boot, Kafka and scheduled jobs, built for large batches.",
      },
      {
        title: "Storefront sync",
        text: "Real-time product sync and stock updates to the e-commerce storefront over REST APIs.",
      },
      {
        title: "Tested logic",
        text: "Unit and integration tests for the import logic, the business rules and the sync mechanisms.",
      },
    ],
    result: "",
    stack: ["Java 17", "Spring Boot", "Spring REST", "Apache Kafka", "MySQL", "Apache POI", "OpenCSV", "Lombok"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "Backend and integration engineering",
    focus: "A product import framework that turns vendor catalogs into one product model",
    metaDescription:
      "A PIM system for e-commerce: vendor catalogs in CSV, Excel, JSON and XML mapped into one product model with Spring Boot and Kafka, synced to the storefront.",
    relatedService: "modernization",
    architecture: [
      {
        title: "Vendor catalogs",
        text: "Product catalogs arrive from multiple vendors as CSV, Excel, JSON and XML files.",
      },
      {
        title: "Vendor parsers",
        text: "A parser per vendor with a customizable mapping configuration; Apache POI and OpenCSV read the Excel and CSV files.",
      },
      {
        title: "Import framework",
        text: "Mapping, transformation and validation turn heterogeneous data into the unified product model.",
      },
      {
        title: "Asynchronous processing",
        text: "Kafka and scheduled jobs run large batch imports in the background on Spring Boot.",
      },
      {
        title: "Product store",
        text: "The unified product model is stored in MySQL.",
      },
      {
        title: "Storefront sync",
        text: "Spring REST APIs sync products and stock updates to the e-commerce storefront in real time.",
      },
    ],
  },
  {
    slug: "logistics-operations-platform",
    title: "SaaS CRM for transport logistics",
    visual: "logistics",
    industry: "Logistics · SaaS CRM",
    summary: "A microservice SaaS CRM for transport logistics, with S3 image storage and scheduled emails and reports.",
    relationship: "Studio reference implementation",
    contribution: "An AltronixSoft reference implementation demonstrating a logistics CRM backend, API contracts, image storage and scheduled processing.",
    context: "An AltronixSoft reference project: a SaaS CRM platform for transport logistics companies.",
    challenge:
      "A transport logistics company needs a CRM delivered as SaaS: able to grow, safe to expose over APIs, able to handle high-resolution images, and able to send notifications and reports without anyone pressing a button.",
    whatWeDid:
      "The CRM platform's backend was designed and implemented. The work covered six areas.",
    workItems: [
      {
        title: "Microservice architecture",
        text: "A scalable microservice architecture for the CRM platform.",
      },
      {
        title: "REST APIs",
        text: "Secure and efficient REST APIs on Spring Boot.",
      },
      {
        title: "Image storage",
        text: "Integration with Amazon S3 for uploading and managing high-resolution images.",
      },
      {
        title: "Scheduled jobs",
        text: "Quartz jobs for automated email notifications and report generation.",
      },
      {
        title: "API contracts",
        text: "API contracts in OpenAPI/Swagger, defined together with the frontend developers.",
      },
      {
        title: "Tested code",
        text: "Unit and integration tests with JUnit and Mockito, for high code quality.",
      },
    ],
    result: "",
    stack: ["Java 17", "Spring Boot", "Spring REST", "MySQL", "Amazon S3", "Quartz", "Apache POI", "OpenCSV", "Lombok"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "Backend engineering",
    focus: "Microservices, REST APIs and scheduled jobs for a SaaS CRM",
    metaDescription:
      "A microservice SaaS CRM for transport logistics: Spring Boot REST APIs, Amazon S3 image storage and Quartz jobs for scheduled email notifications and reports.",
    relatedService: "software",
    architecture: [
      {
        title: "Web app",
        text: "The SaaS frontend, built against an OpenAPI/Swagger contract agreed with the backend team.",
      },
      {
        title: "REST APIs",
        text: "Secure and efficient REST APIs on Spring Boot and Spring REST.",
      },
      {
        title: "CRM microservices",
        text: "The CRM split into services that are designed to scale.",
      },
      {
        title: "Quartz scheduler",
        text: "Scheduled jobs trigger automated email notifications and generate reports.",
      },
      {
        title: "Amazon S3",
        text: "High-resolution images are uploaded to and managed in Amazon S3.",
      },
      {
        title: "MySQL",
        text: "The CRM's data is stored in MySQL.",
      },
    ],
  },
  {
    slug: "nexus",
    title: "Nexus",
    visual: "chain",
    industry: "Blockchain · Data API",
    summary: "Managed multi-chain data and transaction API for Cardano, Midnight and Bitcoin, with provider failover and OpenAPI 3.1.",
    relationship: "Partner product · GeroWallet / A.D. Labs",
    contribution: "AltronixSoft participated in engineering work on this partner product. The API capabilities and architecture below describe the wider Nexus platform.",
    context: "Blockchain infrastructure for wallets, dApps, exchanges and AI agents on Cardano, Bitcoin and Midnight.",
    challenge:
      "Give wallets, dApps and AI agents one dependable way into three different blockchains: chain data, market data and transactions behind one base URL and one authentication header, with keys scoped by chain and network, without depending on a single upstream provider and without ever holding a user's private keys.",
    whatWeDid: "A common API surface connects three blockchains, multiple upstream providers and several access channels. The engineering approach covers five areas.",
    workItems: [
      {
        title: "One API across three chains",
        text: "Cardano, Bitcoin and Midnight share one base URL and the X-Api-Key authentication header. Each API key is scoped to one chain and one network."
      },
      {
        title: "Provider routing and caching",
        text: "Requests are served through Yaci, Koios, Blockfrost and the platform's own indexers. Per-provider health checks select a healthy upstream for each call; frequently requested data is served from cache."
      },
      {
        title: "Data and analytics",
        text: "The API exposes chain data in ten endpoint groups, market data across 11 Cardano DEXes, wallet analytics and best-price swap routing."
      },
      {
        title: "Non-custodial transactions",
        text: "Server-side transaction building returns unsigned CBOR. Transactions are signed on the client, so private keys never reach the platform."
      },
      {
        title: "Developer and agent access",
        text: "REST and WebSocket streaming serve applications; a hosted MCP server exposes the same data to AI agents. An OpenAPI 3.1 specification describes the endpoints and generates a typed TypeScript SDK."
      }
    ],
    result:
      "The client's own non-custodial wallet runs on the platform in production: its swap routing, market data and transaction building go through the same API that external developers use.",
    stack: ["Cardano", "Bitcoin", "Midnight", "REST", "WebSocket", "MCP", "OpenAPI 3.1", "TypeScript SDK", "Kubernetes", "PostgreSQL"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "",
    focus: "Multi-provider failover, one API surface across three chains, and non-custodial transaction building",
    metaTitle: "Nexus multi-chain API",
    metaDescription:
      "Nexus is a managed multi-chain API for Cardano, Midnight and Bitcoin: provider failover, OpenAPI 3.1 and one account across chains. See how it is built.",
    relatedService: "software",
    architecture: [
      {
        title: "Clients",
        text: "Wallets, dApps, exchanges and AI agents connect over REST, WebSocket streaming or the hosted MCP server, with the typed TypeScript SDK or any HTTP client.",
      },
      {
        title: "One API surface",
        text: "One base URL and one X-Api-Key header for every chain. Each key is scoped to one chain and one network, and an OpenAPI 3.1 spec with a live playground describes every endpoint.",
      },
      {
        title: "Products",
        text: "Chain data, market data across 11 Cardano DEXes, wallet analytics, best-price swap routing and server-side transaction building.",
      },
      {
        title: "Routing and cache",
        text: "Health checks per provider pick a healthy upstream for every call and route around a degraded one. Hot data is served from cache, and usage is counted per key.",
      },
      {
        title: "Upstreams and chains",
        text: "Yaci, Koios, Blockfrost and the platform's own indexers, over Cardano, Bitcoin and Midnight.",
      },
      {
        title: "Non-custodial by design",
        text: "Transactions are built unsigned and signed on the client, so private keys never reach the platform.",
      },
    ],
    liveUrl: "https://nexus.gerowallet.io/",
  },
  {
    slug: "lobby9",
    title: "Lobby9",
    visual: "lobby",
    industry: "Gaming · Social platform",
    summary: "One gamer profile from linked PlayStation and Steam accounts, with stats, achievements, guides and campaigns.",
    relationship: "Partner project · Lobby9",
    contribution: "AltronixSoft participated in engineering work on the platform. The gamer profile, integrations and community capabilities below describe Lobby9 as a whole.",
    context: "A web platform for gamers who play across PlayStation, Steam and Xbox.",
    challenge:
      "A player's history is split across consoles and apps: each platform shows only its own part. The platform had to bring it into one profile that fills itself from the linked accounts, and build a community around it.",
    whatWeDid:
      "Account linking, progress aggregation and community features were implemented around a unified gamer profile. The work covered six areas.",
    workItems: [
      {
        title: "Account linking",
        text: "PlayStation and Steam accounts connected to a Lobby9 profile, with Xbox next on the roadmap.",
      },
      {
        title: "Unified profile",
        text: "Games, progress, stats and achievements from every linked account, gathered in one profile.",
      },
      {
        title: "Social cards",
        text: "A card generated from the player's progress, ready to share.",
      },
      {
        title: "Feed and guides",
        text: "A feed of guides, unlocked achievements and leaderboard places from the community.",
      },
      {
        title: "Discussions",
        text: "Threads where players talk about games and start their own.",
      },
      {
        title: "Campaigns",
        text: "Contests such as the guides campaign: create an account, connect a platform and share guides.",
      },
    ],
    result:
      "The platform is live: players link PlayStation and Steam, get their profile built from their play, and publish guides to the community feed.",
    // Owner to add: the platform's own technology stack. Only the public integrations are listed until then.
    stack: ["PlayStation", "Steam"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "",
    focus: "Account linking, a unified gamer profile and community features",
    metaTitle: "Lobby9 gamer profile platform",
    metaDescription:
      "Lobby9 links PlayStation and Steam accounts into one gamer profile with stats, achievements, guides and campaigns. See the platform architecture.",
    relatedService: "software",
    architecture: [
      {
        title: "Players",
        text: "Gamers on the web: their profile, the feed, games, discussions and campaigns.",
      },
      {
        title: "Platform connections",
        text: "PlayStation and Steam accounts linked to the profile; Xbox is on the roadmap.",
      },
      {
        title: "Unified profile",
        text: "Games, progress, stats and achievements from every linked account, in one place.",
      },
      {
        title: "Community",
        text: "The feed of guides and achievements, discussions, and the Hall of Fame with leaderboard places.",
      },
      {
        title: "Engagement",
        text: "Campaigns and contests, and social cards that let players share their progress.",
      },
      {
        title: "Roadmap",
        text: "Next: a level system, Xbox, communities around games, a Battle Pass and an AI Copilot.",
      },
    ],
    liveUrl: "https://www.lobby9.com/",
  },
  {
    slug: "ai-business-workflow-agent",
    title: "AI Business Workflow Agent",
    visual: "agent",
    industry: "AI · Agents",
    summary: "Email in, approved freight quote out: a durable Spring AI workflow where code, not the model, sets every price.",
    relationship: "Studio reference implementation",
    contribution: "An AltronixSoft reference implementation demonstrating controlled email-to-quote automation, deterministic pricing and human approval.",
    context: "An AltronixSoft reference project: freight quote requests that arrive by email, in several languages.",
    challenge:
      "A freight quote request arrives as free text, and a wrong or manipulated price costs money. The agent had to answer with a correct price in seconds, ask a person when it should, and never let an email talk it into a discount.",
    whatWeDid:
      "A durable workflow was implemented with a clear separation of responsibilities: the language model reads and writes text, and code computes every number. The work covered six areas.",
    workItems: [
      {
        title: "Understanding the email",
        text: "A model reads the request in any of five languages and extracts the cargo, lane and date. If something is missing, the agent asks only for that and resumes the same request when the customer answers in the thread.",
      },
      {
        title: "Enrichment and pricing",
        text: "The customer is looked up in the CRM over MCP, and the lane is priced in code from carrier rates. The model never sets a price.",
      },
      {
        title: "Policy and approval",
        text: "YAML rules decide: a quote under the limits goes out on its own, while large orders, new customers, dangerous goods or overdue credit wait for an approver, who gets a short briefing and the price breakdown.",
      },
      {
        title: "Security and guardrails",
        text: "Operators and approvers sign in through Keycloak with their own roles. Email text is untrusted data: an instruction such as a 90% discount changes nothing, and the quote goes to a person. Every external write goes through a tool gateway with an approval token and an idempotency key.",
      },
      {
        title: "Durable workflow",
        text: "State in PostgreSQL, every step audited and replayable, timers instead of waiting threads, retries with backoff, and idempotent writes through an outbox.",
      },
      {
        title: "Operator console",
        text: "A Next.js console shows the requests, the approvals and what the agent did, next to Grafana dashboards and traces.",
      },
    ],
    result:
      "In the demo a request becomes a priced, audited quote in seconds, and every risky case waits for a person. Fifteen sample emails run end to end, and 40 labelled eval cases score intent, fields, routing and injection recall.",
    stack: ["Java 25", "Spring Boot 4", "Spring AI", "MCP", "PostgreSQL", "Keycloak", "Next.js"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "",
    focus: "A workflow where the model reads and writes text and code decides every number",
    metaDescription:
      "An AI workflow agent that turns freight quote emails into approved quotes: the model reads text, code sets every price, a human approves. Spring AI and MCP.",
    relatedService: "ai",
    architecture: [
      {
        title: "Inbox",
        text: "Quote requests arrive by email, in any of five languages; replies leave through a mail outbox.",
      },
      {
        title: "Understand",
        text: "A model turns the email into structured fields. It is one of only three steps that call a model.",
      },
      {
        title: "Enrich and price",
        text: "The CRM is read over MCP, carrier rates come over REST, and code computes the price.",
      },
      {
        title: "Policy and approval",
        text: "YAML rules route each quote: send it automatically, or hold it for an approver who signs in through Keycloak (OIDC with PKCE) and sees a briefing.",
      },
      {
        title: "Respond and record",
        text: "A model writes the reply under a numeric guard; every external write goes through a tool gateway that demands an approval token and an idempotency key.",
      },
      {
        title: "Workflow engine",
        text: "PostgreSQL state machine with db-scheduler timers and a Spring Security resource server; every model call and tool call is audited.",
      },
    ],
  },
  {
    slug: "ai-document-processing",
    title: "Permission-aware RAG assistant",
    visual: "documents",
    industry: "AI · Retrieval",
    summary: "A company document assistant that answers each person only from the documents they may read, with sources cited.",
    relationship: "Studio reference implementation",
    contribution: "An AltronixSoft reference implementation demonstrating document retrieval with access controls and answers linked to permitted sources.",
    context: "An AltronixSoft reference project: an internal document assistant for a company where employees may read different documents.",
    challenge:
      "Employees ask questions about internal documents, but not everyone may read everything. A regular RAG chatbot can leak a document through its answer, however the question is phrased. The assistant had to answer each person only from the documents they are entitled to.",
    whatWeDid:
      "A RAG service was implemented with need-to-know access controls: access is checked before the language model runs. The work covered six areas.",
    workItems: [
      {
        title: "Upload and ingestion",
        text: "Users upload PDF, DOCX, Markdown and text files. Apache Tika reads them, each chunk is stored with its owner and group list, and a document can only be shared with the uploader's own groups.",
      },
      {
        title: "Access from the token",
        text: "The user is identified by a signed JWT from Keycloak or Microsoft Entra ID. Access rights come only from the token, never from request parameters.",
      },
      {
        title: "Filtered retrieval",
        text: "The access filter runs inside the pgvector similarity search, in the same SQL query. Forbidden chunks never reach the model, the answer or the citations.",
      },
      {
        title: "Answers with citations",
        text: "The model answers from the permitted chunks, and the citations are built from the chunks actually retrieved, never from what the model writes.",
      },
      {
        title: "Hidden documents, untrusted text",
        text: "A document the user may not read returns 404, so its existence is not revealed. Retrieved text and model output are untrusted: an instruction hidden in a document cannot widen access.",
      },
      {
        title: "Tested and operated",
        text: "Access matrix tests check, over HTTP against a real pgvector database, that one user cannot reach another's documents through search, chat, GET or DELETE. Health checks, logging and timeouts cover operations.",
      },
    ],
    result:
      "In a demo run, the same question about a salary band gets different answers: an HR employee receives it with the source cited, while an engineer is told there is no information, and their document list does not even show that the document exists.",
    stack: ["Java 25", "Spring Boot 4.1", "Spring AI 2.0", "PostgreSQL + pgvector", "Spring Security", "Keycloak", "Apache Tika", "Next.js"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "",
    focus: "Document-level access control enforced inside the vector search",
    metaDescription:
      "A permission-aware RAG assistant in Java: access control enforced inside the pgvector search, Keycloak sign-in and answers with citations. Spring AI.",
    relatedService: "ai",
    architecture: [
      {
        title: "Employees",
        text: "People ask questions and upload documents in a single-page web app served by the same service.",
      },
      {
        title: "Keycloak",
        text: "Users sign in through Keycloak (authorization code with PKCE) and receive a signed JWT; Microsoft Entra ID can replace it by profile. Groups and roles are read from the token.",
      },
      {
        title: "Spring Boot service",
        text: "One application with upload, search and chat endpoints; Spring Security acts as the OAuth2 resource server.",
      },
      {
        title: "Access-filtered search",
        text: "The access filter is a jsonpath predicate in the same SQL query as the vector similarity search.",
      },
      {
        title: "PostgreSQL and pgvector",
        text: "Documents, access lists and embeddings live in one database, so they can never drift apart.",
      },
      {
        title: "Model provider",
        text: "OpenAI, Azure OpenAI or a local model, chosen by Spring profile; business logic depends only on Spring AI abstractions.",
      },
    ],
  },
  {
    slug: "order-payment-platform",
    title: "Order and payment platform",
    visual: "payments",
    industry: "E-commerce · Payments",
    summary: "An order and payment flow across two Spring Boot services and Kafka, with Stripe, built to survive failures.",
    relationship: "Studio reference implementation",
    contribution: "An AltronixSoft reference implementation demonstrating event-driven ordering and payments, idempotency and recovery scenarios in Stripe test mode.",
    context: "An AltronixSoft reference project: the order and payment flow of an online shop, with separate customer, admin and operations roles.",
    challenge:
      "Taking a payment crosses systems that fail halfway: a webhook arrives twice or out of order, Kafka goes down, a process crashes. The flow had to never charge or refund twice, and an order had to reflect the truth about its payment.",
    whatWeDid:
      "The order and payment flow was implemented as two Spring Boot services that communicate through Kafka, without direct calls between them. The work covered six areas.",
    workItems: [
      {
        title: "Order service",
        text: "A catalog, a cart, orders with a status history and cancellation. An order stays PENDING_PAYMENT until a PaymentSucceeded event arrives from Kafka.",
      },
      {
        title: "Payment service",
        text: "Payments with Stripe: PaymentIntents, 3-D Secure, declines and retries, full refunds and disputes. Stripe is called only by background workers, never inside a database transaction.",
      },
      {
        title: "Event-driven saga",
        text: "A choreography saga over Kafka, with a transactional outbox and inbox so that no event is lost or handled twice.",
      },
      {
        title: "Idempotency and recovery",
        text: "Idempotency at every boundary, including an HTTP Idempotency-Key. Duplicate requests, repeated or out-of-order webhooks, a crash or a Kafka outage mid-payment do not charge or refund twice, and a late payment on a cancelled order is refunded automatically.",
      },
      {
        title: "Back office and operations",
        text: "Admins see every order with filters and refund it; operations staff work with dead letters and reconciliation against Stripe.",
      },
      {
        title: "Access and testing",
        text: "Sign-in through Keycloak (OIDC, JWT, PKCE) with the services as Spring Security resource servers. Unit, architecture and integration tests, plus end-to-end scenarios and chaos tests, none of which needs a Stripe account.",
      },
    ],
    result:
      "Six scenarios run end to end: a successful payment, a decline followed by a retry, 3-D Secure, a late payment that is refunded automatically, an admin refund and a dispute that flags the order. Stripe stays in test mode.",
    stack: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL", "Keycloak", "Stripe", "Next.js", "Testcontainers"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "",
    focus: "A reliable order and payment flow across two services, with no double charges or refunds",
    metaDescription:
      "An order and payment flow across two Spring Boot services and Kafka with Stripe: outbox, idempotency and refunds that never charge twice.",
    relatedService: "software",
    architecture: [
      {
        title: "Web interface",
        text: "A Next.js app for the shop, the order page, the back office and operations, with Stripe Elements for card entry.",
      },
      {
        title: "Keycloak",
        text: "Sign-in through OIDC with PKCE; both services check the JWT as Spring Security resource servers.",
      },
      {
        title: "Order service",
        text: "Orders, the catalog and the saga participant; an order waits in PENDING_PAYMENT for the payment event.",
      },
      {
        title: "Kafka",
        text: "The only way the two services talk: events through a transactional outbox and inbox.",
      },
      {
        title: "Payment service",
        text: "Payments, refunds, the Stripe gateway, webhooks and reconciliation; Stripe is called by background workers, outside transactions.",
      },
      {
        title: "PostgreSQL",
        text: "State, outbox and inbox live in PostgreSQL, migrated with Flyway.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** What kind of work a project is: delivered for a client, our own product, or AI work. */
export type ProjectKind = "client" | "product" | "ai";
/** Drives the frame colour and the badge: violet (client, NDA) / cyan (our own project, or in development) / green (open source). */
export type ProjectStatus = "nda" | "partner" | "own" | "open-source" | "in-development";

/** One tile of the portfolio (home: the `featured` ones; /work: all of them, in this order). */
export interface Project {
  slug: string;
  title: string;
  /** Eyebrow under the title, e.g. "AI · Agents". */
  category: string;
  /** One or two lines, up to about 110 characters. */
  summary: string;
  kind: ProjectKind;
  status: ProjectStatus;
  visual: ProjectVisual;
  /** Internal path ("/work/<case>"), an absolute URL, or `TODO(owner)` until the link is known. */
  href: string;
  isExternal: boolean;
  stack: string[];
  /** Shown on the home page. The order of the list is the order on the page. */
  featured?: boolean;
  /** The text is a draft the owner has not confirmed yet. It is shown, and dev mode lists it (see `warnIfDraft`). */
  draft?: boolean;
}

const [hybris, pim, logistics, nexus, lobby9, agent, rag, payments] = caseStudies;

/**
 * The portfolio, in display order. The first eight projects take their text from the case studies above, so
 * a case and its tile never say different things. Everything marked `TODO(owner)` is a draft or a missing
 * link: a tile without a real link is shown without a way through, only with its status.
 */
export const projects: Project[] = [
  {
    slug: hybris.slug,
    title: hybris.title,
    category: hybris.industry,
    summary: hybris.summary,
    kind: "client",
    status: "nda",
    visual: "shop",
    href: `/work/${hybris.slug}`,
    isExternal: false,
    stack: hybris.stack,
    featured: true,
  },
  {
    slug: pim.slug,
    title: pim.title,
    category: pim.industry,
    summary: pim.summary,
    kind: "product",
    status: "own",
    visual: "pim",
    href: `/work/${pim.slug}`,
    isExternal: false,
    stack: pim.stack,
  },
  {
    slug: logistics.slug,
    title: logistics.title,
    category: logistics.industry,
    summary: logistics.summary,
    kind: "product",
    status: "own",
    visual: "logistics",
    href: `/work/${logistics.slug}`,
    isExternal: false,
    stack: logistics.stack,
  },
  {
    slug: nexus.slug,
    title: nexus.title,
    category: nexus.industry,
    summary: nexus.summary,
    kind: "client",
    status: "partner",
    visual: "chain",
    href: `/work/${nexus.slug}`,
    isExternal: false,
    stack: nexus.stack,
    featured: true,
  },
  {
    slug: lobby9.slug,
    title: lobby9.title,
    category: lobby9.industry,
    summary: lobby9.summary,
    kind: "client",
    status: "partner",
    visual: "lobby",
    href: `/work/${lobby9.slug}`,
    isExternal: false,
    stack: lobby9.stack,
    featured: true,
  },
  {
    slug: agent.slug,
    title: agent.title,
    category: agent.industry,
    summary: agent.summary,
    kind: "ai",
    status: "own",
    visual: "agent",
    href: `/work/${agent.slug}`,
    isExternal: false,
    stack: agent.stack,
    featured: true,
  },
  {
    slug: rag.slug,
    title: rag.title,
    category: rag.industry,
    summary: rag.summary,
    kind: "ai",
    status: "own",
    visual: "documents",
    href: `/work/${rag.slug}`,
    isExternal: false,
    stack: rag.stack,
  },
  {
    slug: payments.slug,
    title: payments.title,
    category: payments.industry,
    summary: payments.summary,
    kind: "product",
    status: "own",
    visual: "payments",
    href: `/work/${payments.slug}`,
    isExternal: false,
    stack: payments.stack,
  },
];

export interface LabsProject {
  title: string;
  tag: string;
  demoUrl: string;
  repoUrl: string;
  screenshot: string;
}

export const labs = {
  /** Master switch. The block also stays hidden until at least one project has a demo or a repository. */
  showLabs: true,
  name: "Altronix Labs",
  eyebrow: "Reference implementations",
  description:
    "Reference implementations for testing architecture, integration patterns and emerging technologies, including AI.",
  projects: [
    {
      title: "Enterprise Knowledge Assistant",
      tag: "RAG",
      demoUrl: "TODO(owner): public demo URL",
      repoUrl: "TODO(owner): repository URL",
      screenshot: "TODO(owner): screenshot path under /public, e.g. /labs/knowledge-assistant.png",
    },
    {
      title: "AI Project Analysis Platform",
      tag: "Analysis",
      demoUrl: "TODO(owner): public demo URL",
      repoUrl: "TODO(owner): repository URL",
      screenshot: "TODO(owner): screenshot path under /public",
    },
    {
      title: "AI Workflow Automation",
      tag: "Agents",
      demoUrl: "TODO(owner): public demo URL",
      repoUrl: "TODO(owner): repository URL",
      screenshot: "TODO(owner): screenshot path under /public",
    },
  ] satisfies LabsProject[],
};
