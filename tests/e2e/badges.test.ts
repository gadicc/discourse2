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

describe("badges", () => {
  useCache();

  async function cleanup() {
    if (Deno.env.get("CI")) return;
    skipCacheOnce();
    const result = await discourse.adminListBadges();
    for (const badge of result.badges) {
      if (badge.name.startsWith("test-")) {
        console.warn("Deleting leftover test badge:", badge.name);
        skipCacheOnce();
        await discourse.deleteBadge({ id: badge.id });
      }
    }
  }
  beforeAll(cleanup);
  afterAll(cleanup);

  test("adminListBadge", async () => {
    const result = await discourse.adminListBadges();
    expect(Array.isArray(result.badges)).toBe(true);
    expect(result.badges[0]).toHaveProperty("id");
    expect(Array.isArray(result.badge_types)).toBe(true);
  });

  test("createBadge", async () => {
    const result = await discourse.createBadge({
      name: "test-badge",
      badge_type_id: 1,
    });
    await discourse.deleteBadge({ id: result.badge.id });
    expect(Array.isArray(result.badge_types)).toBe(true);
    expect(result).toHaveProperty("badge");

    await discourse.deleteBadge({ id: result.badge.id });
  });

  test("updateBadge", async () => {
    const result = await discourse.createBadge({
      name: "test-update-badge",
      badge_type_id: 1,
    });

    const id = result.badge.id;

    const updateResult = await discourse.updateBadge({
      id,
      name: "test-update-badge-updated",
      badge_type_id: 2,
    });

    expect(updateResult.badge.name).toBe("test-update-badge-updated");
    await discourse.deleteBadge({ id });
  });

  test("deleteBadge", async () => {
    const result = await discourse.createBadge({
      name: "test-delete-badge",
      badge_type_id: 1,
    });
    const id = result.badge.id;

    // Success if it doesn't throw
    await discourse.deleteBadge({ id });
  });

  test("listUserBadges", async () => {
    const result = await discourse.listUserBadges({ username: "system" });
    expect(Array.isArray(result.user_badges)).toBe(true);
  });
});
