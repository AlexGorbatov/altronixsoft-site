import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Guard against drift: the text tiers and the running-text sizes must come from tokens, not raw literals. */
const TIER_HEX = ["#d3dae6", "#bcc6d6", "#9aa9be", "#8fdde8"];
const RAW_SIZES = ["text-[12px]", "text-[14px]", "text-[15px]"];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css)$/.test(name) && !name.endsWith(".test.ts") ? [path] : [];
  });
}

const files = sourceFiles("src").map((path) => ({ path, text: readFileSync(path, "utf8") }));

describe("design tokens", () => {
  it("uses the text-tier colours only through tokens (globals.css defines them)", () => {
    const offenders = files
      .filter((f) => !f.path.endsWith("globals.css"))
      .filter((f) => TIER_HEX.some((hex) => f.text.includes(hex)))
      .map((f) => f.path);
    expect(offenders).toEqual([]);
  });

  it("uses the type scale (text-caption / text-small / text-body) instead of raw pixel sizes", () => {
    const offenders = files.filter((f) => RAW_SIZES.some((raw) => f.text.includes(raw))).map((f) => f.path);
    expect(offenders).toEqual([]);
  });
});
