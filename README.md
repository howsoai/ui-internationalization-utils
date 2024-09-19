# UI Internationalization Utils

A set of functions and types to support our translation efforts.

## Usage

To use this package in your application install it via npm.

### Installation

Standard package installation makes imports available:

```bash
npm i @howso/ui-internationalization-utils
```

### Creating Bundles

**All bundles should be created in `.i18n` files collocated with your code. They are often separately than component code itself**

Every component that includes unique translations should produce an `I18nBundle` by
creating a object of initial translations:

```ts
const en = {
  title: "",
  content: {
    1: { a: "", b: "" },
    2: { c: "", d: "" },
  },
};
```

That object can then be used to define a type all other languages should match:

```ts
type Resource = typeof en;
const fr: Resource = {};
const es: Resource = {};
```

You can create the `I18nBundle`'s `strings` property for use in `t()` using a utility function:

```ts
import { getStringsForI18nBundleFromResource } from "@howso/ui-internationalization-utils";
const strings = getStringsForI18nBundleFromResource<Resource>(en);
```

Your translation function strings can then access your strongly typed bundle in this fashion:

```tsx
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import bundle from "./Component.i18n.ts";

const Component: FC = () => {
    const { t } = useTranslation(bundle.namespace);
    return (<p>{t(bundle.strings.content.1.a)}</p>)
}
```

Creating a full bundle with multiple languages:

```ts
import { I18nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

export const componentBundle: I18nBundle<Languages, Resource> = {
  namespace,
  resources: { en, fr, es },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
```

### Installing bundles

You may use standard index bundling techniques to export bundling:

```ts
export * from "./ComponentA.i18n";
export * from "./ComponentB.i18n";
```

The final set of bundles can be installed into your `i18n` service:

```ts
import i18n from "i18next";
import * as ComponentsI18nBundles from "./components/i18n";
import * as PagesI18nBundles from "./pages/i18n";

i18n
  // ...
  .init({
    resources: addI18nBundlesToResources(resources, [
      ...Object.values(ComponentsI18nBundles),
      ...Object.values(PagesI18nBundles),
    ]),
    // ...
  });
```

## Publishing

Documentation changes do not require a version publishing.
For functional changes, follow [SemVer](https://semver.org/)
standards updating the `package.json` and `package-lock.json`
files in your pull request.

When you are ready to publish a new version, use the Github Release action.
