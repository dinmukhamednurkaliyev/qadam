import eslintConfigPrettier from "eslint-config-prettier";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt()
  .append(eslintConfigPrettier)
  .append({
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": "error",
      "vue/no-unused-vars": "error",

      "no-console": "warn",
      "no-debugger": "error",
    },
  });
