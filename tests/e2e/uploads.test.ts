import { describe, discourse, expect, fetchCache, test } from "./_common.ts";

describe("uploads", () => {
  test("createUpload", async () => {
    // Path is from "deno test" cwd.
    const bytes = await Deno.readFile("./tests/assets/smiley.jpg");
    const file = new File([bytes], "smiley.jpg", { type: "image/jpeg" });
    // Manually specify id since formData generates random boundaries
    fetchCache._once({ id: "createUpload-smiley" });
    const result = await discourse.createUpload({
      type: "avatar",
      file,
    });
    expect(result).toHaveProperty("id");
  });

  // test("generatePresignedPut", async () => {});

  // test("completeExternalUpload", async () => {});

  // test("createMultipartUpload", async () => {});

  // test("batchPresignMultipartParts", async () => {});

  // test("abortMultipart", async () => {});

  // test("completeMultipart", async () => {});
});
