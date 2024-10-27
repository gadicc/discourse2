import { describe, discourse, expect, fetchCache, test } from "./_common.ts";

let file: File | undefined;
async function getTestFile() {
  if (!file) {
    // Path is where `deno test` is run from, not where the test file is
    const bytes = await Deno.readFile("./tests/assets/smiley.jpg");
    file = new File([bytes], "smiley.jpg", { type: "image/jpeg" });
  }
  return file;
}

describe("uploads", () => {
  test("createUpload", async () => {
    const file = await getTestFile();
    // Manually specify id since formData generates random boundaries
    fetchCache._once({ id: "createUpload-smiley" });
    const result = await discourse.createUpload({
      type: "avatar",
      file,
    });
    expect(result).toHaveProperty("id");
  });

  test("external uploads -- SKIPPED for now", () => {});

  /*
  // Requested URL or resource could not be find.  Try as a user?
  test("generatePresignedPut", async () => {
    const file = await getTestFile();
    const result = await discourse.generatePresignedPut({
      type: "avatar",
      file_name: file.name,
      file_size: file.size,
    });
    expect(result).toHaveProperty("url");
  });
  */

  // test("completeExternalUpload", async () => {});

  // test("createMultipartUpload", async () => {});

  // test("batchPresignMultipartParts", async () => {});

  // test("abortMultipart", async () => {});

  // test("completeMultipart", async () => {});
});
