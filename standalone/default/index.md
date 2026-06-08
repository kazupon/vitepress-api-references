# default

Entrypoint for `vitepress-api-references` package

## Example

```ts
import { withOxContentApiDocs } from 'vitepress-api-references'
```

_14 symbols · 5 functions · 9 interfaces · 10 parameters · 50 members · 5 returns · 6 examples_

## Functions

| Function | Description |
| ------ | ------ |
| [createVitePressSidebarSection](/standalone/default/functions/createVitePressSidebarSection.md) | Creates a VitePress sidebar section from generated API docs navigation. |
| [generateOxContentApiDocs](/standalone/default/functions/generateOxContentApiDocs.md) | Generates API reference markdown, navigation metadata, and optional artifacts. |
| [mergeVitePressSidebar](/standalone/default/functions/mergeVitePressSidebar.md) | Merges generated API docs sidebar data into an existing VitePress sidebar. |
| [toVitePressSidebarItems](/standalone/default/functions/toVitePressSidebarItems.md) | Converts API docs navigation metadata into VitePress sidebar items. |
| [withOxContentApiDocs](/standalone/default/functions/withOxContentApiDocs.md) | Adds generated API docs pages, sidebar data, and watch support to a VitePress config. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [ApiDocsNavItem](/standalone/default/interfaces/ApiDocsNavItem.md) | Navigation item generated from API docs metadata. |
| [MergeVitePressSidebarOptions](/standalone/default/interfaces/MergeVitePressSidebarOptions.md) | Options for merging generated sidebar items into an existing VitePress sidebar. |
| [OxContentApiDocsOptions](/standalone/default/interfaces/OxContentApiDocsOptions.md) | User-facing options for generating API reference markdown and VitePress integration. |
| [OxContentApiDocsResult](/standalone/default/interfaces/OxContentApiDocsResult.md) | Result produced by API docs generation. |
| [OxContentExtractionOptions](/standalone/default/interfaces/OxContentExtractionOptions.md) | Controls which declarations and metadata ox-content extracts from entry points. |
| [OxContentMarkdownOptions](/standalone/default/interfaces/OxContentMarkdownOptions.md) | Markdown rendering options forwarded to ox-content after project defaults are applied. |
| [ResolvedOxContentApiDocsOptions](/standalone/default/interfaces/ResolvedOxContentApiDocsOptions.md) | API docs options after defaults are applied and all paths are normalized. |
| [VitePressNavOptions](/standalone/default/interfaces/VitePressNavOptions.md) | Configures generated VitePress sidebar data and optional navigation artifacts. |
| [VitePressSidebarItem](/standalone/default/interfaces/VitePressSidebarItem.md) | Minimal VitePress sidebar item shape used by generated API docs. |

