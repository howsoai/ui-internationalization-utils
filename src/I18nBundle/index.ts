import type { Resource, ResourceLanguage } from "i18next";

export type I18nBundle<
  Languages extends string,
  Resource extends ResourceLanguage,
> = {
  /** The namespace to be loaded into. */
  namespace: string;
  /** A collection of language codes and resources under them. */
  resources: Record<Languages, Resource>;
  strings: Resource;
};

type ResourceObject = {
  [key: string]: string | ResourceObject;
};
/**
 * Returns strings for accessing translations dynamically based on a given language resource
 */
export const getStringsForI18nBundleFromResource = <T extends ResourceObject>(
  resource: T,
): T => {
  const buildStrings = (
    strings: ResourceObject,
    object: ResourceObject,
    path: string[] = [],
  ): ResourceObject => {
    Object.entries(object).forEach(([key, value]) => {
      const localPath = [...path, key];

      if (typeof value === "object") {
        strings[key] = {};
        buildStrings(strings[key], value, localPath);
        return;
      }
      strings[key] = localPath.join(".");
    });
    return strings;
  };

  return buildStrings({} as T, resource) as T;
};

/**
 * Takes an existing i18next resource object and adds bundles.
 * An error will be thrown if a namespace collisions occur.
 */
export const addI18nBundlesToResources = (
  resources: Resource,
  bundles: I18nBundle<any, ResourceLanguage>[],
): Resource => {
  const newResources = { ...resources };

  const collisions: string[] = [];
  bundles.forEach((bundle) => {
    Object.entries(bundle.resources).forEach(([locale, translations]) => {
      newResources[locale] ||= {};
      if (newResources[locale][bundle.namespace]) {
        collisions.push(bundle.namespace);
        return;
      }

      newResources[locale][bundle.namespace] = translations;
    });
  });

  if (collisions.length > 0) {
    throw new Error(
      `Il8nBundles include conflicting namespace(s): ${collisions.join(", ")}`,
    );
  }

  return newResources;
};
