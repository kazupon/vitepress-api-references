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
    entry: ['src/index.ts', 'src/vitepress.ts', 'src/api-docs.ts', 'src/nav.ts'],
    dts: {
      tsgo: true
    },
    exports: true
  },
  lint: defineLintConfig({
    comments: {
      enForceHeaderComment: {
        ignoreFiles: [...defaultIgnoreFilesOfEnforceHeaderCommentRule]
      }
    }
  }),
  fmt: defineFmtConfig({
    ignorePatterns: ['CHANGELOG.md']
  })
})
