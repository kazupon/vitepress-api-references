# Interface: OxContentExtractionOptions

Controls which declarations and metadata ox-content extracts from entry points.

## Signature

```ts
export interface OxContentExtractionOptions
```

## Properties

- `externalDocs` _(optional)_ `property` `boolean` - Preserve external documentation links and metadata from source declarations. **Default:** `false`
- `externalPackageSources` _(optional)_ `property` `ExternalPackageSourceInput[]` - External packages used to resolve cross-package references in generated docs. **Default:** `undefined`
- `internal` _(optional)_ `property` `boolean` - Include declarations marked as internal. **Default:** `false`
- `private` _(optional)_ `property` `boolean` - Include declarations marked as private. **Default:** `false`
- `typeParameters` _(optional)_ `property` `boolean` - Include generic type parameter declarations and descriptions in generated docs. **Default:** `false`
