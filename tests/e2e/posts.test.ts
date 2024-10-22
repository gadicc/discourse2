import { describe, discourse, expect, test } from "./_common.ts";

describe("posts", () => {
  test("listPosts", async () => {
    const posts = await discourse.listPosts();
    expect(posts).toHaveProperty("latest_posts");
  });

  test("createTopicPostPM - SKIPPED (tested in topics suite)", async () => {});

  test("getPost", async () => {
    const post = await discourse.getPost({ id: "1" });
    expect(post.id).toBe(1);
  });

  test("updatePost", async () => {
    const post = await discourse.createTopicPostPM({
      title: "updatePost test",
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
      title: "lockPost test, it will be locked",
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
