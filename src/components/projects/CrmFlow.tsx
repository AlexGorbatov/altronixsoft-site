import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop } from "./FlowDiagram";

export type CrmFlowLabels = Content["copy"]["portfolio"]["scene"]["crmFlow"];

type Block = "web" | "contract" | "images" | "api" | "crm" | "quartz" | "db" | "s3" | "out";
type Wire = "webIn" | "contractIn" | "imagesIn" | "apiToCrm" | "crmToDb" | "crmToS3" | "quartzToCrm" | "quartzToOut";

/** Cards and wide screens: the web side on the left, the microservices in the middle, the stores and outputs on the right. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 300],
  bleed: 12,
  font: { title: 12.5, sub: 9.5 },
  panels: [{ rect: { x: 176, y: 22, w: 300, h: 210 }, title: "", at: [190, 42] }],
  log: { x: 12, y: 252, w: 676 },
  rects: {
    web: { x: 12, y: 50, w: 130, h: 46 },
    contract: { x: 12, y: 112, w: 130, h: 46 },
    images: { x: 12, y: 174, w: 130, h: 46 },
    api: { x: 188, y: 54, w: 276, h: 46 },
    crm: { x: 188, y: 114, w: 276, h: 46 },
    quartz: { x: 188, y: 174, w: 276, h: 46 },
    db: { x: 500, y: 54, w: 188, h: 46 },
    s3: { x: 500, y: 114, w: 188, h: 46 },
    out: { x: 500, y: 174, w: 188, h: 46 },
  },
  edges: {
    // The web app, the API contract and the image uploads each have their own line into the REST APIs, side by side.
    webIn: { from: "web", to: "api", axis: "h", mid: 150, offB: -8 },
    contractIn: { from: "contract", to: "api", axis: "h", mid: 160 },
    imagesIn: { from: "images", to: "api", axis: "h", mid: 170, offB: 8 },
    apiToCrm: { from: "api", to: "crm", axis: "v" },
    crmToDb: { from: "crm", to: "db", axis: "h", mid: 482, offA: -8 },
    crmToS3: { from: "crm", to: "s3", axis: "h" },
    quartzToCrm: { from: "quartz", to: "crm", axis: "v" },
    quartzToOut: { from: "quartz", to: "out", axis: "h" },
  },
};

/** Phones (case page): the same flow from top to bottom. */
const TALL: FlowLayout<Block, Wire> = {
  viewBox: [360, 388],
  font: { title: 12, sub: 9.5 },
  panels: [{ rect: { x: 12, y: 100, w: 336, h: 150 }, title: "", at: [24, 118] }],
  log: { x: 12, y: 342, w: 336 },
  rects: {
    web: { x: 12, y: 30, w: 104, h: 46 },
    contract: { x: 128, y: 30, w: 104, h: 46 },
    images: { x: 244, y: 30, w: 104, h: 46 },
    api: { x: 24, y: 128, w: 312, h: 46 },
    crm: { x: 24, y: 186, w: 196, h: 46 },
    quartz: { x: 232, y: 186, w: 104, h: 46 },
    db: { x: 12, y: 276, w: 104, h: 46 },
    s3: { x: 128, y: 276, w: 104, h: 46 },
    out: { x: 244, y: 276, w: 104, h: 46 },
  },
  edges: {
    webIn: { from: "web", to: "api", axis: "v", mid: 102, offB: -90 },
    contractIn: { from: "contract", to: "api", axis: "v" },
    imagesIn: { from: "images", to: "api", axis: "v", mid: 102, offB: 90 },
    apiToCrm: { from: "api", to: "crm", axis: "v", offA: -58 },
    quartzToCrm: { from: "quartz", to: "crm", axis: "h" },
    // Out of the panel and across the gap under it.
    crmToDb: { from: "crm", to: "db", axis: "v", mid: 263, offA: -58 },
    crmToS3: { from: "crm", to: "s3", axis: "v", mid: 263, offA: 0 },
    quartzToOut: { from: "quartz", to: "out", axis: "v", mid: 263 },
  },
};

/** Phones (card) and the small picture of the list layout: six blocks, and the log line. */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 200],
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 160, w: 336 },
  rects: {
    web: { x: 12, y: 34, w: 108, h: 44 },
    api: { x: 130, y: 34, w: 108, h: 44 },
    crm: { x: 248, y: 34, w: 108, h: 44 },
    out: { x: 12, y: 104, w: 108, h: 44 },
    quartz: { x: 130, y: 104, w: 108, h: 44 },
    s3: { x: 248, y: 104, w: 108, h: 44 },
  },
  edges: {
    webIn: { from: "web", to: "api", axis: "h" },
    apiToCrm: { from: "api", to: "crm", axis: "h" },
    crmToS3: { from: "crm", to: "s3", axis: "v" },
    quartzToCrm: { from: "quartz", to: "crm", axis: "v", mid: 91, offB: -54 },
    quartzToOut: { from: "quartz", to: "out", axis: "h" },
  },
};

