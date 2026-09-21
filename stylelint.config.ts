import type { Config } from 'stylelint'

export default {
  extends: ['stylelint-config-standard'],

  overrides: [
    {
      files: ['**/*.vue'],
      // Extract style blocks from Vue files so the CSS linter can parse them.
      customSyntax: 'postcss-html',
    },
  ],

  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/dist-ssr/**'],
} satisfies Config
