# vitepress-api-references

[![npm][npm-src]][npm-href] [![CI][ci-src]][ci-href]

> [!WARNING] WIP

Enable JSDoc API Reference.

Public APIs are exported from the package root only.

## Usage

```ts
import { defineConfig } from 'vitepress'
import { withOxContentApiDocs } from 'vitepress-api-references'

export default defineConfig(
  await withOxContentApiDocs({
    themeConfig: {
      sidebar: [{ text: 'Guide', link: '/' }, { text: 'API References' }]
    },
    apiDocs: {
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
```

## License

[MIT](http://opensource.org/licenses/MIT)

<!-- Badges -->

[npm-src]: https://img.shields.io/npm/v/vitepress-api-references?style=flat
[npm-href]: https://npmjs.com/package/vitepress-api-references
[ci-src]: https://github.com/kazupon/vitepress-api-references/actions/workflows/ci.yml/badge.svg
[ci-href]: https://github.com/kazupon/vitepress-api-references/actions/workflows/ci.yml
