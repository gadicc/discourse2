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
      username: "test-update-user",
      active: true,
    });
    expect(createUserResult).toMatchObject({ success: true });

    const result = await discourse.updateUser({
      username: "test-update-user",
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
      username: "test-update-user",
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
      username: "test-update-user",
      upload_id: 0,
      type: "uploaded",
    });
  });
  */

  test("updateEmail", async () => {
    // If it doesn't throw, it works (200)
    await discourse.updateEmail({
      username: "test-update-user",
      email: "test-update-new@example.com",
    });
  });

  test("updateUsername", async () => {
    // If it doesn't throw, it works (200)
    await discourse.updateUsername({
      username: "test-update-user",
      new_username: "test-update-new",
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
      username: "test-delete-user",
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.deleteUser({ id });
    expect(result.deleted).toBe(true);
  });

  test("activateUser", async () => {
    const user = await discourse.createUser({
      name: "Test user to activate",
      email: "activate-me@example.com",
      password: "aFunPassw0rd",
      username: "test-activate-user",
      active: false,
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.activateUser({ id });
    expect(result.success).toBe("OK");
  });

  test("deactivateUser", async () => {
    const user = await discourse.createUser({
      name: "Test user to deactivate",
      email: "deactivate-me@example.com",
      password: "aFunPassw0rd",
      username: "test-deactivate",
      active: true,
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.deactivateUser({ id });
    expect(result.success).toBe("OK");
  });

  test("suspendUser", async () => {
    const user = await discourse.createUser({
      name: "Test user to suspend",
      email: "suspend-me@example.com",
      password: "aFunPassw0rd",
      username: "test-suspend-user",
      active: true,
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.suspendUser({
      id,
      suspend_until: "2121-02-22",
      reason: "Test suspension",
    });
    expect(result.suspension).toHaveProperty(
      "suspend_reason",
      "Test suspension",
    );
  });

  test("silenceUser", async () => {
    const user = await discourse.createUser({
      name: "Test user to silence",
      email: "silence-me@example.com",
      password: "aFunPassw0rd",
      username: "test-silence-user",
      active: true,
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.silenceUser({
      id,
      silenced_till: "2121-02-22T08:00:00.000Z",
      reason: "Test silence",
    });
    expect(result.silence).toHaveProperty("silence_reason", "Test silence");
  });

  test("anonymizeUser", async () => {
    const user = await discourse.createUser({
      name: "Test user to anonymize",
      email: "anonymize-me@example.com",
      password: "aFunPassw0rd",
      username: "test-anon-user",
      active: true,
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.anonymizeUser({ id });
    expect(result.success).toBe("OK");
    expect(result).toHaveProperty("username");
  });

  test("logOutUser", async () => {
    const user = await discourse.createUser({
      name: "Test user to logout",
      email: "logout-me@example.com",
      password: "aFunPassw0rd",
      username: "test-logout-user",
      active: true,
    });
    const id = user.user_id;
    if (!id) throw new Error("User ID not found");

    const result = await discourse.logOutUser({ id });
    expect(result.success).toBe("OK");
  });

  test("refreshGravatar", async () => {
    const result = await discourse.refreshGravatar({
      username: "test-user",
    });
    expect(result).toHaveProperty("gravatar_upload_id");
    expect(result).toHaveProperty("gravatar_avatar_template");
  });

  test("adminListUsers", async () => {
    const result = await discourse.adminListUsers({
      flag: "active",
      order: "created",
      asc: "true",
      show_emails: true,
    });
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("username");
      expect(result[0]).toHaveProperty("email");
    }
  });

  test("listUserActions", async () => {
    const result = await discourse.listUserActions({
      username: "test-user",
      offset: 0,
      filter: "1",
    });
    expect(result).toHaveProperty("user_actions");
  });

  test("sendPasswordResetEmail", async () => {
    const result = await discourse.sendPasswordResetEmail({
      login: "test-user",
    });
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("user_found");
  });

  test("changePassword", async () => {
    await discourse.changePassword({
      token: "test-token",
      username: "test-user",
      password: "newPassword123",
    });
  });

  test("getUserEmails", async () => {
    const result = await discourse.getUserEmails({
      username: "test-user",
    });
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("secondary_emails");
    expect(result).toHaveProperty("unconfirmed_emails");
    expect(result).toHaveProperty("associated_accounts");
  });
});
