// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";
// import stylisticJs from "@stylistic/eslint-plugin-js";

// export default defineConfig([
//   js.configs.recommended, // recommended options before our owns

//   {
//     files: ["**/*.{js,mjs,cjs}"],
//     plugins: { js },
//     extends: ["js/recommended"],
//   },
//   {
//     files: ["**/*.js"],
//     languageOptions: {
//       sourceType: "commonjs",
//       globals: { ...globals.node },
//       ecmaVersion: "latest",
//     },
//     plugins: {
//       "@stylistic/js": stylisticJs,
//     },
//     // rules: {
//     //   "@stylistic/js/indent": ["error", 2],
//     //   "@stylistic/js/linebreak-style": ["error", "unix"],
//     //   "@stylistic/js/quotes": ["error", "double"],
//     //   "@stylistic/js/semi": ["error", "never"],
//     //   eqeqeq: "error",
//     //   "no-trailing-spaces": "error",
//     //   "object-curly-spacing": ["error", "always"],
//     //   "arrow-spacing": ["error", { before: true, after: true }],
//     //   "no-console": "off",
//     // },
//   },
//   {
//     files: ["**/*.{js,mjs,cjs}"],
//     languageOptions: { globals: globals.browser },
//   },
//   { ignores: ["dist/**"] },
// ]);
