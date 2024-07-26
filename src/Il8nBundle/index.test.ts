import { getStringsForIl8nBundleFromResource } from ".";

describe("Il8nBundle", () => {
  describe("getStringsForIl8nBundleFromResource", () => {
    it("should return strings in nested shape matching the resource", () => {
      const en = {
        title: "",
        content: {
          1: { a: "", b: "" },
          2: { c: "", d: "" },
        },
      };
      type Resource = typeof en;

      const strings = getStringsForIl8nBundleFromResource<Resource>(en);

      expect(strings).toStrictEqual({
        title: "title",
        content: {
          1: {
            a: "content.1.a",
            b: "content.1.b",
          },
          2: {
            c: "content.2.c",
            d: "content.2.d",
          },
        },
      });
    });
  });
});
