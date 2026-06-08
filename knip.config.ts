import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['src/index.ts', 'standalone/generate.ts'],
  ignore: ['tests/**/*.test.ts', 'tests/fixtures/**', 'docs/.vitepress/config.ts'],
  ignoreDependencies: ['@typescript/native-preview', 'pkg-pr-new'],
  rules: {
    catalog: 'off'
  }
}

export default config
