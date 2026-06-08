# Interface: ResolvedOxContentApiDocsOptions

API docs options after defaults are applied and all paths are normalized.

## Extends

- `Omit`\<[`OxContentApiDocsOptions`](/standalone/default/interfaces/OxContentApiDocsOptions.md), 'root' | 'tsconfig' | 'entryPoints' | 'outDir' | 'extraction' | 'nav'\>

## Signature

```ts
export interface ResolvedOxContentApiDocsOptions extends Omit<
  OxContentApiDocsOptions,
  'root' | 'tsconfig' | 'entryPoints' | 'outDir' | 'extraction' | 'nav'
>
```

## Properties

- `entryPoints` `property` `JsEntryPointSpec[]` - Entry point specs with paths resolved to absolute filesystem paths.
- `extraction` `property` `ResolvedOxContentExtractionOptions` - Extraction options with defaults applied and external package paths resolved.
- `nav` `property` `Required`\<`Pick`\<[`VitePressNavOptions`](/standalone/default/interfaces/VitePressNavOptions.md), 'enabled' | 'insert' | 'virtualModule'\>\> & `Omit`\<[`VitePressNavOptions`](/standalone/default/interfaces/VitePressNavOptions.md), 'enabled' | 'insert' | 'virtualModule'\> - VitePress navigation options with default integration settings applied.
- `outDir` `property` `string` - Absolute output directory for generated markdown and optional artifacts.
- `root` `property` `string` - Absolute project root used as the base for all relative inputs.
- `tsconfig` _(optional)_ `property` `string` - Absolute TypeScript configuration path, when configured. **Default:** `undefined`
