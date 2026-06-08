import { defineConfig } from 'vite-plus'
import {
  defineLintConfig,
  defineFmtConfig,
  defaultIgnoreFilesOfEnforceHeaderCommentRule
} from '@kazupon/vp-config'

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  },
  pack: {
    entry: ['src/index.ts'],
    dts: {
      tsgo: true
    },
    exports: true
  },
  lint: defineLintConfig({
    comments: {
      enForceHeaderComment: {
        ignoreFiles: [...defaultIgnoreFilesOfEnforceHeaderCommentRule, 'standalone/generate.ts']
      }
    },
    jsdoc: {
      typescript: 'syntax',
      error: true
    },
    regexp: {}
  }),
  fmt: defineFmtConfig({
    ignorePatterns: ['CHANGELOG.md', 'standalone/**/*.md', 'docs/**/*.md']
  })
})