/**
 * The loop (12 s). First an image upload: the web app calls the REST APIs, the CRM services keep the metadata in MySQL
 * and the high-resolution image in Amazon S3. Then a Quartz job: it reads the CRM data, builds a report and sends the
 * automated email.
 */
const HOPS: Hop<Wire>[] = [
  { edge: "imagesIn", at: 0 },
  { edge: "apiToCrm", at: 0.85 },
  { edge: "crmToS3", at: 1.7 },
  { edge: "crmToDb", at: 1.7 },
  { edge: "crmToS3", at: 2.55, back: true, reply: true },
  { edge: "webIn", at: 3.6 },
  { edge: "contractIn", at: 3.6, reply: true },
  { edge: "quartzToCrm", at: 6, back: true },
  { edge: "crmToDb", at: 6.85, back: true, reply: true },
  { edge: "quartzToCrm", at: 7.7, reply: true },
  { edge: "quartzToOut", at: 8.55 },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "api", at: 0.84 },
  { block: "crm", at: 1.69 },
  { block: "s3", at: 2.54 },
  { block: "db", at: 2.54 },
  { block: "crm", at: 3.39 },
  { block: "api", at: 4.44 },
  { block: "quartz", at: 5.9 },
  { block: "crm", at: 6.84 },
  { block: "db", at: 7.69 },
  { block: "quartz", at: 8.54 },
  { block: "out", at: 9.39 },
];

function blocks(t: CrmFlowLabels): Record<Block, FlowBlock> {
  return {
    web: { title: t.web, sub: t.webSub },
    contract: { title: t.contract, sub: t.contractSub },
    images: { title: t.images, sub: t.imagesSub },
    api: { title: t.api, sub: t.apiSub, accent: true },
    crm: { title: t.crm, sub: t.crmSub, accent: true },
    quartz: { title: "Quartz", sub: t.quartzSub },
    db: { title: "MySQL", sub: t.dbSub },
    s3: { title: "Amazon S3", sub: t.s3Sub },
    out: { title: t.out, sub: t.outSub },
  };
}

/** In the tall layout the blocks along the top and the bottom are narrow: names in the middle, no second line. */
function tallBlocks(t: CrmFlowLabels): Record<Block, FlowBlock> {
  return {
    ...blocks(t),
    web: { title: t.webShort, centred: true },
    contract: { title: t.contract, centred: true },
    images: { title: t.images, centred: true },
    quartz: { title: "Quartz", centred: true },
    db: { title: "MySQL", centred: true },
    s3: { title: "Amazon S3", centred: true },
    out: { title: t.emailsShort, centred: true },
  };
}

function miniBlocks(t: CrmFlowLabels): Record<Block, FlowBlock> {
  const centre = (title: string, accent = false): FlowBlock => ({ title, centred: true, accent });
  return {
    ...blocks(t),
    web: centre(t.webShort),
    api: centre(t.apiShort, true),
    crm: centre(t.crmShort, true),
    out: centre(t.emailsShort),
    quartz: centre("Quartz"),
    s3: centre("S3"),
  };
}

interface CrmFlowProps {
  labels: CrmFlowLabels;
  /** `card`: the picture of a project card. `panel`: the case page. Each has its own phone layout. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * The SaaS CRM as a live architecture diagram, drawn only from the case's responsibilities: a web app against an
 * OpenAPI/Swagger contract, secure REST APIs on Spring Boot, microservices, MySQL, high-resolution images in Amazon S3,
 * and Quartz jobs for automated email notifications and reports.
 */
export function CrmFlow({ labels: t, mode, className }: CrmFlowProps) {
  const wide = { ...WIDE, panels: [{ ...WIDE.panels[0], title: t.services }] };
  const tall = { ...TALL, panels: [{ ...TALL.panels[0], title: t.services }] };
  const shared = { hops: HOPS, flashes: FLASHES, log: [t.logUpload, t.logJob] as [string, string] };
  if (mode === "card") {
    return (
      <>
        <FlowDiagram layout={wide} blocks={blocks(t)} {...shared} className={cn(flowStyles.cardWide, className)} />
        <FlowDiagram layout={MINI} blocks={miniBlocks(t)} {...shared} className={cn(flowStyles.cardMini, className)} />
      </>
    );
  }
  return (
    <div className={flowStyles.root}>
      <FlowDiagram layout={wide} blocks={blocks(t)} {...shared} label={t.aria} className={flowStyles.wide} />
      <FlowDiagram layout={tall} blocks={tallBlocks(t)} {...shared} label={t.aria} className={flowStyles.tall} />
    </div>
  );
}
