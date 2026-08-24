import { defineConfig } from 'bumpp'
import { updateChangelog } from 'gh-changelogen'

export default defineConfig({
  all: true,
  commit: 'release: v%s',
  execute: async operation => {
    await updateChangelog({
      repository: 'kazupon/vitepress-api-references',
      tagName: `v${operation.state.newVersion}`,
      source: 'generated-notes',
      targetCommitish: 'HEAD',
      output: 'CHANGELOG.md'
    })
  },
  push: true,
  tag: true
})
