import {
  afterAll,
  beforeAll,
  describe,
  discourse,
  expect,
  randomName,
  skipCacheOnce,
  test,
  useCache,
} from "./_common.ts";

describe("tags", () => {
  useCache();

  async function cleanup() {
    skipCacheOnce();
    const result = await discourse.listTagGroups();
    if (result.tag_groups) {
      for (const tagGroup of result.tag_groups) {
        if (tagGroup.name?.startsWith("test-")) {
          // No documented delete API :D
          // console.warn("Found leftover test tag group:", tagGroup.name, "but cannot delete it");
          // We might have lots of randomName()'d tag groups, so don't spam the console
        }
      }
    }
  }
  beforeAll(cleanup);
  afterAll(cleanup);

  test("listTagGroups", async () => {
    const result = await discourse.listTagGroups();
    expect(Array.isArray(result.tag_groups)).toBe(true);
  });

  test("createTagGroup & getTagGroup", async () => {
    const name = randomName();
    const result = await discourse.createTagGroup({ name });
    expect(result.tag_group).toHaveProperty("id");

    const tagGroup = await discourse.getTagGroup({
      id: result.tag_group.id.toString(),
    });
    expect(tagGroup.tag_group?.id).toBe(result.tag_group.id);
  });

  test("updateTagGroup", async () => {
    const name = randomName();
    const result = await discourse.createTagGroup({ name });

    const updatedName = name + "-updated";
    const updated = await discourse.updateTagGroup({
      id: result.tag_group.id.toString(),
      name: updatedName,
    });
    expect(updated.tag_group?.name).toBe(updatedName);
  });

  test("listTags", async () => {
    const result = await discourse.listTags();
    expect(Array.isArray(result.tags)).toBe(true);
  });

  test.skip("getTag", async () => {
    // Tag was hand created for now (not in OpenAPI spec)
    const tag = await discourse.getTag({ name: "test" });
    expect(tag).toHaveProperty("topic_list");
  });
});
