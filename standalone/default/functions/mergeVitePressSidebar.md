# Function: mergeVitePressSidebar()

Merges generated API docs sidebar data into an existing VitePress sidebar.

## Signature

```ts
export function mergeVitePressSidebar(sidebar: unknown, generated: VitePressSidebarItem, options: MergeVitePressSidebarOptions = {}): unknown
```

## Parameters

- `sidebar` (`unknown`) - Existing VitePress sidebar configuration.
- `generated` ([`VitePressSidebarItem`](/standalone/default/interfaces/VitePressSidebarItem.md)) - Generated API docs sidebar section.
- `options` ([`MergeVitePressSidebarOptions`](/standalone/default/interfaces/MergeVitePressSidebarOptions.md)) - Sidebar merge options. _(optional, default: {})_

## Returns

`unknown` — Updated VitePress sidebar configuration.

## Examples

```ts
import { mergeVitePressSidebar } from 'vitepress-api-references'

const sidebar = mergeVitePressSidebar(
  [{ text: 'Guide', link: '/guide/' }],
  { text: 'API Reference', items: [{ text: 'Config', link: '/api/config' }] },
  { insert: 'append' }
)
```
