import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop } from "./FlowDiagram";

export type LobbyFlowLabels = Content["copy"]["portfolio"]["scene"]["lobbyFlow"];

type Block = "psn" | "steam" | "xbox" | "link" | "profile" | "feed" | "talk" | "camp" | "players" | "share" | "fame";
type Wire = "psnIn" | "steamIn" | "xboxIn" | "toProfile" | "toFeed" | "toTalk" | "toCamp" | "toPlayers" | "toShare" | "toFame";

/** Cards and wide screens: platforms on the left, Lobby9 in the middle, what players see on the right. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 300],
  bleed: 12,
  font: { title: 12.5, sub: 9.5 },
  panels: [{ rect: { x: 176, y: 22, w: 300, h: 210 }, title: "Lobby9", at: [190, 42] }],
  log: { x: 12, y: 252, w: 676 },
  rects: {
    psn: { x: 12, y: 50, w: 130, h: 46 },
    steam: { x: 12, y: 112, w: 130, h: 46 },
    xbox: { x: 12, y: 174, w: 130, h: 46 },
    link: { x: 188, y: 54, w: 276, h: 46 },
    profile: { x: 188, y: 114, w: 276, h: 46 },
    feed: { x: 188, y: 174, w: 86, h: 46 },
    talk: { x: 283, y: 174, w: 86, h: 46 },
    camp: { x: 378, y: 174, w: 86, h: 46 },
    players: { x: 500, y: 54, w: 188, h: 46 },
    share: { x: 500, y: 114, w: 188, h: 46 },
    fame: { x: 500, y: 174, w: 188, h: 46 },
  },
  edges: {
    // Each platform has its own line into the account linking, side by side, so every flow can be seen.
    psnIn: { from: "psn", to: "link", axis: "h", mid: 150, offB: -8 },
    steamIn: { from: "steam", to: "link", axis: "h", mid: 160 },
    xboxIn: { from: "xbox", to: "link", axis: "h", mid: 170, offB: 8 },
    toProfile: { from: "link", to: "profile", axis: "v" },
    toFeed: { from: "profile", to: "feed", axis: "v", offA: -95 },
    toTalk: { from: "profile", to: "talk", axis: "v" },
    toCamp: { from: "profile", to: "camp", axis: "v", offA: 95 },
    toPlayers: { from: "profile", to: "players", axis: "h", mid: 482, offA: -8 },
    toShare: { from: "profile", to: "share", axis: "h" },
    toFame: { from: "camp", to: "fame", axis: "h" },
  },
};

/** Phones (case page): the same flow from top to bottom. */
const TALL: FlowLayout<Block, Wire> = {
  viewBox: [360, 478],
  font: { title: 12, sub: 9.5 },
  panels: [{ rect: { x: 12, y: 100, w: 336, h: 244 }, title: "Lobby9", at: [24, 334] }],
  log: { x: 12, y: 432, w: 336 },
  rects: {
    psn: { x: 12, y: 30, w: 104, h: 46 },
    steam: { x: 128, y: 30, w: 104, h: 46 },
    xbox: { x: 244, y: 30, w: 104, h: 46 },
    link: { x: 24, y: 124, w: 312, h: 46 },
    profile: { x: 24, y: 190, w: 312, h: 46 },
    feed: { x: 24, y: 256, w: 96, h: 46 },
    talk: { x: 132, y: 256, w: 96, h: 46 },
    camp: { x: 240, y: 256, w: 96, h: 46 },
    players: { x: 12, y: 368, w: 104, h: 46 },
    share: { x: 128, y: 368, w: 104, h: 46 },
    fame: { x: 244, y: 368, w: 104, h: 46 },
  },
  edges: {
    psnIn: { from: "psn", to: "link", axis: "v", mid: 112, offB: -80 },
    steamIn: { from: "steam", to: "link", axis: "v" },
    xboxIn: { from: "xbox", to: "link", axis: "v", mid: 112, offB: 80 },
    toProfile: { from: "link", to: "profile", axis: "v" },
    toFeed: { from: "profile", to: "feed", axis: "v", offA: -108 },
    toTalk: { from: "profile", to: "talk", axis: "v" },
    toCamp: { from: "profile", to: "camp", axis: "v", offA: 108 },
    // Out of the panel through the gaps between the modules, then across to the blocks below.
    toPlayers: { from: "profile", to: "players", axis: "v", mid: 356, offA: -54 },
    toShare: { from: "profile", to: "share", axis: "v", mid: 356, offA: 54 },
    toFame: { from: "camp", to: "fame", axis: "v", offB: -8 },
  },
};

