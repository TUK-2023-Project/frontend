// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "standard-with-typescript",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    quotes: ["off", "single"],
  },
  ignorePatterns: [".eslintrc.js"],
  env: {
    browser: true,
  },
};
