import { describe, discourse, expect, test, useCache } from "./_common.ts";

describe("private-messages", () => {
  useCache();

  test("createTopicPostPM - SKIPPED (tested in `topics`)", async () => {});

  test("listUserPrivateMessages", async () => {
    const response = await discourse.listUserPrivateMessages({
      username: "system",
    });
    expect(response).toHaveProperty("topic_list");
  });

  test("getUserSentPrivateMessages", async () => {
    const response = await discourse.getUserSentPrivateMessages({
      username: "system",
    });
    expect(response).toHaveProperty("topic_list");
  });
});
