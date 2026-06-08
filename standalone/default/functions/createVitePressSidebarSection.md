# Function: createVitePressSidebarSection()

Creates a VitePress sidebar section from generated API docs navigation.

## Signature

```ts
export function createVitePressSidebarSection(
  nav: ApiDocsNavItem[],
  options: VitePressNavOptions = {}
): VitePressSidebarItem
```

## Parameters

- `nav` ([`ApiDocsNavItem`](/standalone/default/interfaces/ApiDocsNavItem.md)\[\]) - API docs navigation metadata.
- `options` ([`VitePressNavOptions`](/standalone/default/interfaces/VitePressNavOptions.md)) - VitePress navigation options. _(optional, default: {})_

## Returns

[`VitePressSidebarItem`](/standalone/default/interfaces/VitePressSidebarItem.md) — Generated VitePress sidebar section.

## Examples

```ts
import { createVitePressSidebarSection } from 'vitepress-api-references'

const apiSection = createVitePressSidebarSection(apiDocsNav, {
  section: {
    text: 'API Reference',
    collapsed: false
  }
})
```
