# Interface: VitePressSidebarItem

Minimal VitePress sidebar item shape used by generated API docs.

## Signature

```ts
export interface VitePressSidebarItem
```

## Properties

- `collapsed` _(optional)_ `property` `boolean` - Whether this item's nested children start collapsed.
- `items` _(optional)_ `property` [`VitePressSidebarItem`](/standalone/main/interfaces/VitePressSidebarItem.md)\[\] - Nested sidebar items displayed below this item.
- `link` _(optional)_ `property` `string` - VitePress route path opened when the sidebar item is selected.
- `text` _(optional)_ `property` `string` - Text label displayed in the VitePress sidebar.
