import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop } from "./FlowDiagram";

export type PimFlowLabels = Content["copy"]["portfolio"]["scene"]["pimFlow"];

type Block = "csv" | "excel" | "json" | "parsers" | "mapper" | "sched" | "kafka" | "store" | "front" | "stock";
type Wire =
  | "csvIn" | "excelIn" | "jsonIn" | "pToM" | "mToK" | "schedToK"
  | "kToStore" | "kToStock" | "storeToFront" | "stockToFront";

/** Cards and wide screens: vendor files on the left, the import pipeline in the middle, the storefront on the right. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 300],
  bleed: 12,
  font: { title: 12.5, sub: 9.5 },
  panels: [{ rect: { x: 176, y: 22, w: 300, h: 210 }, title: "", at: [190, 42] }],
  log: { x: 12, y: 252, w: 676 },
  rects: {
    csv: { x: 12, y: 50, w: 130, h: 46 },
    excel: { x: 12, y: 112, w: 130, h: 46 },
    json: { x: 12, y: 174, w: 130, h: 46 },
    parsers: { x: 188, y: 54, w: 276, h: 46 },
    mapper: { x: 188, y: 114, w: 276, h: 46 },
    sched: { x: 188, y: 174, w: 133, h: 46 },
    kafka: { x: 331, y: 174, w: 133, h: 46 },
    store: { x: 500, y: 54, w: 188, h: 46 },
    front: { x: 500, y: 114, w: 188, h: 46 },
    stock: { x: 500, y: 174, w: 188, h: 46 },
  },
  edges: {
    // Each vendor format has its own line into the parsers, side by side.
    csvIn: { from: "csv", to: "parsers", axis: "h", mid: 150, offB: -8 },
    excelIn: { from: "excel", to: "parsers", axis: "h", mid: 160 },
    jsonIn: { from: "json", to: "parsers", axis: "h", mid: 170, offB: 8 },
    pToM: { from: "parsers", to: "mapper", axis: "v" },
    mToK: { from: "mapper", to: "kafka", axis: "v", offA: 71.5 },
    schedToK: { from: "sched", to: "kafka", axis: "h" },
    kToStore: { from: "kafka", to: "store", axis: "h", mid: 482, offA: -8 },
    kToStock: { from: "kafka", to: "stock", axis: "h", mid: 482, offA: 8 },
    storeToFront: { from: "store", to: "front", axis: "v" },
    stockToFront: { from: "stock", to: "front", axis: "v" },
  },
};

/** Phones (case page): the same flow from top to bottom. */
const TALL: FlowLayout<Block, Wire> = {
  viewBox: [360, 440],
  font: { title: 12, sub: 9.5 },
  panels: [{ rect: { x: 12, y: 100, w: 336, h: 206 }, title: "", at: [24, 118] }],
  log: { x: 12, y: 394, w: 336 },
  rects: {
    csv: { x: 12, y: 30, w: 104, h: 46 },
    excel: { x: 128, y: 30, w: 104, h: 46 },
    json: { x: 244, y: 30, w: 104, h: 46 },
    parsers: { x: 24, y: 128, w: 312, h: 46 },
    mapper: { x: 24, y: 186, w: 312, h: 46 },
    sched: { x: 24, y: 244, w: 150, h: 46 },
    kafka: { x: 186, y: 244, w: 150, h: 46 },
    store: { x: 12, y: 330, w: 104, h: 46 },
    front: { x: 128, y: 330, w: 104, h: 46 },
    stock: { x: 244, y: 330, w: 104, h: 46 },
  },
  edges: {
    csvIn: { from: "csv", to: "parsers", axis: "v", mid: 102, offB: -90 },
    excelIn: { from: "excel", to: "parsers", axis: "v", mid: 102 },
    jsonIn: { from: "json", to: "parsers", axis: "v", mid: 102, offB: 90 },
    pToM: { from: "parsers", to: "mapper", axis: "v" },
    mToK: { from: "mapper", to: "kafka", axis: "v", offA: 81 },
    schedToK: { from: "sched", to: "kafka", axis: "h" },
    // Out of the panel and across the gap under it.
    kToStore: { from: "kafka", to: "store", axis: "v", mid: 318, offA: -45 },
    kToStock: { from: "kafka", to: "stock", axis: "v", mid: 318, offA: 25 },
    storeToFront: { from: "store", to: "front", axis: "h" },
    stockToFront: { from: "stock", to: "front", axis: "h" },
  },
};

/** Phones (card) and the small picture of the list layout: six blocks in a snake, and the log line. */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 200],
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 160, w: 336 },
  rects: {
    csv: { x: 12, y: 34, w: 108, h: 44 },
    parsers: { x: 130, y: 34, w: 108, h: 44 },
    mapper: { x: 248, y: 34, w: 108, h: 44 },
    front: { x: 12, y: 104, w: 108, h: 44 },
    store: { x: 130, y: 104, w: 108, h: 44 },
    kafka: { x: 248, y: 104, w: 108, h: 44 },
  },
  edges: {
    csvIn: { from: "csv", to: "parsers", axis: "h" },
    pToM: { from: "parsers", to: "mapper", axis: "h" },
    mToK: { from: "mapper", to: "kafka", axis: "v" },
    kToStore: { from: "kafka", to: "store", axis: "h" },
    storeToFront: { from: "store", to: "front", axis: "h" },
  },
};

