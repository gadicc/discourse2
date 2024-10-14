"use strict";
import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { spy } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";

import createFetchCache from "@gadicc/fetch-mock-cache/runtimes/deno.ts";
import Store from "@gadicc/fetch-mock-cache/stores/fs.ts";

import Discourse from "./index.ts";

const DISCOURSE_API_KEY = Deno.env.get("DISCOURSE_API_KEY");
const DISCOURSE_API_USERNAME = Deno.env.get("DISCOURSE_API_USERNAME");

const discourseNoAuth = new Discourse("https://forums.kiri.art");
const discourseAuthed = new Discourse("https://forums.kiri.art", {
  "Api-Key": DISCOURSE_API_KEY,
  "Api-Username": DISCOURSE_API_USERNAME,
});

const fetchCache = createFetchCache({ Store });

describe("discourse-api", () => {
  let originalFetch: typeof globalThis.fetch;
  beforeAll(() => {
    originalFetch = globalThis.fetch;
    globalThis.fetch = spy(fetchCache);
  });
  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  describe("no auth", () => {
    const discourse = discourseNoAuth;
    it("missing params", () => {
      // @ts-expect-error: runtime missing params check
      return expect(discourse.getTopic()).rejects.toThrow(
        "data/path must have required property 'id'",
      );
    });

    it("invalid params", () => {
      return expect(
        // @ts-expect-error: runtime invalid params check
        discourse.getTopic({ id: "1", noSuchParam: true }),
      ).rejects.toThrow(/Unknown parameter/);
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

  if (DISCOURSE_API_KEY) {
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
