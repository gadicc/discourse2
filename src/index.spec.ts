import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import { describe, expect, test as it } from "@jest/globals";
import createCachingMock from "jest-fetch-mock-cache";
import Store from "jest-fetch-mock-cache/lib/stores/nodeFs";

import Discourse from "./index";
const discourse = new Discourse("https://forums.kiri.art", {
  "Api-Key": process.env.DISCOURSE_API_KEY,
  "Api-Username": process.env.DISCOURSE_API_USERNAME,
});

const cachingMock = createCachingMock({ store: new Store() });
fetchMock.mockImplementation(cachingMock);

describe("discourse-api", () => {
  it("listLatestTopics (no params nor auth)", async () => {
    const results = await discourse.listLatestTopics();
    expect(Array.isArray(results?.users)).toBe(true);
  });
  it("getTopic (with params and auth)", async () => {
    const result = await discourse.getTopic({ id: "209" });
    expect(result.post_stream).toBeDefined();
  });
});
