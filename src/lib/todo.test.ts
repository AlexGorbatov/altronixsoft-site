import { afterEach, describe, expect, it, vi } from "vitest";
import { filled, filledItems, todoLabel } from "./todo";

describe("filled", () => {
  it("accepts real content", () => {
    expect(filled("Since 2019")).toBe(true);
  });
  it("rejects placeholders, empty and missing values", () => {
    expect(filled("TODO(owner): price")).toBe(false);
    expect(filled("  ")).toBe(false);
    expect(filled("")).toBe(false);
    expect(filled(undefined)).toBe(false);
    expect(filled(null)).toBe(false);
  });
  it("rejects a sentence that still contains a placeholder", () => {
    expect(filled("From TODO(owner): price")).toBe(false);
  });
});

describe("filledItems", () => {
  it("keeps only real values", () => {
    expect(filledItems(["Java", "TODO(owner): x", "Spring"])).toEqual(["Java", "Spring"]);
    expect(filledItems(undefined)).toEqual([]);
  });
});

describe("todoLabel", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("shows the placeholder in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(todoLabel("TODO(owner): x")).toBe("TODO(owner): x");
    expect(todoLabel("real value")).toBeNull();
  });
  it("never shows it in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(todoLabel("TODO(owner): x")).toBeNull();
  });
});
