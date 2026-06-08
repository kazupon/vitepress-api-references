# Interface: ApiDocsNavItem

Navigation item generated from API docs metadata.

## Signature

```ts
export interface ApiDocsNavItem
```

## Properties

- `children` _(optional)_ `property` [`ApiDocsNavItem`](/standalone/default/interfaces/ApiDocsNavItem.md)\[\] - Nested navigation items for grouped modules or declaration hierarchies.
- `path` `property` `string` - VitePress link path for the generated API docs page.
- `title` `property` `string` - Human-readable title shown in generated navigation and sidebar items.
