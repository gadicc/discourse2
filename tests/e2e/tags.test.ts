import {
  afterAll,
  beforeAll,
  describe,
  discourse,
  expect,
  randomName,
  setNextCacheId,
  skipCacheOnce,
  test,
  useCache,
} from "./_common.ts";

describe("tags", () => {
  useCache();

  async function cleanup() {
    if (Deno.env.get("CI")) return;
    skipCacheOnce();
    const result = await discourse.listTagGroups();
    if (result.tag_groups) {
      for (const tagGroup of result.tag_groups) {
        if (tagGroup.name?.startsWith("test-")) {
          // No documented delete API :D
          // console.warn("Found leftover test tag group:", tagGroup.name, "but cannot delete it");
          // We might have lots of randomName()'d tag groups, so don't spam the console
          // It also means we should manually set cache IDs due to the random names.
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
    setNextCacheId("createTagGroup-createTagGroup");
    const result = await discourse.createTagGroup({ name });
    expect(result.tag_group).toHaveProperty("id");

    setNextCacheId("createTagGroup-getTagGroup");
    const tagGroup = await discourse.getTagGroup({
      id: result.tag_group.id.toString(),
    });
    expect(tagGroup.tag_group?.id).toBe(result.tag_group.id);
  });

  test("updateTagGroup", async () => {
    setNextCacheId("updateTagGroup-createTagGroup");
    const result = await discourse.createTagGroup({ name: randomName() });
    const name = result.tag_group.name;

    const updatedName = name + "-updated";
    setNextCacheId("updateTagGroup-updateTagGroup");
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
