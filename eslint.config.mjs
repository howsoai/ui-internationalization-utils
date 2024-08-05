// @ts-check

import eslint from "@eslint/js";
import tsEsLint from "typescript-eslint";

export default tsEsLint.config(
  eslint.configs.recommended,
  ...tsEsLint.configs.strict,
  ...tsEsLint.configs.stylistic,
  {
    rules: {
      complexity: ["error", { max: 15 }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  }
);
