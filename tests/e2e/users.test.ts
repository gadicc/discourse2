import { describe, discourse, expect, test } from "./_common.ts";

describe("users", () => {
  test("listUserBadges", async () => {
    const result = await discourse.listUserBadges({ username: "system" });
    expect(result).toHaveProperty("badges");
  });

  test("createUser", async () => {
    const result = await discourse.createUser({
      name: "Test user",
      email: "test@example.com",
      password: "teSt1ngIsFuN",
      username: "test-user",
      active: true,
    });

    expect(result).toMatchObject({
      success: true,
      active: true,
      // message: expect.stringMatching(/^Your account is activated/),
    });
  });

  test("getUser", async () => {
    const result = await discourse.getUser({ username: "test-user" });
    expect(result).toHaveProperty("user");
  });

  test("updateUser", async () => {
    const createUserResult = await discourse.createUser({
      name: "Test user to update",
      email: "test-update@example.com",
      password: "teSt1ngIsFuN",
      username: "test-user-update",
      active: true,
    });
    expect(createUserResult).toMatchObject({ success: true });

    const result = await discourse.updateUser({
      username: "test-user-update",
      name: "Updated test user",
    });
    expect(result).toMatchObject({
      success: "OK",
      user: {
        name: "Updated test user",
      },
    });
  });

  test("getUserExternalId", async () => {
    /*
    const updateResult = await discourse.updateUser({
      username: "test-user-update",
      external_ids: { test: "123" },
    });
    expect(updateResult).toMatchObject({ success: "OK" });

    const result = await discourse.getUserExternalId({
      external_id: "123",
    });
    */
    await expect(discourse.getUserExternalId({
      external_id: "123",
    })).rejects.toThrow(/could not be found/);
  });

  test("getUserIdentiyProviderExternalId", async () => {
    await expect(discourse.getUserIdentiyProviderExternalId({
      provider: "test",
      external_id: "123",
    })).rejects.toThrow(/could not be found/);
  });

  /* TODO after uploads suite
  test("updateAvatar", async () => {
    const updateResult = await discourse.updateAvatar({
      username: "test-user-update",
      upload_id: 0,
      type: "uploaded",
    });
  });
  */

  test("updateEmail", async () => {
    // If it doesn't throw, it works (200)
    await discourse.updateEmail({
      username: "test-user-update",
      email: "test-update-new@example.com",
    });
  });

  test("updateUsername", async () => {
    // If it doesn't throw, it works (200)
    await discourse.updateUsername({
      username: "test-user-update",
      new_username: "test-user-update-new",
    });
  });

  test("listUsersPublic", async () => {
    const result = await discourse.listUsersPublic({
      period: "all",
      order: "likes_received",
    });
    expect(result).toHaveProperty("directory_items");
  });

  test("adminGetUser", async () => {
    const id = 1;
    const user = await discourse.adminGetUser({ id });
    expect(user.id).toBe(id);
  });

  test("deleteUser", async () => {
    const user = await discourse.createUser({
      name: "Test user to delete",
      email: "delete-me@example.com",
      password: "aFunPassw0rd",
      username: "test-user-to-delete",
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.deleteUser({ id });
    expect(result.deleted).toBe(true);
  });

  // test("activateUser", async () => {});

  // test("deactivateUser", async () => {});

  // test("suspendUser", async () => {});

  // test("silenceUser", async () => {});

  // test("anonymizeUser", async () => {});

  // test("logOutUser", async () => {});

  // test("refreshGravatar", async () => {});

  // test("adminListUsers", async () => {});

  // test("listUserActions", async () => {});

  // test("sendPasswordResetEmail", async () => {});

  // test("changePassword", async () => {});

  // test("getUserEmails", async () => {});
});
