import {
  afterAll,
  beforeAll,
  describe,
  discourse,
  expect,
  skipCacheOnce,
  test,
  useCache,
} from "./_common.ts";

describe("posts", () => {
  useCache();

  async function cleanup() {
    if (Deno.env.get("CI")) return;
    skipCacheOnce();
    const posts = await discourse.listPosts();
    if (posts.latest_posts) {
      for (const post of posts.latest_posts) {
        if (post.topic_title?.startsWith("test-")) {
          console.warn("Deleting leftover test post/topic:", post.topic_title);
          skipCacheOnce();
          await discourse.removeTopic({ id: post.topic_id?.toString()! });
        }
      }
    }
  }
  beforeAll(cleanup);
  afterAll(cleanup);

  test("listPosts", async () => {
    const posts = await discourse.listPosts();
    expect(posts).toHaveProperty("latest_posts");

    if (posts.latest_posts) {
      for (const post of posts.latest_posts) {
        if (post.topic_title?.startsWith("test-")) {
          console.warn("Deleting leftover test post/topic:", post.topic_title);
          await discourse.removeTopic({ id: post.topic_id?.toString()! });
        }
      }
    }
  });

  test("createTopicPostPM - SKIPPED (tested in topics suite)", async () => {});

  test("getPost", async () => {
    const post = await discourse.getPost({ id: "1" });
    expect(post.id).toBe(1);
  });

  test("updatePost", async () => {
    const post = await discourse.createTopicPostPM({
      title: "test-updatePost",
      raw: "new post - update me",
      category: 3,
    });
    const id = post.id.toString();

    const result = await discourse.updatePost({
      id,
      post: {
        raw: post.raw + " - updated",
      },
    });
    expect(result.post.raw).toBe(post.raw + " - updated");

    await discourse.removeTopic({ id: post.topic_id?.toString()! });
  });

  /*
  // Can't verify CSRF token authenticity.
  test("deletePost", async () => {
    const post = await discourse.createTopicPostPM({
      title: "deletePost test - please ignore",
      raw: "new post - delete me",
      category: 3,
    });
    const id = post.id;

    // If this doesn't throw, it's a 200 success.
    await discourse.deletePost({ id });
  });
  */

  test("postReplies", async () => {
    const replies = await discourse.postReplies({ id: "1" });
    expect(Array.isArray(replies)).toBe(true);
  });

  test("lockPost", async () => {
    const post = await discourse.createTopicPostPM({
      title: "test-lockPost: it will be locked",
      raw: "this post will be locked from the API",
      category: 3,
    });
    const id = post.id.toString();

    const result = await discourse.lockPost({
      id,
      locked: "you shall not pass",
    });
    const locked = result.locked;
    expect(locked === false || locked === true).toBe(true);

    await discourse.removeTopic({ id: post.topic_id?.toString()! });
  });

  /*
  // Can't verify CSRF token authenticity -> 404
  test("performPostAction", async () => {
    const post = await discourse.createTopicPostPM({
      title: "performPostAction test, it will be flagged",
      raw: "this post will be flagged from the API",
      category: 3,
    });
    const id = post.id;

    const result = await discourse.performPostAction({
      id,
      post_action_type_id: 0,
      flag_topic: true,
    });
    console.log(result);
  });
  */
});
