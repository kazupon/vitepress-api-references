# Function: toVitePressSidebarItems()

Converts API docs navigation metadata into VitePress sidebar items.

## Signature

```ts
export function toVitePressSidebarItems(nav: ApiDocsNavItem[], options: VitePressNavOptions = {}): VitePressSidebarItem[]
```

## Parameters

- `nav` ([`ApiDocsNavItem`](/standalone/main/interfaces/ApiDocsNavItem.md)\[\]) - API docs navigation metadata.
- `options` ([`VitePressNavOptions`](/standalone/main/interfaces/VitePressNavOptions.md)) - VitePress navigation options. _(optional, default: {})_

## Returns

[`VitePressSidebarItem`](/standalone/main/interfaces/VitePressSidebarItem.md)\[\] — Generated VitePress sidebar items.

## Examples

```ts
import { toVitePressSidebarItems } from 'vitepress-api-references'

const sidebarItems = toVitePressSidebarItems([
  {
    title: 'API',
    path: '/api/',
    children: [{ title: 'withOxContentApiDocs', path: '/api/with-ox-content-api-docs' }]
  }
])
```
