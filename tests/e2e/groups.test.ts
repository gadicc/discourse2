import { describe, discourse, expect, test } from "./_common.ts";

describe("groups", () => {
  test("createGroup", async () => {
    const result = await discourse.createGroup({
      group: {
        name: "test-group",
      },
    });
    expect(result).toHaveProperty("basic_group");
  });

  test("deleteGroup", async () => {
    const createGroupResult = await discourse.createGroup({
      group: {
        name: "test-delete-group",
      },
    });
    const id = createGroupResult.basic_group.id;

    const result = await discourse.deleteGroup({ id });
    expect(result).toEqual({ success: "OK" });
  });

  test("updateGroup", async () => {
    const createGroupResult = await discourse.createGroup({
      group: {
        name: "test-update-group",
      },
    });
    const id = createGroupResult.basic_group.id;

    const updateGroupResult = await discourse.updateGroup({
      id,
      group: {
        name: "test-update-group2",
      },
    });
    expect(updateGroupResult).toEqual({ success: "OK" });
  });

  test("getGroup", async () => {
    const createGroupResult = await discourse.createGroup({
      group: {
        name: "test-get-group",
      },
    });
    const name = createGroupResult.basic_group.name;

    // This is according to spec, "id" param is the string group name.
    const result = await discourse.getGroup({ id: name });
    expect(result.group.name).toBe(name);
  });

  test("listGroupMembers", async () => {
    // This is according to spec, "id" param is the string group name.
    const result = await discourse.listGroupMembers({ id: "admins" });
    expect(Array.isArray(result.members)).toBe(true);
  });

  test("addGroupMembers", async () => {
    const createGroupResult = await discourse.createGroup({
      group: {
        name: "test-add-members",
      },
    });
    const id = createGroupResult.basic_group.id;

    const result = await discourse.addGroupMembers({
      id,
      usernames: "system",
    });
    expect(result).toEqual({
      emails: [],
      success: "OK",
      usernames: ["system"],
    });
  });

  test("removeGroupMembers", async () => {
    const createGroupResult = await discourse.createGroup({
      group: {
        name: "test-remove-members",
      },
    });
    const id = createGroupResult.basic_group.id;

    await discourse.addGroupMembers({
      id,
      usernames: "system",
    });

    const result = await discourse.removeGroupMembers({
      id,
      usernames: "system",
    });
    expect(result).toEqual({
      skipped_usernames: [],
      success: "OK",
      usernames: ["system"],
    });
  });

  test("listGroups", async () => {
    const result = await discourse.listGroups();
    expect(Array.isArray(result.groups)).toBe(true);
  });
});
