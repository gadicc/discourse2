import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import { describe, expect, test as it } from "@jest/globals";
import createCachingMock from "jest-fetch-mock-cache";
import Store from "jest-fetch-mock-cache/lib/stores/nodeFs";

import Discourse from "./index";
const discourseNoAuth = new Discourse("https://forums.kiri.art");
const discourseAuthed = new Discourse("https://forums.kiri.art", {
  "Api-Key": process.env.DISCOURSE_API_KEY,
  "Api-Username": process.env.DISCOURSE_API_USERNAME,
});

const cachingMock = createCachingMock({ store: new Store() });
fetchMock.mockImplementation(cachingMock);

describe("discourse-api", () => {
  describe("no auth", () => {
    const discourse = discourseNoAuth;
    it("invalid params", async () => {
      // @ts-expect-error: runtime invalid params check
      return expect(discourse.getTopic({ noSuchParam: true })).rejects.toThrow(
        /Unknown parameter/,
      );
    });

    it("getTopic (public post, no auth)", async () => {
      const result = await discourse.getTopic({ id: "3" });
      expect(result.id).toBe(3);
    });

    it("listLatestTopics (no params)", async () => {
      const results = await discourse.listLatestTopics();
      expect(Array.isArray(results?.users)).toBe(true);
    });
  });

  if (process.env.DISCOURSE_API_KEY) {
    describe("with auth", () => {
      const discourse = discourseAuthed;

      it("getTopic", async () => {
        const result = await discourse.getTopic({ id: "1" });
        expect(result.id).toBe(1);
      });

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