/** Phones and the list layout (card): six blocks with short names, and the log line. */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 224],
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 180, w: 336 },
  rects: {
    psn: { x: 12, y: 24, w: 96, h: 44 },
    link: { x: 132, y: 24, w: 96, h: 44 },
    share: { x: 252, y: 24, w: 96, h: 44 },
    steam: { x: 12, y: 112, w: 96, h: 44 },
    feed: { x: 132, y: 112, w: 96, h: 44 },
    fame: { x: 252, y: 112, w: 96, h: 44 },
  },
  edges: {
    psnIn: { from: "psn", to: "link", axis: "h" },
    steamIn: { from: "steam", to: "link", axis: "h", mid: 120, offB: 8 },
    toFeed: { from: "link", to: "feed", axis: "v" },
    toShare: { from: "link", to: "share", axis: "h" },
    toFame: { from: "feed", to: "fame", axis: "h" },
  },
};

/**
 * The loop: a Steam account is linked and its achievements flow into the profile, the feed and a social card;
 * then a player publishes a guide, which enters the guides campaign and reaches the Hall of Fame. PlayStation
 * keeps syncing all along.
 */
const HOPS: Hop<Wire>[] = [
  { edge: "steamIn", at: 0 },
  { edge: "toProfile", at: 0.9 },
  { edge: "toFeed", at: 1.8 },
  { edge: "toPlayers", at: 2.7, reply: true },
  { edge: "toShare", at: 3.6, reply: true },
  { edge: "toPlayers", at: 6.0, back: true },
  { edge: "toFeed", at: 6.9 },
  { edge: "toCamp", at: 7.8 },
  { edge: "toFame", at: 8.7, reply: true },
  { edge: "toPlayers", at: 9.6, reply: true },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "link", at: 0.84 },
  { block: "profile", at: 1.74 },
  { block: "feed", at: 2.64 },
  { block: "players", at: 3.54 },
  { block: "share", at: 4.44 },
  { block: "profile", at: 6.84 },
  { block: "feed", at: 7.74 },
  { block: "camp", at: 8.64 },
  { block: "fame", at: 9.54 },
  { block: "players", at: 10.44 },
];

function blocks(t: LobbyFlowLabels): Record<Block, FlowBlock> {
  return {
    psn: { title: "PlayStation", sub: t.psnSub },
    steam: { title: "Steam", sub: t.steamSub },
    xbox: { title: "Xbox", sub: t.xboxSub, muted: true },
    link: { title: t.link, sub: t.linkSub, accent: true },
    profile: { title: t.profile, sub: t.profileSub, accent: true },
    feed: { title: t.feed, sub: t.feedSub, centred: true },
    talk: { title: t.discussions, sub: t.discussionsSub, centred: true },
    camp: { title: t.campaigns, sub: t.campaignsSub, centred: true },
    players: { title: t.players, sub: t.playersSub },
    share: { title: t.share, sub: t.shareSub },
    fame: { title: t.fame, sub: t.fameSub },
  };
}

/** In the tall layout the platforms and the blocks below the panel are narrow: their names go in the middle. */
function tallBlocks(t: LobbyFlowLabels): Record<Block, FlowBlock> {
  const b = blocks(t);
  for (const id of ["psn", "steam", "xbox", "players", "share", "fame"] as const) b[id] = { ...b[id], centred: true };
  return b;
}

function miniBlocks(t: LobbyFlowLabels): Record<Block, FlowBlock> {
  const b = blocks(t);
  return {
    ...b,
    psn: { title: "PlayStation", centred: true },
    steam: { title: "Steam", centred: true },
    link: { title: "Lobby9", accent: true, centred: true },
    feed: { title: t.feed, centred: true },
    share: { title: t.share, centred: true },
    fame: { title: t.fame, centred: true },
  };
}

interface LobbyFlowProps {
  labels: LobbyFlowLabels;
  /** `card`: the picture of a project card. `panel`: the case page. Each has its own phone layout. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * Lobby9 as a live architecture diagram, drawn only from what the public site states: PlayStation and Steam linked
 * (Xbox on the roadmap) into one gamer profile, which feeds the community (feed, discussions, campaigns), the Hall
 * of Fame, social cards and the players' web app.
 */
export function LobbyFlow({ labels: t, mode, className }: LobbyFlowProps) {
  const shared = {
    hops: HOPS,
    flashes: FLASHES,
    // Both linked platforms keep syncing: a steady stream of data from each into the account linking.
    streams: [
      { edge: "psnIn" as Wire, count: 2 },
      { edge: "steamIn" as Wire, count: 2, delay: 1.2 },
    ],
    log: [t.logSync, t.logGuide] as [string, string],
  };
  if (mode === "card") {
    return (
      <FlowDiagram layout={MINI} blocks={miniBlocks(t)} {...shared} className={cn(flowStyles.cardMini, className)} />
    );
  }
  return (
    <div className={flowStyles.root}>
      <FlowDiagram layout={WIDE} blocks={blocks(t)} {...shared} label={t.aria} className={flowStyles.wide} />
      <FlowDiagram layout={TALL} blocks={tallBlocks(t)} {...shared} label={t.aria} className={flowStyles.tall} />
    </div>
  );
}
