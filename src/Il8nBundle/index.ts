export type Il8nBundle<T, Languages extends string> = {
  /** The namespace to be loaded into. */
  namespace: string;
  /** A collection of language codes and resources under them. */
  resources: Record<Languages, T>;
  strings: T;
};

type ResourceObject = {
  [key: string]: string | ResourceObject;
};
/**
 * Returns strings for accessing translations dynamically based on a given language resource
 */
export const getStringsForIl8nBundleFromResource = <T extends ResourceObject>(
  resource: T
): T => {
  const buildStrings = (
    strings: ResourceObject,
    object: ResourceObject,
    path: string[] = []
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
