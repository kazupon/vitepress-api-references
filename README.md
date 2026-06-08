# vitepress-api-references

[![npm][npm-src]][npm-href] [![CI][ci-src]][ci-href]

Enable JSDoc API Reference for VitePress.

## Usage

### VitePress integration

This repository uses the VitePress integration to generate and serve its own API reference docs. See [`docs/.vitepress/config.ts`](./docs/.vitepress/config.ts) and the generated [`docs/api`](./docs/api) directory for a working self-hosted example.

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

### Standalone markdown generation

Use `generateOxContentApiDocs` when you want to generate markdown files directly without wiring the result into VitePress. See [`standalone/generate.ts`](./standalone/generate.ts) for a runnable example.

```ts
import { generateOxContentApiDocs } from 'vitepress-api-references'

const result = await generateOxContentApiDocs({
  entryPoints: [{ path: 'src/index.ts', name: 'default' }],
  outDir: 'standalone',
  basePath: '/standalone',
  markdown: {
    pathStrategy: 'typedoc',
    renderStyle: 'markdown',
    indexFormat: 'table'
  }
})

console.log(`Generated ${result.generatedFiles.length} files`)
```

Run the example with:

```sh
vp run docs:standalone
```

## Local API reference docs

This repository uses its own public root API as the docs source under `docs/`.

```sh
vp run docs:build
vp run docs:dev
```

## Credits

Built on top of [Ox Content](https://github.com/ubugeeei-prod/ox-content), which extracts JSDoc API metadata and renders the generated markdown.

## License

[MIT](http://opensource.org/licenses/MIT)

<!-- Badges -->

[npm-src]: https://img.shields.io/npm/v/vitepress-api-references?style=flat
[npm-href]: https://npmjs.com/package/vitepress-api-references
[ci-src]: https://github.com/kazupon/vitepress-api-references/actions/workflows/ci.yml/badge.svg
[ci-href]: https://github.com/kazupon/vitepress-api-references/actions/workflows/ci.yml
