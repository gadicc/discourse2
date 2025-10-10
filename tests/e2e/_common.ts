import { afterAll, beforeAll, describe, it, test } from "@std/testing/bdd";
import { expect } from "@std/expect";
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

export function useCache() {
  let fetchOrig: typeof globalThis.fetch;
  beforeAll(() => {
    fetchOrig = globalThis.fetch;
    globalThis.fetch = fetchCache;
  });

  afterAll(() => {
    globalThis.fetch = fetchOrig;
  });
}

export function skipCacheOnce() {
  fetchCache.once({ readCache: false, writeCache: false });
}

export function setNextCacheId(id: string) {
  fetchCache.once({ id });
}

function randomName() {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return "test-" + result;
}

export { afterAll, beforeAll, describe, expect, it, randomName, test };
