import util from "node:util";
import child_process from "node:child_process";
import meta from "../src/openapi-meta.json" with { type: "json" };
import { webcrypto } from "node:crypto";

const OPENAPI_URL = "https://docs.discourse.org/openapi.json";
const OPENAPI_PATH = "./src/openapi.json";
const OPENAPI_META_PATH = "./src/openapi-meta.json"; // must match import above

const ENV_CI = Deno.env.get("CI");
const CI = ENV_CI && ENV_CI !== "false" && ENV_CI !== "0";

const { subtle } = webcrypto;
const exec = util.promisify(child_process.exec);

async function execAndLog(command: string) {
  const { stdout, stderr } = await exec(command);
  console.log(stdout);
  console.error(stderr);
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

(async () => {
  console.log(`Fetching OpenAPI schema from ${OPENAPI_URL}...`);
  const response = await fetch(OPENAPI_URL);
  const contents = await response.text();
  const hash = await digestMessage(contents);

  if (hash === meta.hash) {
    console.log("OpenAPI schema is up-to-date (hash match).");
    return;
  }

  console.log("OpenAPI schema has changed (hash mismatch). Updating...");
  const date = new Date();

  const newMeta = {
    retrievedAt: date.getTime(),
    retrievedAtDate: date.toISOString().split("T")[0],
    hash,
    hashShort: hash.slice(0, 7),
  };

  const encoder = new TextEncoder();
  await Deno.writeFile(OPENAPI_PATH, encoder.encode(contents));
  await Deno.writeFile(
    OPENAPI_META_PATH,
    encoder.encode(JSON.stringify(newMeta, null, 2)),
  );

  // TODO, adapt all this to run programatically
  console.log();
  await execAndLog("deno task schema:ts");
  await execAndLog("deno task generate");

  const files = [
    "openapi.json",
    "openapi-meta.json",
    "schema.d.ts",
    "generated.ts",
  ]
    .map((file) => `src/${file}`)
    .join(" ");

  const message = "fix(pkg): Update OpenAPI schema (" +
    newMeta.retrievedAtDate +
    '; "' +
    newMeta.hashShort +
    '")';
  await execAndLog(`git commit -m '${message}' ${files}`);

  if (!CI) {
    console.log(
      "Environment variable `CI` is not set or is false; skipping 'git push' and `gh workflow run release.yml`.",
    );
    return;
  }

  await execAndLog("git push");
  await execAndLog("gh workflow run release.yml --ref main");
})();
