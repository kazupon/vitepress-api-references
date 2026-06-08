/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import { defineConfig } from 'vitepress'
import { withOxContentApiDocs } from '../../../../../src/vitepress.ts'

export default defineConfig(
  await withOxContentApiDocs({
    title: 'API References Fixture',
    themeConfig: {
      sidebar: [{ text: 'Guide', link: '/' }, { text: 'API References' }]
    },
    apiDocs: {
      root: new URL('../..', import.meta.url),
      entryPoints: [{ path: 'src/index.ts', name: 'default' }],
      outDir: 'docs/api',
      basePath: '/api',
      markdown: {
        pathStrategy: 'typedoc',
        renderStyle: 'markdown',
        indexFormat: 'table'
      },
      nav: {
        section: { text: 'API References', collapsed: false },
        insert: 'replace',
        replaceText: 'API References'
      }
    }
  })
)
