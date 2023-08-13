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
  describe("no auth", () => {
    it("TODO - tests that dont require auth :)", () => {});
  });

  if (process.env.DISCOURSE_API_KEY) {
    describe("with auth", () => {
      it("listLatestTopics (no params)", async () => {
        const results = await discourse.listLatestTopics();
        expect(Array.isArray(results?.users)).toBe(true);
      });

      it("getTopic (with params)", async () => {
        const result = await discourse.getTopic({ id: "209" });
        expect(result.post_stream).toBeDefined();
      });
    });
  } else {
    console.log(
      "Skipping tests that require auth because DISCOURSE_API_KEY not set",
    );
    return;
  }
});
