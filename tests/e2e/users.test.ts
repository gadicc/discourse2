import { afterAll, beforeAll } from "@std/testing/bdd";
import {
  describe,
  discourse,
  expect,
  setNextCacheId,
  skipCacheOnce,
  test,
  useCache,
} from "./_common.ts";

describe("users", () => {
  useCache();

  async function cleanup() {
    if (Deno.env.get("CI")) return;
    skipCacheOnce();
    const users = await discourse.adminListUsers({ flag: "active" });
    for (const user of users) {
      if (
        user.username.startsWith("test") || user.username.startsWith("Test")
      ) {
        console.log("Cleaning up user:", user.username, user.id);
        skipCacheOnce();
        await discourse.deleteUser({ id: user.id, delete_posts: true });
      }
    }
  }
  beforeAll(cleanup);
  afterAll(cleanup);

  test("listUserBadges", async () => {
    const result = await discourse.listUserBadges({ username: "system" });
    expect(result).toHaveProperty("user_badges");
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

    const user = await discourse.getUser({ username: "test-user" });
    await discourse.deleteUser({ id: user.user.id });
  });

  test("getUser", async () => {
    await discourse.createUser({
      name: "Test user",
      email: "test@example.com",
      password: "teSt1ngIsFuN",
      username: "test-user",
      active: true,
    });

    const result = await discourse.getUser({ username: "test-user" });
    expect(result).toHaveProperty("user");
    await discourse.deleteUser({ id: result.user.id });
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

    const user = await discourse.getUser({ username: "test-update-user" });
    await discourse.deleteUser({ id: user.user.id });
  });

  test("updateUser with custom fields", async () => {
    setNextCacheId("updateUserCustom-1-createUser");
    const createUserResult = await discourse.createUser({
      name: "Test user to update",
      email: "test-update@example.com",
      password: "teSt1ngIsFuN",
      username: "test-update-custom",
      active: true,
    });
    expect(createUserResult).toMatchObject({ success: true });

    setNextCacheId("updateUserCustom-2-updateUser");
    const result = await discourse.updateUser({
      username: "test-update-custom",
      // @ts-expect-error: not in spec
      title: "a new title",
    }, { validateParams: false });
    expect(result).toMatchObject({
      success: "OK",
      user: {
        title: "a new title",
      },
    });

    setNextCacheId("updateUserCustom-3-getUser");
    const user = await discourse.getUser({ username: "test-update-custom" });
    setNextCacheId("updateUserCustom-4-deleteUser");
    await discourse.deleteUser({ id: user.user.id });
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
    await discourse.createUser({
      name: "Test user to update email",
      email: "test-update@example.com",
      password: "teSt1ngIsFuN",
      username: "test-updateEmail",
      active: true,
    });

    // If it doesn't throw, it works (200)
    await discourse.updateEmail({
      username: "test-updateEmail",
      email: "test-update-new@example.com",
    });

    const user = await discourse.getUser({ username: "test-updateEmail" });
    await discourse.deleteUser({ id: user.user.id });
  });

  test("updateUsername", async () => {
    await discourse.createUser({
      name: "Test user to update username",
      email: "test-update@example.com",
      password: "teSt1ngIsFuN",
      username: "test-updateUsername",
      active: true,
    });

    // If it doesn't throw, it works (200)
    await discourse.updateUsername({
      username: "test-updateUsername",
      new_username: "test-updateUsernam2", // 20 char limit
    });

    const user = await discourse.getUser({
      username: "test-updateUsernam2",
    });
    await discourse.deleteUser({ id: user.user.id });
  });

  test("listUsersPublic", async () => {
    const result = await discourse.listUsersPublic({
      period: "all",
      order: "likes_received",
    });
    expect(result).toHaveProperty("directory_items");
  });

  test("adminGetUser", async () => {
    await discourse.createUser({
      name: "Test user to get by id",
      email: "test-get-by-id@example.com",
      password: "teSt1ngIsFuN",
      username: "test-adminGetUser",
      active: true,
    });

    const getUser = await discourse.getUser({ username: "test-adminGetUser" });

    const adminGetUser = await discourse.adminGetUser({ id: getUser.user.id });
    expect(adminGetUser.id).toBe(getUser.user.id);

    await discourse.deleteUser({ id: getUser.user.id });
  });

  test("deleteUser", async () => {
    await discourse.createUser({
      name: "Test user to delete",
      email: "delete-me@example.com",
      password: "aFunPassw0rd",
      username: "test-delete-user",
    });

    const user = await discourse.getUser({ username: "test-delete-user" });
    const result = await discourse.deleteUser({ id: user.user.id });
    expect(result.deleted).toBe(true);
  });

  test("activateUser", async () => {
    await discourse.createUser({
      name: "Test user to activate",
      email: "activate-me@example.com",
      password: "aFunPassw0rd",
      username: "test-activate-user",
      active: false,
    });
    const user = await discourse.getUser({ username: "test-activate-user" });

    const result = await discourse.activateUser({ id: user.user.id });
    expect(result.success).toBe("OK");
    await discourse.deleteUser({ id: user.user.id });
  });

  test("deactivateUser", async () => {
    await discourse.createUser({
      name: "Test user to deactivate",
      email: "deactivate-me@example.com",
      password: "aFunPassw0rd",
      username: "test-deactivate",
      active: true,
    });
    const user = await discourse.getUser({ username: "test-deactivate" });
    const result = await discourse.deactivateUser({ id: user.user.id });
    expect(result.success).toBe("OK");
    await discourse.deleteUser({ id: user.user.id });
  });

  test("suspendUser", async () => {
    await discourse.createUser({
      name: "Test user to suspend",
      email: "suspend-me@example.com",
      password: "aFunPassw0rd",
      username: "test-suspend-user",
      active: true,
    });
    const user = await discourse.getUser({ username: "test-suspend-user" });

    const result = await discourse.suspendUser({
      id: user.user.id,
      suspend_until: "2121-02-22",
      reason: "Test suspension",
    });
    expect(result.suspension).toHaveProperty(
      "suspend_reason",
      "Test suspension",
    );

    await discourse.deleteUser({ id: user.user.id });
  });

  test("silenceUser", async () => {
    await discourse.createUser({
      name: "Test user to silence",
      email: "silence-me@example.com",
      password: "aFunPassw0rd",
      username: "test-silence-user",
      active: true,
    });
    const user = await discourse.getUser({ username: "test-silence-user" });

    const result = await discourse.silenceUser({
      id: user.user.id,
      silenced_till: "2121-02-22T08:00:00.000Z",
      reason: "Test silence",
    });
    expect(result.silence).toHaveProperty("silence_reason", "Test silence");

    await discourse.deleteUser({ id: user.user.id });
  });

  test("anonymizeUser", async () => {
    await discourse.createUser({
      name: "Test user to anonymize",
      email: "anonymize-me@example.com",
      password: "aFunPassw0rd",
      username: "test-anon-user",
      active: true,
    });
    const user = await discourse.getUser({ username: "test-anon-user" });

    const result = await discourse.anonymizeUser({ id: user.user.id });
    expect(result.success).toBe("OK");
    expect(result).toHaveProperty("username");
    await discourse.deleteUser({ id: user.user.id });
  });

  test("logOutUser", async () => {
    await discourse.createUser({
      name: "Test user to logout",
      email: "logout-me@example.com",
      password: "aFunPassw0rd",
      username: "test-logout-user",
      active: true,
    });
    const user = await discourse.getUser({ username: "test-logout-user" });

    const result = await discourse.logOutUser({ id: user.user.id });
    expect(result.success).toBe("OK");
    await discourse.deleteUser({ id: user.user.id });
  });

  test("refreshGravatar", async () => {
    await discourse.createUser({
      name: "Test user for gravatar",
      email: "gravatar-me@example.com",
      password: "aFunPassw0rd",
      username: "test-gravatar-user",
      active: true,
    });
    const result = await discourse.refreshGravatar({
      username: "test-gravatar-user",
    });
    expect(result).toHaveProperty("gravatar_upload_id");
    expect(result).toHaveProperty("gravatar_avatar_template");

    const user = await discourse.getUser({ username: "test-gravatar-user" });
    await discourse.deleteUser({ id: user.user.id });
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
    await discourse.createUser({
      name: "Test user for actions",
      email: "actions-me@example.com",
      password: "aFunPassw0rd",
      username: "test-user-actions",
      active: true,
    });

    const result = await discourse.listUserActions({
      username: "test-user-actions",
      offset: 0,
      filter: "1",
    });
    expect(result).toHaveProperty("user_actions");

    const user = await discourse.getUser({ username: "test-user-actions" });
    await discourse.deleteUser({ id: user.user.id });
  });

  test("sendPasswordResetEmail ~+ changePassword~", async () => {
    await discourse.createUser({
      name: "Test user for password reset",
      email: "reset-me@example.com",
      password: "aFunPassw0rd",
      username: "test-reset-pass",
      active: true,
    });

    const result = await discourse.sendPasswordResetEmail({
      login: "test-reset-pass",
    });
    expect(result).toHaveProperty("success");

    /*
    // Would need to retrieve token from the database
    await discourse.changePassword({
      token: "TODO",
      username: "test-reset-pass",
      password: "newPassword123",
    });
    */

    const user = await discourse.getUser({
      username: "test-reset-pass",
    });
    await discourse.deleteUser({ id: user.user.id });
  });

  test("getUserEmails", async () => {
    await discourse.createUser({
      name: "Test user for emails",
      email: "emails-me@example.com",
      password: "aFunPassw0rd",
      username: "test-user-get-emails",
      active: true,
    });

    const result = await discourse.getUserEmails({
      username: "test-user-get-emails",
    });
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("secondary_emails");
    expect(result).toHaveProperty("unconfirmed_emails");
    expect(result).toHaveProperty("associated_accounts");

    const user = await discourse.getUser({ username: "test-user-get-emails" });
    await discourse.deleteUser({ id: user.user.id });
  });
});
