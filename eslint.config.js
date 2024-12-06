import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { files: ["**/*.{mjs,ts,tsx}"] },
  {
    rules: {
      "react/prop-types": "off", // Disable prop-types for TypeScript
      "react/display-name": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];
