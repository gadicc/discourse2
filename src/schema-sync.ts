import fs from "fs/promises";
import util from "node:util";
import child_process from "node:child_process";
import meta from "./openapi-meta.json" with { type: "json" };
import { webcrypto } from "node:crypto";

const OPENAPI_URL = "https://docs.discourse.org/openapi.json";
const OPENAPI_PATH = "./src/openapi.json";
const OPENAPI_META_PATH = "./src/openapi-meta.json"; // must match import above

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
    retrievedatDate: date.toISOString().split("T")[0],
    hash,
    hashShort: hash.slice(0, 7),
  };

  await fs.writeFile(OPENAPI_PATH, contents);
  await fs.writeFile(OPENAPI_META_PATH, JSON.stringify(newMeta, null, 2));

  // TODO, adapt all this to run programatically
  console.log();
  await execAndLog("yarn schema:ts");
  await execAndLog("yarn generate");

  const files = [
    "openapi.json",
    "openapi-meta.json",
    "schema.d.ts",
    "generated.ts",
  ]
    .map((file) => `src/${file}`)
    .join(" ");

  const message =
    "fix(pkg): Update OpenAPI schema (" +
    newMeta.retrievedatDate +
    '; "' +
    newMeta.hashShort +
    '")';
  await execAndLog(`git commit -m '${message}' ${files}`);

  const CI =
    process.env.CI && process.env.CI !== "false" && process.env.CI !== "0";
  if (!CI) {
    console.log(
      "Environment variable `CI` is not set or is false, skipping git commit.",
    );
    return;
  }

  await execAndLog("git push");
})();
