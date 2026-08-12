export default {
  extends: ["stylelint-config-standard"],

  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html",
    },
  ],

  rules: {
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$",
      {
        message: "Expected class selector to follow BEM naming",
      },
    ],

    "value-keyword-case": [
      "lower",
      {
        ignoreKeywords: ["currentColor"],
      },
    ],

    "custom-property-empty-line-before": null,
  },
};
