import { describe, expect, it } from "vitest";
import { CONTACT_HREF, contactHref } from "./site";
import { DEFAULT_REQUEST_TYPE, parseRequestType, requestTypes } from "./contact";

describe("request types", () => {
  it("starts the form on an option that exists", () => {
    expect(requestTypes.map((type) => type.value)).toContain(DEFAULT_REQUEST_TYPE);
  });

  it("starts a visitor who has not chosen a format on 'not sure yet', and the general link resets the topic to it", () => {
    expect(DEFAULT_REQUEST_TYPE).toBe("exploring");
    expect(CONTACT_HREF).toBe("/?type=exploring#contact");
  });

  it("still accepts every format a link can preselect", () => {
    for (const { value } of requestTypes) expect(parseRequestType(value)).toBe(value);
    expect(parseRequestType("project")).toBe("project");
    expect(parseRequestType("nope")).toBeUndefined();
    expect(parseRequestType(null)).toBeUndefined();
    expect(contactHref("exploring")).toBe("/?type=exploring#contact");
  });
});
