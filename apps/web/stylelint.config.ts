import type { Config } from 'stylelint'

export default {
  extends: ['stylelint-config-standard'],

  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],

  ignoreFiles: ['dist/**', 'coverage/**'],
} satisfies Config
