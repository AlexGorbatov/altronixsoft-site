import nodemailer from "nodemailer";
import { requestTypeLabel } from "@/data/contact";
import { siteConfig, type RequestType } from "@/data/site";
import { contactSchema, fieldErrors, type ContactInput } from "@/lib/contact-schema";

/**
 * Contact form endpoint. Order of checks: content type, origin, rate limit, body size, honeypot, validation,
 * configuration, delivery. Provider comes from the environment (see .env.example):
 * Resend (RESEND_API_KEY) or SMTP (SMTP_HOST / SMTP_USER / SMTP_PASS). CONTACT_DRY_RUN=1 accepts
 * submissions without sending anything (staging / tests).
 */

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
/** Hard ceilings, so a flood of distinct keys can neither exhaust memory nor flood the mailbox. */
const MAX_TRACKED_CLIENTS = 5000;
const GLOBAL_LIMIT = { max: 60, windowMs: 60 * 60 * 1000 };

/**
 * Per-instance, in-memory limiter. Good enough to blunt a single noisy client; on serverless
 * platforms every instance has its own counter, so put a shared limiter (e.g. a KV store or the
 * platform firewall) in front if abuse becomes real.
 */
const hits = new Map<string, { count: number; resetAt: number }>();
let global = { count: 0, resetAt: 0 };
let lastSweep = 0;

function rateLimited(key: string, now = Date.now()): number | null {
  // Global ceiling first: protects the mailbox even when every request looks like a new client.
  if (global.resetAt <= now) global = { count: 0, resetAt: now + GLOBAL_LIMIT.windowMs };
  global.count += 1;
  if (global.count > GLOBAL_LIMIT.max) return Math.ceil((global.resetAt - now) / 1000);

  // Sweep expired entries at most once a minute (not on every request).
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }

  const entry = hits.get(key);
  if (!entry) {
    // Bounded map: when full, drop the oldest tracked client (Map keeps insertion order).
    if (hits.size >= MAX_TRACKED_CLIENTS) hits.delete(hits.keys().next().value as string);
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return null;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max ? Math.ceil((entry.resetAt - now) / 1000) : null;
}

/**
 * Client identity for rate limiting. Prefers headers set by the hosting platform (clients cannot forge
 * them); otherwise the LAST hop of x-forwarded-for, which is the one appended by our own proxy. The first
 * hop is client-controlled and must not be trusted.
 */
function clientKey(request: Request): string {
  const h = request.headers;
  const platform = h.get("x-vercel-forwarded-for") ?? h.get("cf-connecting-ip") ?? h.get("fly-client-ip");
  if (platform) return platform.split(",")[0].trim();
  const forwarded = h.get("x-forwarded-for")?.split(",").map((part) => part.trim()).filter(Boolean);
  return forwarded?.at(-1) ?? h.get("x-real-ip") ?? "unknown";
}

/** Browsers always send Origin on a cross-origin POST. Same-origin (or our configured site) only. */
function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients: no ambient credentials to abuse
  try {
    const { host } = new URL(origin);
    return host === request.headers.get("host") || host === new URL(siteConfig.url).host;
  } catch {
    return false;
  }
}

/** Reads the body but gives up as soon as it exceeds the limit, instead of buffering it all first. */
async function readLimited(request: Request, limit: number): Promise<string | null> {
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > limit) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > limit) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

type Provider = "resend" | "smtp" | "dry-run" | null;

function activeProvider(): Provider {
  if (process.env.CONTACT_DRY_RUN === "1") return "dry-run";
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) return "smtp";
  return null;
}

/** One line only: strips anything that could inject headers. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function buildMessage(input: ContactInput) {
  const typeLabel = requestTypeLabel(input.type as RequestType);
  return {
    subject: `[Altronix site] ${typeLabel} — ${oneLine(input.name)}`.slice(0, 200),
    text: [
      `Request type: ${typeLabel}`,
      `Name: ${oneLine(input.name)}`,
      `Email: ${input.email}`,
      `Company: ${input.company ? oneLine(input.company) : "—"}`,
      "",
      input.message,
    ].join("\n"),
  };
}

async function deliver(provider: Exclude<Provider, null>, input: ContactInput): Promise<void> {
  if (provider === "dry-run") {
    if (process.env.NODE_ENV === "production") {
      console.warn("[contact] CONTACT_DRY_RUN=1 in production: submissions are accepted but NOT delivered.");
    }
    return;
  }

  const to = process.env.CONTACT_TO || siteConfig.email;
  const from = process.env.CONTACT_FROM || `${siteConfig.name} <no-reply@altronixsoft.com>`;
  const { subject, text } = buildMessage(input);

  if (provider === "resend") {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: input.email, subject, text }),
    });
    if (!response.ok) throw new Error(`Resend responded with ${response.status}`);
    return;
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transport.sendMail({ from, to, replyTo: input.email, subject, text });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "bad_request" }, { status: 415 });
  }

  if (!originAllowed(request)) return Response.json({ error: "forbidden" }, { status: 403 });

  const wait = rateLimited(clientKey(request));
  if (wait !== null) {
    return Response.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(wait) } });
  }

  const raw = await readLimited(request, MAX_BODY_BYTES);
  if (raw === null) return Response.json({ error: "too_large" }, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: pretend everything worked so bots learn nothing, and send nothing.
  if (typeof body === "object" && body !== null && "website" in body && String(body.website ?? "").trim() !== "") {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "validation", fields: fieldErrors(parsed.error) }, { status: 400 });
  }

  const provider = activeProvider();
  if (!provider) return Response.json({ error: "not_configured" }, { status: 503 });

  try {
    await deliver(provider, parsed.data);
  } catch (error) {
    console.error("[contact] delivery failed:", error instanceof Error ? error.message : error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
