import { describe, discourse, expect, it } from "./common.ts";

describe("backups", () => {
  it("createBackup", async () => {
    const result = await discourse.createBackup({ with_uploads: false });
    expect(result).toEqual({ success: "OK" });
  });

  it("getBackups", async () => {
    const result = await discourse.getBackups();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("filename");
    expect(result[0]).toHaveProperty("size");
    expect(result[0]).toHaveProperty("last_modified"); // string, consider date?
  });

  it("sendDownloadBackupEmail & download", async () => {
    const backups = await discourse.getBackups();
    const filename = backups[0].filename;

    await expect(discourse.sendDownloadBackupEmail({
      filename: "non-existant-file",
    })).rejects.toThrow(/<title>Page Not Found - Discourse<\/title>/);

    // Success if it doesn't throw, unfortunately we don't get token back
    await discourse.sendDownloadBackupEmail({ filename });

    await expect(discourse.downloadBackup({ filename, token: "invalid" }))
      .rejects.toThrow(
        /Sorry, this backup download link has already been used or has expired./,
      );

    // Unfortunately, since token only comes by email, no way to test this :/
    // TODO, database access to get token.
  });
});
