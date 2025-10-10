import { describe, discourse, expect, test, useCache } from "./_common.ts";

describe("search", () => {
  useCache();

  test("search", async () => {
    const result = await discourse.search({ q: "test" });
    expect(result).toHaveProperty("posts");
  });
});
