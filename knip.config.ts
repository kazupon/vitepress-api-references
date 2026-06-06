import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: ['vite.config.ts', 'tests/**/*.test.ts'],
  ignoreDependencies: [
    '@kazupon/eslint-plugin',
    '@kazupon/vp-config',
    '@typescript/native-preview',
    'pkg-pr-new',
    'gh-changelogen'
  ],
  rules: {
    catalog: 'off'
  }
}

export default config
