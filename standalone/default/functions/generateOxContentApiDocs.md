# Function: generateOxContentApiDocs()

Generates API reference markdown, navigation metadata, and optional artifacts.

## Signature

```ts
export async function generateOxContentApiDocs(options: OxContentApiDocsOptions): Promise<OxContentApiDocsResult>
```

## Parameters

- `options` ([`OxContentApiDocsOptions`](/standalone/default/interfaces/OxContentApiDocsOptions.md)) - API docs generation options.

## Returns

`Promise`\<[`OxContentApiDocsResult`](/standalone/default/interfaces/OxContentApiDocsResult.md)\> — Generated API docs files, metadata, diagnostics, and resolved options.

## Examples

```ts
import { generateOxContentApiDocs } from 'vitepress-api-references'

const result = await generateOxContentApiDocs({
  entryPoints: ['src/index.ts'],
  outDir: 'docs/api',
  basePath: '/api'
})

console.log(result.generatedFiles)
```
