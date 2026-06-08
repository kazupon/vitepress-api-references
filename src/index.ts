/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

export { generateOxContentApiDocs } from './generate.ts'
export { withOxContentApiDocs } from './vitepress.ts'
export {
  createVitePressSidebarSection,
  mergeVitePressSidebar,
  toVitePressSidebarItems
} from './sidebar.ts'

export type {
  ApiDocsNavItem,
  MergeVitePressSidebarOptions,
  OxContentApiDocsOptions,
  OxContentApiDocsResult,
  OxContentExtractionOptions,
  OxContentMarkdownOptions,
  ResolvedOxContentApiDocsOptions,
  VitePressNavOptions,
  VitePressSidebarItem
} from './types.ts'
