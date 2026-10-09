import { describe, expect, it } from "vitest";
import { DEFAULT_REQUEST_TYPE, parseRequestType, requestTypes } from "@/data/contact";

describe("parseRequestType", () => {
  it("accepts every topic offered in the form", () => {
    for (const { value } of requestTypes) expect(parseRequestType(value)).toBe(value);
  });

  it("maps the retired ?type=team link to the fixed-scope project topic", () => {
    expect(parseRequestType("team")).toBe("project");
    expect(DEFAULT_REQUEST_TYPE).toBe("project");
  });

  it("ignores unknown values", () => {
    expect(parseRequestType("zzz")).toBeUndefined();
    expect(parseRequestType(null)).toBeUndefined();
  });
});
