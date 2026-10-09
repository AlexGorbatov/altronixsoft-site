import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const body = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  type: "technical-review",
  message: "We would like a platform review of our system.",
  consent: true,
  website: "",
};

let counter = 0;
/** A request from a unique client (so the in-memory rate limiter never leaks between tests). */
function post(payload: unknown, headers: Record<string, string> = {}, raw?: string) {
  counter += 1;
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost:3000", "x-vercel-forwarded-for": `10.0.0.${counter}`, ...headers },
    body: raw ?? JSON.stringify(payload),
  });
}

async function loadRoute() {
  vi.resetModules();
  return (await import("./route")).POST;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("SMTP_HOST", "");
    vi.stubEnv("CONTACT_DRY_RUN", "");
    vi.stubEnv("CONTACT_TO", "team@example.com");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects non-JSON content", async () => {
    const POST = await loadRoute();
    const res = await POST(post(null, { "content-type": "text/plain" }, "x"));
    expect(res.status).toBe(415);
  });

  it("rejects a foreign Origin", async () => {
    const POST = await loadRoute();
    const res = await POST(post(body, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("accepts a same-origin request", async () => {
    vi.stubEnv("CONTACT_DRY_RUN", "1");
    const POST = await loadRoute();
    const res = await POST(post(body, { origin: "http://localhost:3000" }));
    expect(res.status).toBe(200);
  });

  it("rejects an oversized body (content-length and actual size)", async () => {
    const POST = await loadRoute();
    expect((await POST(post(body, { "content-length": "999999" }))).status).toBe(413);
    expect((await POST(post(null, {}, JSON.stringify({ x: "a".repeat(30_000) })))).status).toBe(413);
  });

  it("rejects invalid JSON", async () => {
    const POST = await loadRoute();
    expect((await POST(post(null, {}, "{oops"))).status).toBe(400);
  });

  it("answers ok to a filled honeypot without sending anything", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const POST = await loadRoute();
    const res = await POST(post({ ...body, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns per-field validation errors", async () => {
    const POST = await loadRoute();
    const res = await POST(post({ ...body, name: "A", email: "nope", consent: false }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("validation");
    expect(Object.keys(json.fields).sort()).toEqual(["consent", "email", "name"]);
  });

  it("reports an unconfigured mail provider", async () => {
    const POST = await loadRoute();
    const res = await POST(post(body));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("not_configured");
  });

  it("delivers through Resend with reply-to and a single-line subject", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const POST = await loadRoute();
    const res = await POST(post({ ...body, name: "Ada\r\nBcc: attacker@example.com" }));
    expect(res.status).toBe(200);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const sent = JSON.parse(init.body);
    expect(sent.to).toEqual(["team@example.com"]);
    expect(sent.reply_to).toBe("ada@example.com");
    expect(sent.subject).not.toMatch(/[\r\n]/);
    expect(sent.subject).toContain("Platform review");
    expect(init.headers.Authorization).toBe("Bearer re_test");
  });

  it("reports a delivery failure as 502", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const POST = await loadRoute();
    expect((await POST(post(body))).status).toBe(502);
  });

  it("rate-limits a client after five requests", async () => {
    vi.stubEnv("CONTACT_DRY_RUN", "1");
    const POST = await loadRoute();
    const same = { "x-vercel-forwarded-for": "203.0.113.7" };
    const statuses: number[] = [];
    for (let i = 0; i < 7; i += 1) statuses.push((await POST(post(body, same))).status);
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429, 429]);
  });

  it("does not let a forged first x-forwarded-for hop bypass the limit", async () => {
    vi.stubEnv("CONTACT_DRY_RUN", "1");
    const POST = await loadRoute();
    const statuses: number[] = [];
    for (let i = 0; i < 7; i += 1) {
      const req = post(body, { "x-forwarded-for": `9.9.9.${i}, 198.51.100.1` });
      req.headers.delete("x-vercel-forwarded-for");
      statuses.push((await POST(req)).status);
    }
    expect(statuses.slice(5)).toEqual([429, 429]);
  });
});
