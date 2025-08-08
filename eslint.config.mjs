// eslint.config.js
// Nota: Para que ESLint entienda JSX en archivos .js debes usar @babel/eslint-parser

import js from "@eslint/js";
import parser from "@babel/eslint-parser";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuración base para JavaScript
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ignores: ["node_modules/**", "dist/**", "build/**", "backend/.venv/**"],
    languageOptions: {
      globals: globals.browser,
      parser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ["@babel/preset-react"] },
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "prefer-const": "warn",
      "arrow-body-style": ["warn", "as-needed"],
    },
  },
  // Configuración recomendada para React
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{jsx,tsx}"],
    ignores: ["node_modules/**", "dist/**", "build/**"],
    languageOptions: {
      parser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ["@babel/preset-react"] },
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: "detect" } },
  },
]);
