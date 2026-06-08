# Interface: OxContentApiDocsOptions

User-facing options for generating API reference markdown and VitePress integration.

## Signature

```ts
export interface OxContentApiDocsOptions
```

## Properties

- `basePath` `property` `string` - Base route used when generating links between API docs pages.
- `clean` _(optional)_ `property` `boolean` - Whether generated output should be cleaned before writing. **Default:** `undefined`
- `docsJson` _(optional)_ `property` `boolean | string` - Whether to write docs JSON, or the output path to write it to. **Default:** `undefined`
- `entryPoints` `property` `EntryPointInput[]` - Source entry points whose exported declarations become API docs pages.
- `escapeHeadingAngleBrackets` _(optional)_ `property` `boolean` - Escape `<` and `>` in markdown heading lines to avoid HTML parsing in VitePress. **Default:** `false`
- `extraction` _(optional)_ `property` [`OxContentExtractionOptions`](/standalone/default/interfaces/OxContentExtractionOptions.md) - Controls which declarations and metadata are extracted from entry points. **Default:** `{}`
- `githubUrl` _(optional)_ `property` `string` - GitHub repository URL used to generate source links for declarations. **Default:** `undefined`
- `markdown` _(optional)_ `property` [`OxContentMarkdownOptions`](/standalone/default/interfaces/OxContentMarkdownOptions.md) - Controls markdown page generation, grouping, sorting, and rendering details. **Default:** `{}`
- `nav` _(optional)_ `property` [`VitePressNavOptions`](/standalone/default/interfaces/VitePressNavOptions.md) - Controls generated VitePress sidebar integration and optional nav artifacts. **Default:** `{ enabled: true, insert: 'append', virtualModule: false }`
- `outDir` `property` `string | URL` - Directory where generated markdown and optional artifacts are written.
- `root` _(optional)_ `property` `string | URL` - Project root used to resolve relative paths. **Default:** `process.cwd()`
- `tsconfig` _(optional)_ `property` `string | URL` - TypeScript configuration file used for declaration extraction. **Default:** `undefined`
- `write` _(optional)_ `property` `boolean` - Whether generated files and artifacts are written to disk. **Default:** `true`
