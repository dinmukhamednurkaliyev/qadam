import type { Config } from 'stylelint'

export default {
  extends: ['stylelint-config-standard'],

  overrides: [
    {
      files: ['source/**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],

  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/dist-ssr/**'],
} satisfies Config
