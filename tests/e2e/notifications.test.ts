import { describe, discourse, expect, test } from "./_common.ts";

describe("notifications", () => {
  test("getNotifications", async () => {
    const result = await discourse.getNotifications();
    expect(result).toHaveProperty("notifications");
  });

  test("markNotificationsAsRead", async () => {
    const result = await discourse.markNotificationsAsRead({ id: 2 });
    expect(result).toMatchObject({ success: "OK" });
  });
});
