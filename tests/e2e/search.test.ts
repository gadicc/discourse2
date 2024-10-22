import { describe, discourse, expect, test } from "./_common.ts";

describe("search", () => {
  test("search", async () => {
    const result = await discourse.search({ q: "test" });
    expect(result).toHaveProperty("posts");
  });
});
