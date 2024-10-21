import { describe, discourse, expect, test } from "./_common.ts";

describe("invites", () => {
  test("createInvite", async () => {
    const invite = await discourse.createInvite();
    expect(invite.link).toBeDefined();
  });

  test("createMultipleInvites -- SKIPPED", () => {});
  /*
  test.skip("createMultipleInvites", async () => {
    // Can't verify CSRF token authenticity.
    const invites = await discourse.createMultipleInvites({
      // Example is array, OpenAPI spec says string?
      email: "invite1@localhost,invite2@localhost",
    });
    console.log(invites);

  });
  */

  test("inviteToTopic", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "private message",
      raw: "this is a private message",
      target_recipients: "system",
      archetype: "private_message",
    });

    const result = await discourse.inviteToTopic({
      id: topic.topic_id.toString(),
      email: "inviteToTopic@null.local",
    });
    expect(result).toEqual({ success: "OK" });
  });
});
