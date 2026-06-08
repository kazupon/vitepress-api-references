/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import { defineConfig } from 'vitepress'
import { withOxContentApiDocs } from '../../src/index.ts'

export default defineConfig(
  await withOxContentApiDocs({
    title: 'vitepress-api-references',
    description: 'Enable JSDoc API Reference',
    base: '/vitepress-api-references/',
    themeConfig: {
      nav: [{ text: 'API References', link: '/api/' }],
      sidebar: [
        { text: 'Overview', link: '/' },
        { text: 'API References', link: '/api/' }
      ]
    },
    apiDocs: {
      entryPoints: [{ path: 'src/index.ts' }],
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
        section: { text: 'API References' },
        collapsed: true,
        insert: 'replace',
        replaceText: 'API References'
      }
    }
  })
)
