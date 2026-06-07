/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import { defineConfig } from 'vitepress'
import { withOxContentApiDocs } from 'vitepress-api-references'

export default defineConfig(
  await withOxContentApiDocs({
    title: 'vitepress-api-references',
    description: 'Enable JSDoc API Reference',
    themeConfig: {
      nav: [{ text: 'API References', link: '/api/' }],
      sidebar: [
        { text: 'Overview', link: '/' },
        { text: 'API References', link: '/api/' }
      ]
    },
    apiDocs: {
      entryPoints: [{ path: 'src/index.ts', name: 'default' }],
      outDir: 'docs/api',
      basePath: '/api',
      markdown: {
        pathStrategy: 'typedoc',
        renderStyle: 'markdown',
        indexFormat: 'table',
        typeDeclarationFormat: 'table',
        typeAliasPropertiesFormat: 'table',
        interfacePropertiesFormat: 'table',
        parametersFormat: 'table',
        enumMembersFormat: 'table',
        classPropertiesFormat: 'table',
        propertyMembersFormat: 'table'
      },
      nav: {
        section: { text: 'API References', collapsed: false },
        insert: 'replace',
        replaceText: 'API References'
      }
    }
  })
)
