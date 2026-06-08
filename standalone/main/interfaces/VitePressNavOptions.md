# Interface: VitePressNavOptions

Configures generated VitePress sidebar data and optional navigation artifacts.

## Signature

```ts
export interface VitePressNavOptions
```

## Properties

- `collapsed` _(optional)_ `property` `boolean` | ((`item`: [`ApiDocsNavItem`](/standalone/main/interfaces/ApiDocsNavItem.md), `depth`: `number`) =\> `boolean` | `undefined`) - Collapsed state for generated sidebar branches, or a resolver called per item. **Default:** `undefined`
- `enabled` _(optional)_ `property` `boolean` - Whether generated navigation integration is enabled. **Default:** `true`
- `exportName` _(optional)_ `property` `string` - Named export used in the generated navigation code file. **Default:** `'apiDocsNav'`
- `insert` _(optional)_ `property` `VitePressSidebarInsert` - Positioning strategy used when merging generated items into an existing sidebar. **Default:** `'append'`
- `outputFile` _(optional)_ `property` `string | false` - File path for generated navigation code, or `false` to skip writing it. **Default:** `undefined`
- `replaceText` _(optional)_ `property` `string` - Sidebar item text to replace when `insert` is set to `replace`. **Default:** `undefined`
- `section` _(optional)_ `property` `VitePressSidebarSectionOptions` - Optional top-level sidebar section that wraps all generated API doc items. **Default:** `undefined`
- `sidebarRoute` _(optional)_ `property` `string` - Route key to update when the existing VitePress sidebar is a route map. **Default:** `undefined`
- `virtualModule` _(optional)_ `property` `string | false` - Virtual module id that exposes generated navigation data, or `false` to disable it. **Default:** `false`
