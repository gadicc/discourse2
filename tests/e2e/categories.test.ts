import {
  describe,
  discourse,
  expect,
  randomName,
  setNextCacheId,
  test,
  useCache,
} from "./_common.ts";

describe("categories", () => {
  useCache();

  /*
   * Note: There's no documented deleteCategory API, so we need to give each category
   * a unique name to avoid conflicts, and manually specify cacheId.
   */

  test("listCategories", async () => {
    const result = await discourse.listCategories();
    expect(Array.isArray(result.category_list.categories)).toBe(true);
  });

  test("createCategory", async () => {
    const name = randomName();
    setNextCacheId("createCategory-createCategory");
    const result = await discourse.createCategory({ name });
    expect(result).toHaveProperty("category");
  });

  test("updateCategory", async () => {
    setNextCacheId("updateCategory-createCategory");
    const result = await discourse.createCategory({ name: randomName() });
    const name = result.category.name;
    const id = result.category.id;

    const newName = name + "-updated";
    setNextCacheId("updateCategory-updateCategory");
    const updateResult = await discourse.updateCategory({ id, name: newName });
    expect(updateResult.category.name).toBe(newName);
  });

  test("listCategoryTopics", async () => {
    const categories = await discourse.listCategories();

    const result = await discourse.listCategoryTopics({
      id: categories.category_list.categories[0].id,
      slug: categories.category_list.categories[0].slug,
    });

    expect(Array.isArray(result.topic_list.topics)).toBe(true);
  });

  test("getCategory", async () => {
    const categories = await discourse.listCategories();

    const result = await discourse.getCategory({
      id: categories.category_list.categories[0].id,
    });

    expect(result).toHaveProperty("category");
  });

  test("getSite", async () => {
    const result = await discourse.getSite();
    expect(result).toHaveProperty("default_archetype");
  });
});
