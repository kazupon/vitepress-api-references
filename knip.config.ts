import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['src/index.ts'],
  ignore: ['tests/**/*.test.ts', 'tests/fixtures/**', 'docs/.vitepress/config.ts'],
  ignoreDependencies: ['@kazupon/eslint-plugin', '@typescript/native-preview', 'pkg-pr-new'],
  rules: {
    catalog: 'off'
  }
}

export default config
