import { describe, discourse, expect, test, useCache } from "./_common.ts";

describe("site", () => {
  useCache();

  test("getSite", async () => {
    const site = await discourse.getSite();
    expect(Array.isArray(site.categories)).toBe(true);
  });

  test("getSiteBasicInfo", async () => {
    const info = await discourse.getSiteBasicInfo();
    expect(info).toHaveProperty("title");
  });
});
