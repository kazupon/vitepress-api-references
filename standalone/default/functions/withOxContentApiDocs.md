# Function: withOxContentApiDocs()

Adds generated API docs pages, sidebar data, and watch support to a VitePress config.

## Signature

```ts
export async function withOxContentApiDocs(config: UserConfig, override?: OxContentApiDocsOptions): Promise<UserConfig>
```

## Parameters

- `config` (`UserConfig`) - VitePress user configuration.
- `override` ([`OxContentApiDocsOptions`](/standalone/default/interfaces/OxContentApiDocsOptions.md)) - Optional API docs options applied over the configured options. _(optional)_

## Returns

`Promise<UserConfig>` — Updated VitePress user configuration.

## Examples

```ts
import { defineConfig } from 'vitepress'
import { withOxContentApiDocs } from 'vitepress-api-references'

export default await withOxContentApiDocs(
  defineConfig({
    title: 'My Library',
    apiDocs: {
      entryPoints: ['src/index.ts'],
      outDir: 'api',
      basePath: '/api'
    }
  })
)
```
