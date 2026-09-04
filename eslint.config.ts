import { fileURLToPath } from 'node:url'

import eslint from '@eslint/js'
import pluginVitest from '@vitest/eslint-plugin'
import { vueTsConfigs, withVueTs } from '@vue/eslint-config-typescript'
import prettier from 'eslint-config-prettier/flat'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const serverPath = 'apps/server'
const webPath = 'apps/web'

const webRoot = fileURLToPath(new URL(`./${webPath}/`, import.meta.url))
const webOxlintPath = fileURLToPath(new URL(`./${webPath}/.oxlintrc.json`, import.meta.url))

const serverConfig = defineConfig(
  {
    name: 'server/typescript',
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
  },
  {
    name: 'server/source',
    files: ['source/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
)

const webConfig = await withVueTs(
  {
    rootDir: webRoot,
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    ...pluginVitest.configs.recommended,
    name: 'web/vitest',
    files: ['source/**/*.{spec,test}.ts'],
  },
  pluginOxlint.buildFromOxlintConfigFile(webOxlintPath),
)

export default [
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...serverConfig.map((config) => ({
    ...config,
    basePath: serverPath,
  })),

  ...webConfig.map((config) => ({
    ...config,
    basePath: webPath,
  })),

  prettier,
]
