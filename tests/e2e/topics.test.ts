import { describe, discourse, expect, test } from "./_common.ts";

describe("topics", () => {
  test("createTopicPostPM", async () => {
    const result = await discourse.createTopicPostPM({
      title: "test topic creation",
      raw: "this is a test for topic creation, thank you",
      category: 2,
    });
    expect(result).toHaveProperty("topic_id");
  });

  test("getSpecificPostsFromTopic", async () => {
    const posts = await discourse.getSpecificPostsFromTopic({
      id: "4",
      "post_ids[]": 5,
    });
    expect(Array.isArray(posts.post_stream?.posts)).toBe(true);
  });

  test("getTopic", async () => {
    const topic = await discourse.getTopic({ id: "4" });
    expect(topic.id).toBe(4);
  });

  test("removeTopic", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be removed",
      raw: "this is a test for removeTopic",
      category: 2,
    });

    const id = topic.topic_id.toString();
    await discourse.removeTopic({ id });
  });

  test("updateTopic", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be updated",
      raw: "this is a test for updateTopic",
      category: 2,
    });

    const id = topic.topic_id.toString();
    const _result = await discourse.updateTopic({
      id,
      topic: {
        title: "test topic to be updated - updated",
        category_id: 3,
      },
    });

    // https://meta.discourse.org/t/stumped-on-api-update-of-topic/145330
    /*
    expect(result?.basic_topic?.title).toBe(
      "test topic to be updated - updated",
    );
    */
  });

  test("inviteToTopic -- SKIPPED (tested in `invites` suite)", async () => {
  });

  test("bookmarkTopic", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be bookmarked",
      raw: "this is a test for bookmarkTopic",
      category: 3,
    });
    const id = topic.topic_id.toString();

    await discourse.bookmarkTopic({ id });
  });

  test("updateTopicStatus", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be status udpated",
      raw: "this is a test for updateTopicStatus",
      category: 3,
    });
    const id = topic.topic_id.toString();

    const result = await discourse.updateTopicStatus({
      id,
      status: "closed",
      enabled: "true",
    });
    expect(result).toEqual({ success: "OK", topic_status_update: null });
  });

  test("listLatestTopics", async () => {
    const result = await discourse.listLatestTopics();
    expect(Array.isArray(result.topic_list?.topics)).toBe(true);
  });

  test("listTopTopics", async () => {
    const result = await discourse.listTopTopics();
    expect(Array.isArray(result.topic_list?.topics)).toBe(true);
  });

  test("setNotificationLevel", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be notified",
      raw: "this is a test for setNotificationLevel",
      category: 3,
    });

    const id = topic.topic_id.toString();
    const result = await discourse.setNotificationLevel({
      id,
      notification_level: "2",
    });
    expect(result).toEqual({ success: "OK" });
  });

  test("updateTopicTimestamp", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be timestamped",
      raw: "this is a test for updateTopicTimestamp",
      category: 3,
    });

    const id = topic.topic_id.toString();
    const result = await discourse.updateTopicTimestamp({
      id,
      timestamp: "1594291380",
    });
    expect(result).toEqual({ success: "OK" });
  });

  test("createTopicTimer", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be timed",
      raw: "this is a test for createTopicTimer",
      category: 3,
    });

    const id = topic.topic_id.toString();
    const result = await discourse.createTopicTimer({
      id,
      time: "",
      status_type: "close",
    });
    expect(result).toEqual({
      based_on_last_post: null,
      category_id: null,
      closed: false,
      duration_minutes: null,
      execute_at: null,
      success: "OK",
    });
  });

  test("getTopicByExternalId", async () => {
    const topic = await discourse.createTopicPostPM({
      title: "test topic to be external id'd",
      raw: "this is a test for getTopicByExternalId",
      category: 3,
      external_id: "getTopicByExternalId-test",
    });
    const id = topic.topic_id;

    const t = await discourse.getTopicByExternalId({
      external_id: "getTopicByExternalId-test",
    });
    expect(t.id).toBe(id);
  });
});
