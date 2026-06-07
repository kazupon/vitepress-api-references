import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['src/index.ts', 'src/api-docs.ts', 'src/vitepress.ts', 'src/nav.ts'],
  ignore: ['tests/**/*.test.ts', 'fixtures/**', 'docs/.vitepress/config.ts'],
  ignoreDependencies: ['@kazupon/eslint-plugin', '@typescript/native-preview', 'pkg-pr-new'],
  rules: {
    catalog: 'off'
  }
}

export default config
