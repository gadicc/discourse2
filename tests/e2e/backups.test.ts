import {
  describe,
  discourse,
  expect,
  fetchCache,
  setNextCacheId,
  test,
  useCache,
} from "./_common.ts";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// This is nice and all but since we can't give backups a unique ID,
// this still isn't completely safe as it could pick up a backup
// from a different test when running in parallel.  But, as things
// stand, it's enough for the current tests.
async function getBackupsWhenReady(cacheId: string) {
  // First try from/with cache
  fetchCache.once({ id: cacheId });
  let result = await discourse.getBackups();
  if (result.length > 0) return result;

  // Now try repeatedly, no cache, waiting up to ~12.5s, rewrite cache.
  for (let i = 0; i < 25; i++) {
    fetchCache.once({
      id: cacheId,
      readCache: false,
      writeCache: true,
    });
    result = await discourse.getBackups();
    if (result.length > 0) break;
    await sleep(500);
  }
  return result;
}

describe("backups", () => {
  useCache();

  test("createBackup", async () => {
    setNextCacheId("createBackup-createBackup");
    const result = await discourse.createBackup({ with_uploads: false });
    expect(result).toEqual({ success: "OK" });
  });

  test("getBackups", async () => {
    setNextCacheId("getBackups-createBackup");
    await discourse.createBackup({ with_uploads: false });

    const result = await getBackupsWhenReady("getBackups-getBackups");
    expect(Array.isArray(result)).toBe(true);
    expect(result![0]).toHaveProperty("filename");
    expect(result![0]).toHaveProperty("size");
    expect(result![0]).toHaveProperty("last_modified"); // string, consider date?
  });

  test("sendDownloadBackupEmail & download", async () => {
    setNextCacheId("sendDownloadBackupEmail-createBackup");
    await discourse.createBackup({ with_uploads: false });

    const backups = await getBackupsWhenReady(
      "sendDownloadBackupEmail-getBackups",
    );
    expect(backups?.length).toBeGreaterThan(0);
    const filename = backups?.[0].filename || "ERROR-no-filename";

    setNextCacheId("sendDownloadBackupEmail-sendDownloadBackupEmail-noExist");
    await expect(discourse.sendDownloadBackupEmail({
      filename: "non-existant-file",
    })).rejects.toThrow(/<title>Page Not Found - Discourse<\/title>/);

    // Success if it doesn't throw, unfortunately we don't get token back
    setNextCacheId("sendDownloadBackupEmail-sendDownloadBackupEmail-exists");
    await discourse.sendDownloadBackupEmail({ filename });

    setNextCacheId("sendDownloadBackupEmail-downloadBackup-invalidToken");
    await expect(discourse.downloadBackup({ filename, token: "invalid" }))
      .rejects.toThrow(
        /Sorry, this backup download link has already been used or has expired./,
      );

    // Unfortunately, since token only comes by email, no way to test this :/
    // TODO, database access to get token.
  });
});
