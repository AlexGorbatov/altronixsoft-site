import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop } from "./FlowDiagram";

export type RagFlowLabels = Content["copy"]["portfolio"]["scene"]["ragFlow"];

type Block = "alice" | "bob" | "idp" | "auth" | "retrieve" | "llm" | "db" | "upload" | "answer";
type Wire = "aliceIn" | "bobIn" | "idpIn" | "authToRet" | "retToDb" | "dbToLlm" | "llmToAns" | "uploadToDb";

/** Cards and wide screens: people and identity on the left, the service in the middle, the data and the answer on the right. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 300],
  bleed: 12,
  font: { title: 12.5, sub: 9.5 },
  panels: [{ rect: { x: 176, y: 22, w: 300, h: 210 }, title: "", at: [190, 42] }],
  log: { x: 12, y: 252, w: 676 },
  rects: {
    alice: { x: 12, y: 50, w: 130, h: 46 },
    bob: { x: 12, y: 112, w: 130, h: 46 },
    idp: { x: 12, y: 174, w: 130, h: 46 },
    auth: { x: 188, y: 54, w: 276, h: 46 },
    retrieve: { x: 188, y: 114, w: 276, h: 46 },
    llm: { x: 188, y: 174, w: 276, h: 46 },
    db: { x: 500, y: 54, w: 188, h: 46 },
    upload: { x: 500, y: 114, w: 188, h: 46 },
    answer: { x: 500, y: 174, w: 188, h: 46 },
  },
  edges: {
    // Every person and the identity provider have their own line into the token check, side by side.
    aliceIn: { from: "alice", to: "auth", axis: "h", mid: 150, offB: -8 },
    bobIn: { from: "bob", to: "auth", axis: "h", mid: 160 },
    idpIn: { from: "idp", to: "auth", axis: "h", mid: 170, offB: 8 },
    authToRet: { from: "auth", to: "retrieve", axis: "v" },
    retToDb: { from: "retrieve", to: "db", axis: "h", mid: 482, offA: -8 },
    dbToLlm: { from: "db", to: "llm", axis: "h", mid: 482, offA: 8, offB: -8 },
    llmToAns: { from: "llm", to: "answer", axis: "h", offA: 8 },
    uploadToDb: { from: "upload", to: "db", axis: "v" },
  },
};

/** Phones (case page): the same flow from top to bottom. */
const TALL: FlowLayout<Block, Wire> = {
  viewBox: [360, 434],
  font: { title: 14, sub: 12, log: 12 },
  panels: [{ rect: { x: 12, y: 100, w: 336, h: 202 }, title: "", at: [24, 118] }],
  log: { x: 12, y: 388, w: 336 },
  rects: {
    alice: { x: 12, y: 30, w: 104, h: 46 },
    bob: { x: 128, y: 30, w: 104, h: 46 },
    idp: { x: 244, y: 30, w: 104, h: 46 },
    auth: { x: 24, y: 128, w: 312, h: 46 },
    retrieve: { x: 24, y: 186, w: 196, h: 46 },
    db: { x: 232, y: 186, w: 104, h: 46 },
    llm: { x: 24, y: 244, w: 196, h: 46 },
    upload: { x: 232, y: 244, w: 104, h: 46 },
    answer: { x: 12, y: 322, w: 336, h: 46 },
  },
  edges: {
    aliceIn: { from: "alice", to: "auth", axis: "v", mid: 102, offB: -90 },
    bobIn: { from: "bob", to: "auth", axis: "v" },
    idpIn: { from: "idp", to: "auth", axis: "v", mid: 102, offB: 90 },
    authToRet: { from: "auth", to: "retrieve", axis: "v", offA: -58 },
    retToDb: { from: "retrieve", to: "db", axis: "h" },
    dbToLlm: { from: "db", to: "llm", axis: "v", mid: 238 },
    llmToAns: { from: "llm", to: "answer", axis: "v", offB: -58 },
    uploadToDb: { from: "upload", to: "db", axis: "v" },
  },
};

/** Phones (card) and the small picture of the list layout: six blocks in a snake, and the log line. */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 200],
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 160, w: 336 },
  rects: {
    alice: { x: 12, y: 34, w: 108, h: 44 },
    auth: { x: 130, y: 34, w: 108, h: 44 },
    retrieve: { x: 248, y: 34, w: 108, h: 44 },
    answer: { x: 12, y: 104, w: 108, h: 44 },
    llm: { x: 130, y: 104, w: 108, h: 44 },
    db: { x: 248, y: 104, w: 108, h: 44 },
  },
  edges: {
    aliceIn: { from: "alice", to: "auth", axis: "h" },
    authToRet: { from: "auth", to: "retrieve", axis: "h" },
    retToDb: { from: "retrieve", to: "db", axis: "v" },
    dbToLlm: { from: "db", to: "llm", axis: "h" },
    llmToAns: { from: "llm", to: "answer", axis: "h" },
  },
};

/** Where the blocked path is marked in the second half of the loop, per layout: between the database and the model. */
const BLOCK_MARK = { wide: [473, 189], tall: [200, 238], mini: [243, 126] } as const;

