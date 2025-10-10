import { describe, discourse, expect, test, useCache } from "./_common.ts";

describe("notifications", () => {
  useCache();

  test("getNotifications", async () => {
    const result = await discourse.getNotifications();
    expect(result).toHaveProperty("notifications");
  });

  test("markNotificationsAsRead", async () => {
    const result = await discourse.markNotificationsAsRead({ id: 2 });
    expect(result).toMatchObject({ success: "OK" });
  });
});
