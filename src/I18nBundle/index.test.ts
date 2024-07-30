import type { Resource } from "i18next";
import {
  addI18nBundlesToResources,
  getStringsForI18nBundleFromResource,
  I18nBundle,
} from ".";

describe("I18nBundle", () => {
  describe("getStringsForI18nBundleFromResource", () => {
    it("should return strings in nested shape matching the resource", () => {
      const en = {
        title: "",
        content: {
          1: { a: "", b: "" },
          2: { c: "", d: "" },
        },
      };
      type Resource = typeof en;

      const strings = getStringsForI18nBundleFromResource<Resource>(en);

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

  describe("addI18nBundlesToResources", () => {
    type Languages = "en" | "es";
    const languages: Languages[] = ["en", "es"];

    const namespace = "test";
    const en = {
      title: "Lorem",
      content: "Ipsum",
    };
    type ComponentResource = typeof en;
    const es: ComponentResource = { ...en };

    const bundle: I18nBundle<Languages, ComponentResource> = {
      namespace,
      resources: { en, es },
      strings: getStringsForI18nBundleFromResource<ComponentResource>(en),
    };

    it("should return a resources object with our new bundles added for all supported languages", () => {
      const resources: Resource = {};
      const newResources = addI18nBundlesToResources(resources, [bundle]);
      console.info(newResources);
      languages.forEach((language) => {
        expect(newResources[language][namespace]).toStrictEqual(en);
      });
    });

    it("should throw an error if a namespace is in conflict", () => {
      const resources: Resource = {
        [languages[0]]: {
          [namespace]: {
            flightTime: "1 hour",
          },
        },
      };

      const add = () => {
        addI18nBundlesToResources(resources, [bundle]);
      };
      expect(add).toThrow(new RegExp(namespace));
    });
  });
});
