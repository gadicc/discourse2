import { describe, discourse, expect, test } from "./_common.ts";

describe("badges", () => {
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
    expect(Array.isArray(result.badge_types)).toBe(true);
    expect(result).toHaveProperty("badge");
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
    expect(Array.isArray(result.badges)).toBe(true);
  });
});
