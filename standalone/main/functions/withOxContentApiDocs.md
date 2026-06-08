# Function: withOxContentApiDocs()

Adds generated API docs pages, sidebar data, and watch support to a VitePress config.

## Signature

```ts
export async function withOxContentApiDocs(config: UserConfig, override?: OxContentApiDocsOptions): Promise<UserConfig>
```

## Parameters

- `config` (`UserConfig`) - VitePress user configuration.
- `override` ([`OxContentApiDocsOptions`](/standalone/main/interfaces/OxContentApiDocsOptions.md)) - Optional API docs options applied over the configured options. _(optional)_

## Returns

`Promise<UserConfig>` — Updated VitePress user configuration.

## Examples

```ts
import { defineConfig } from 'vitepress'
import { withOxContentApiDocs } from 'vitepress-api-references'

export default defineConfig(
  await withOxContentApiDocs({
    title: 'My Library',
    themeConfig: {
      sidebar: [{ text: 'Guide', link: '/' }, { text: 'API Reference' }]
    },
    apiDocs: {
      entryPoints: [{ path: 'src/index.ts', name: 'default' }],
      outDir: 'docs/api',
      basePath: '/api',
      nav: {
        section: { text: 'API Reference', collapsed: false },
        insert: 'replace',
        replaceText: 'API Reference'
      }
    }
  })
)
```
