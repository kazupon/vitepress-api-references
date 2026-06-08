# Interface: OxContentApiDocsResult

Result produced by API docs generation.

## Signature

```ts
export interface OxContentApiDocsResult
```

## Properties

- `diagnostics` `property` `string[]` - Diagnostic messages reported while extracting docs.
- `docs` `property` `JsDocsMarkdownModule[]` - Markdown module data generated from extracted declarations.
- `files` `property` `Record<string, string>` - Generated markdown and artifact contents keyed by relative output path.
- `generatedFiles` `property` `string[]` - Absolute paths for files written to disk or planned when `write` is `false`.
- `hash` `property` `string` - Hash representing the current generation options and watched input files.
- `nav` `property` [`ApiDocsNavItem`](/standalone/default/interfaces/ApiDocsNavItem.md)\[\] - Navigation metadata derived from generated docs.
- `resolvedOptions` `property` [`ResolvedOxContentApiDocsOptions`](/standalone/default/interfaces/ResolvedOxContentApiDocsOptions.md) - Normalized options used for this generation run.
