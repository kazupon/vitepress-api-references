/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import { generateOxContentApiDocs } from './generate.ts'
import { mergeApiDocsOptions } from './options.ts'
import { createVitePressSidebarSection, mergeVitePressSidebar } from './sidebar.ts'
import { createApiDocsVitePlugin } from './watch.ts'

import type { UserConfig } from 'vitepress'
import type { OxContentApiDocsOptions, VitePressSidebarItem } from './types.ts'

declare module 'vitepress' {
  interface UserConfig {
    apiDocs?: OxContentApiDocsOptions | false
  }
}

/**
 * Adds generated API docs pages, sidebar data, and watch support to a VitePress config.
 *
 * @example
 * ```ts
 * import { defineConfig } from 'vitepress'
 * import { withOxContentApiDocs } from 'vitepress-api-references'
 *
 * export default defineConfig(
 *   await withOxContentApiDocs({
 *     title: 'My Library',
 *     themeConfig: {
 *       sidebar: [{ text: 'Guide', link: '/' }, { text: 'API Reference' }]
 *     },
 *     apiDocs: {
 *       entryPoints: [{ path: 'src/index.ts', name: 'default' }],
 *       outDir: 'docs/api',
 *       basePath: '/api',
 *       nav: {
 *         section: { text: 'API Reference', collapsed: false },
 *         insert: 'replace',
 *         replaceText: 'API Reference'
 *       }
 *     }
 *   })
 * )
 * ```
 *
 * @param config - VitePress user configuration.
 * @param override - Optional API docs options applied over the configured options.
 * @returns Updated VitePress user configuration.
 */
export async function withOxContentApiDocs(
  config: UserConfig,
  override?: OxContentApiDocsOptions
): Promise<UserConfig> {
  const configuredOptions = config.apiDocs

  if (configuredOptions === false && !override) {
    return config
  }

  const baseOptions = configuredOptions === false ? undefined : configuredOptions
  const apiDocsOptions = override
    ? baseOptions
      ? mergeApiDocsOptions(baseOptions, override)
      : override
    : baseOptions

  if (!apiDocsOptions) {
    return config
  }

  const result = await generateOxContentApiDocs(apiDocsOptions)
  const sidebarSection = removeMissingBranchLinks(
    createVitePressSidebarSection(result.nav, result.resolvedOptions.nav),
    createGeneratedRoutePathSet(result.files, result.resolvedOptions.basePath)
  )

  config.themeConfig ??= {}
  config.themeConfig.sidebar = mergeVitePressSidebar(
    config.themeConfig.sidebar,
    sidebarSection,
    result.resolvedOptions.nav
  )
  config.vite ??= {}
  config.vite.plugins = [
    ...(Array.isArray(config.vite.plugins) ? config.vite.plugins : []),
    createApiDocsVitePlugin(apiDocsOptions, {
      initialHash: result.hash,
      initialNav: result.nav
    })
  ]

  return config
}

function createGeneratedRoutePathSet(files: Record<string, string>, basePath: string): Set<string> {
  const routes = new Set<string>()
  for (const filePath of Object.keys(files)) {
    if (!filePath.endsWith('.md')) {
      continue
    }

    const routePath = filePath.slice(0, -'.md'.length)
    if (routePath === 'index') {
      routes.add(normalizeRoutePath(basePath))
    } else if (routePath.endsWith('/index')) {
      routes.add(normalizeRoutePath(`${basePath}/${routePath.slice(0, -'/index'.length)}`))
    } else {
      routes.add(normalizeRoutePath(`${basePath}/${routePath}`))
    }
  }
  return routes
}

function removeMissingBranchLinks(
  item: VitePressSidebarItem,
  routes: ReadonlySet<string>
): VitePressSidebarItem {
  const next: VitePressSidebarItem = { ...item }
  if (item.items) {
    next.items = item.items.map(child => removeMissingBranchLinks(child, routes))
  }

  if (next.items?.length && next.link && !routes.has(normalizeRoutePath(next.link))) {
    delete next.link
  }

  return next
}

function normalizeRoutePath(routePath: string): string {
  const withoutMarkdown = routePath.endsWith('.md') ? routePath.slice(0, -'.md'.length) : routePath
  const normalized = withoutMarkdown.startsWith('/') ? withoutMarkdown : `/${withoutMarkdown}`
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized
}
