# UI Internationalization Utils

A set of functions and types to support our translation efforts.

## Usage

To use this package in your application install it via npm.

### Prerequisites

Your home directory must contain a `.npmrc` file pointing to the Azure DevOps artifact feed:

```text
@howso:registry = https://dpbuild.jfrog.io/artifactory/api/npm/npm-virtual/
//dpbuild.jfrog.io/artifactory/api/npm/npm-virtual/:_auth=...
```

### Installation

Standard package installation makes imports available:

```bash
npm i --save-dev @howso/ui-internationalization-utils
```

### Creating Bundles

**All bundles should be created in `.il8n` files collocated with your code. They are often separately than component code itself**

Every component that includes unique translations should produce an `Il8nBundle` by
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

You can create the `Il8nBundle`'s `strings` property for use in `t()` using a utility function:

```ts
import { getStringsForIl8nBundleFromResource } from "@howso/ui-internationalization-utils";
const strings = getStringsForIl8nBundleFromResource<Resource>(en);
```

Your translation function strings can then access your strongly typed bundle in this fashion:

```tsx
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import bundle from "./Component.il8n.ts";

const Component: FC = () => {
    const { t } = useTranslation(bundle.namespace);
    return (<p>{t(bundle.strings.content.1.a)}</p>)
}
```

Creating a full bundle with multiple languages:

```ts
import { Il8nBundle } from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

export const componentBundle: Il8nBundle<Resource, Languages> = {
  namespace,
  resources: { en, fr, es },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
```

### Installing bundles

TODO...

## Publishing

This package is published into a private npm registry.

Documentation changes do not require a version publishing.
For functional changes, follow [SemVer](https://semver.org/)
standards updating the `package.json` and `package-lock.json`
files in your pull request.

When you are ready to publish a new version, use the Github Release action.
