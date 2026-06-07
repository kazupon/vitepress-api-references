/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import type { UserConfig } from 'vitepress'
import { generateOxContentApiDocs } from './generate.ts'
import { mergeApiDocsOptions } from './options.ts'
import { createVitePressSidebarSection, mergeVitePressSidebar } from './sidebar.ts'
import type { OxContentApiDocsOptions } from './types.ts'
import { createApiDocsVitePlugin } from './watch.ts'

declare module 'vitepress' {
  interface UserConfig {
    apiDocs?: OxContentApiDocsOptions | false
  }
}

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
  const sidebarSection = createVitePressSidebarSection(result.nav, result.resolvedOptions.nav)

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
