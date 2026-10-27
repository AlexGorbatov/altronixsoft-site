import { describe, expect, it } from "vitest";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, collectionSchema } from "./jsonld";

describe("breadcrumbSchema", () => {
  it("starts at the home page and follows the trail in order", () => {
    const schema = breadcrumbSchema("en", [
      { name: "Services", path: "/#services" },
      { name: "AI integration", path: "/services/ai" },
    ]);
    expect(schema.itemListElement.map((item) => [item.position, item.name, item.item])).toEqual([
      [1, siteConfig.name, `${siteConfig.url}/en`],
      [2, "Services", `${siteConfig.url}/en#services`],
      [3, "AI integration", `${siteConfig.url}/en/services/ai`],
    ]);
  });
});

describe("collectionSchema", () => {
  it("lists the pages of the collection with positions and language-prefixed addresses", () => {
    const schema = collectionSchema({
      lang: "uk",
      path: "/work",
      name: "Проєкти",
      description: "Кейси",
      items: [
        { name: "Nexus", path: "/work/nexus" },
        { name: "Lobby9", path: "/work/lobby9" },
      ],
    });
    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema.url).toBe(`${siteConfig.url}/uk/work`);
    expect(schema.mainEntity.itemListElement.map((item) => [item.position, item.url])).toEqual([
      [1, `${siteConfig.url}/uk/work/nexus`],
      [2, `${siteConfig.url}/uk/work/lobby9`],
    ]);
  });
});
