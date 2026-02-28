import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { globalIgnores } from 'eslint/config';
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  globalIgnores(['dist']),
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  }
);