/**
 * The loop (12 s). First an Excel catalog from a vendor goes through its parser, the mapping and validation, Kafka and
 * into the product store, and from there to the storefront. Then a scheduled batch: a stock update goes the same way
 * to the storefront.
 */
const HOPS: Hop<Wire>[] = [
  { edge: "excelIn", at: 0 },
  { edge: "pToM", at: 0.85 },
  { edge: "mToK", at: 1.7 },
  { edge: "kToStore", at: 2.55 },
  { edge: "storeToFront", at: 3.4, reply: true },
  { edge: "jsonIn", at: 6 },
  { edge: "pToM", at: 6.85 },
  { edge: "schedToK", at: 6.85 },
  { edge: "mToK", at: 7.7 },
  { edge: "kToStock", at: 8.55 },
  { edge: "stockToFront", at: 9.4, back: true, reply: true },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "parsers", at: 0.84 },
  { block: "mapper", at: 1.69 },
  { block: "kafka", at: 2.54 },
  { block: "store", at: 3.39 },
  { block: "front", at: 4.24 },
  { block: "parsers", at: 6.84 },
  { block: "mapper", at: 7.69 },
  { block: "kafka", at: 8.54 },
  { block: "stock", at: 9.39 },
  { block: "front", at: 10.24 },
];

function blocks(t: PimFlowLabels): Record<Block, FlowBlock> {
  return {
    csv: { title: "CSV", sub: "OpenCSV" },
    excel: { title: "Excel", sub: "Apache POI" },
    json: { title: "JSON · XML", sub: t.jsonSub },
    parsers: { title: t.parsers, sub: t.parsersSub, accent: true },
    mapper: { title: t.mapper, sub: t.mapperSub, accent: true },
    sched: { title: t.scheduler, sub: t.schedulerSub },
    kafka: { title: "Kafka", sub: t.kafkaSub },
    store: { title: t.store, sub: "MySQL" },
    front: { title: t.storefront, sub: t.storefrontSub },
    stock: { title: t.stock, sub: "REST" },
  };
}

/** In the tall layout the blocks along the top and bottom are narrow: names in the middle, no second line. */
function tallBlocks(t: PimFlowLabels): Record<Block, FlowBlock> {
  const b = blocks(t);
  return {
    ...b,
    csv: { title: "CSV", sub: "OpenCSV", centred: true },
    excel: { title: "Excel", sub: "Apache POI", centred: true },
    json: { title: "JSON · XML", centred: true },
    store: { title: "MySQL", centred: true },
    front: { title: t.storefront, centred: true },
    stock: { title: t.stock, centred: true },
  };
}

function miniBlocks(t: PimFlowLabels): Record<Block, FlowBlock> {
  const centre = (title: string, accent = false): FlowBlock => ({ title, centred: true, accent });
  return {
    ...blocks(t),
    csv: centre(t.filesShort),
    parsers: centre(t.parsersShort, true),
    mapper: centre(t.mappingShort, true),
    kafka: centre("Kafka"),
    store: centre("MySQL"),
    front: centre(t.storefront),
  };
}

interface PimFlowProps {
  labels: PimFlowLabels;
  /** `card`: the picture of a project card. `panel`: the case page. Each has its own phone layout. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * The PIM system as a live architecture diagram, drawn only from the case's responsibilities: vendor files in CSV,
 * Excel, JSON and XML, parsers with their own mappings, an import framework (map, transform, validate), Kafka and
 * scheduled jobs for asynchronous batches, MySQL, and REST sync with stock updates to the storefront.
 */
export function PimFlow({ labels: t, mode, className }: PimFlowProps) {
  const shared = { hops: HOPS, flashes: FLASHES, log: [t.logCatalog, t.logStock] as [string, string] };
  const wide = { ...WIDE, panels: [{ ...WIDE.panels[0], title: t.pipeline }] };
  const tall = { ...TALL, panels: [{ ...TALL.panels[0], title: t.pipeline }] };
  if (mode === "card") {
    return (
      <FlowDiagram layout={MINI} blocks={miniBlocks(t)} {...shared} className={cn(flowStyles.cardMini, className)} />
    );
  }
  return (
    <div className={flowStyles.root}>
      <FlowDiagram layout={wide} blocks={blocks(t)} {...shared} label={t.aria} className={flowStyles.wide} />
      <FlowDiagram layout={tall} blocks={tallBlocks(t)} {...shared} label={t.aria} className={flowStyles.tall} />
    </div>
  );
}
