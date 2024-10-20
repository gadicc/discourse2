import { describe, discourse, expect, test } from "./common.ts";

describe("categories", () => {
  test("createCategory", async () => {
    const result = await discourse.createCategory({
      name: "test-category",
    });
    expect(result).toHaveProperty("category");
  });

  test("listCategories", async () => {
    const result = await discourse.listCategories();
    expect(Array.isArray(result.category_list.categories)).toBe(true);
  });

  test("updateCategory", async () => {
    const result = await discourse.createCategory({
      name: "test-update-category",
    });
    const id = result.category.id;

    const updateResult = await discourse.updateCategory({
      id,
      name: "test-update-category-updated",
    });
    expect(updateResult.category.name).toBe("test-update-category-updated");
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
