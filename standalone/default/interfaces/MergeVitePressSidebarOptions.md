# Interface: MergeVitePressSidebarOptions

Options for merging generated sidebar items into an existing VitePress sidebar.

## Signature

```ts
export interface MergeVitePressSidebarOptions
```

## Properties

- `insert` _(optional)_ `property` `VitePressSidebarInsert` - Positioning strategy used when inserting generated items into the sidebar.
- `replaceText` _(optional)_ `property` `string` - Existing sidebar item text to replace when `insert` is set to `replace`.
- `sidebarRoute` _(optional)_ `property` `string` - Route key to update when the existing VitePress sidebar is a route map.