/**
 * The loop (12 s). First Alice from HR: her token gives the groups, the search finds the salary document, the model
 * answers from it and cites it. Then Bob from engineering asks the same: the access filter finds nothing he may read,
 * so nothing reaches the model and he is told there is no information. A document upload goes into the database too.
 */
const HOPS: Hop<Wire>[] = [
  { edge: "aliceIn", at: 0 },
  { edge: "idpIn", at: 0, reply: true },
  { edge: "authToRet", at: 0.85 },
  { edge: "retToDb", at: 1.7 },
  { edge: "dbToLlm", at: 2.55, reply: true },
  { edge: "llmToAns", at: 3.4 },
  { edge: "uploadToDb", at: 4.3 },
  { edge: "bobIn", at: 6 },
  { edge: "idpIn", at: 6, reply: true },
  { edge: "authToRet", at: 6.85 },
  { edge: "retToDb", at: 7.7 },
  { edge: "uploadToDb", at: 10 },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "auth", at: 0.84 },
  { block: "retrieve", at: 1.69 },
  { block: "db", at: 2.54 },
  { block: "llm", at: 3.39 },
  { block: "answer", at: 4.24 },
  { block: "db", at: 5.14 },
  { block: "auth", at: 6.84 },
  { block: "retrieve", at: 7.69 },
  { block: "db", at: 8.54 },
  { block: "db", at: 10.84 },
];

function blocks(t: RagFlowLabels): Record<Block, FlowBlock> {
  return {
    alice: { title: t.alice, sub: t.aliceSub },
    bob: { title: t.bob, sub: t.bobSub },
    idp: { title: t.idp, sub: t.idpSub, accent: true },
    auth: { title: t.auth, sub: t.authSub, accent: true },
    retrieve: { title: t.retrieve, sub: t.retrieveSub, accent: true },
    llm: { title: t.llm, sub: t.llmSub },
    db: { title: t.db, sub: t.dbSub },
    upload: { title: t.upload, sub: t.uploadSub },
    answer: { title: t.answer, sub: t.answerSub },
  };
}

/** In the tall layout the blocks along the top and the right are narrow: names in the middle, short or no second line. */
function tallBlocks(t: RagFlowLabels): Record<Block, FlowBlock> {
  return {
    ...blocks(t),
    alice: { title: t.alice, centred: true },
    bob: { title: t.bob, centred: true },
    idp: { title: t.idpShort, centred: true, accent: true },
    retrieve: { title: t.retrieve, sub: t.retrieveSubShort, accent: true },
    db: { title: "pgvector", centred: true },
    upload: { title: t.upload, centred: true },
    answer: { title: t.answer, sub: t.answerSub, centred: true },
  };
}

function miniBlocks(t: RagFlowLabels): Record<Block, FlowBlock> {
  const centre = (title: string, accent = false): FlowBlock => ({ title, centred: true, accent });
  return {
    ...blocks(t),
    alice: centre(t.userShort),
    auth: centre(t.tokenShort, true),
    retrieve: centre(t.aclShort, true),
    db: centre("pgvector"),
    llm: centre("LLM"),
    answer: centre(t.answer),
  };
}

/** The blocked path of the second half of the loop: Bob's documents are not reachable, so nothing goes on to the model. */
function Blocked({ at }: { at: readonly [number, number] }) {
  const [x, y] = at;
  return (
    <g className={flowStyles.phaseBLive}>
      <circle cx={x} cy={y} r="5.5" className={flowStyles.blockMark} />
      <path d={`M${x - 2.3} ${y - 2.3} L${x + 2.3} ${y + 2.3} M${x + 2.3} ${y - 2.3} L${x - 2.3} ${y + 2.3}`} className={flowStyles.blockCross} />
    </g>
  );
}

interface RagFlowProps {
  labels: RagFlowLabels;
  /** `card`: the picture of a project card. `panel`: the case page. Each has its own phone layout. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * The permission-aware RAG assistant as a live architecture diagram, drawn only from the repository's README: the
 * signed token gives the groups, the access filter runs inside the pgvector similarity search, and the model answers
 * only from the chunks the person may read, with citations.
 */
export function RagFlow({ labels: t, mode, className }: RagFlowProps) {
  const wide = { ...WIDE, panels: [{ ...WIDE.panels[0], title: t.service }] };
  const tall = { ...TALL, panels: [{ ...TALL.panels[0], title: t.service }] };
  const shared = { hops: HOPS, flashes: FLASHES, log: [t.logAlice, t.logBob] as [string, string] };
  if (mode === "card") {
    return (
      <FlowDiagram layout={MINI} blocks={miniBlocks(t)} {...shared} className={cn(flowStyles.cardMini, className)} extras={() => <Blocked at={BLOCK_MARK.mini} />} />
    );
  }
  return (
    <div className={flowStyles.root}>
      <FlowDiagram layout={wide} blocks={blocks(t)} {...shared} label={t.aria} className={flowStyles.wide} extras={() => <Blocked at={BLOCK_MARK.wide} />} />
      <FlowDiagram layout={tall} blocks={tallBlocks(t)} {...shared} label={t.aria} className={flowStyles.tall} extras={() => <Blocked at={BLOCK_MARK.tall} />} />
    </div>
  );
}
