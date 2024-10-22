import { describe, discourse, expect, test } from "./_common.ts";

describe("tags", () => {
  test("listTagGroups", async () => {
    const result = await discourse.listTagGroups();
    expect(Array.isArray(result.tag_groups)).toBe(true);
  });

  test("createTagGroup & getTagGroup", async () => {
    const result = await discourse.createTagGroup({
      name: "test tag group",
    });
    expect(result.tag_group).toHaveProperty("id");

    const tagGroup = await discourse.getTagGroup({
      id: result.tag_group.id.toString(),
    });
    expect(tagGroup.tag_group?.id).toBe(result.tag_group.id);
  });

  test("updateTagGroup", async () => {
    const result = await discourse.createTagGroup({
      name: "test tag group to update",
    });

    const updated = await discourse.updateTagGroup({
      id: result.tag_group.id.toString(),
      name: "test tag group updated",
    });
    expect(updated.tag_group?.name).toBe("test tag group updated");
  });

  test("listTags", async () => {
    const result = await discourse.listTags();
    expect(Array.isArray(result.tags)).toBe(true);
  });

  test("getTag", async () => {
    // Tag was hand created for now (not in OpenAPI spec)
    const tag = await discourse.getTag({ name: "test" });
    expect(tag).toHaveProperty("topic_list");
  });
});
