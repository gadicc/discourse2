import {
  afterAll,
  beforeAll,
  describe as _describe,
  it,
} from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import Discourse from "../../src/index.ts";
import server from "../docker/server.json" with { type: "json" };
import createFetchCache from "@gadicc/fetch-mock-cache/runtimes/deno.ts";
import Store from "@gadicc/fetch-mock-cache/stores/fs.ts";

export const fetchCache = createFetchCache({ Store });

export const discourse = new Discourse(server.url, {
  "Api-Key": server.apiKey,
  "Api-Username": "system",
});

export const discoursePublic = new Discourse(server.url);

export function describe(name: string, fn: () => void) {
  function block() {
    let fetchOrig: typeof globalThis.fetch;
    beforeAll(() => {
      fetchOrig = globalThis.fetch;
      globalThis.fetch = fetchCache;
    });

    afterAll(() => {
      globalThis.fetch = fetchOrig;
    });

    fn();
  }

  _describe(name, block);
}

export { expect, it };
