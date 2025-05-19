import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactNative from "eslint-plugin-react-native";
import pluginPrettier from "eslint-plugin-prettier";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      js,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-native": pluginReactNative,
      prettier: pluginPrettier,
    },
    extends: [
      "js/recommended",
      pluginReact.configs.flat.recommended,
      pluginReactNative.configs.recommended,
      "plugin:prettier/recommended",
    ],
    rules: {
      // permite escrever jsx em arquivos .js
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      // permite usar funções antes da declaração, mas não variáveis
      "no-use-before-define": ["error", { variables: false }],
      // ajustar para não passar erros com react-navigation
      "react/prop-types": [
        "error",
        { ignore: ["navigation", "navigation.navigate"] },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
