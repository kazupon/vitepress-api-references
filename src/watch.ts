/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import type { ViteDevServer, Plugin } from 'vite'
import { generateOxContentApiDocs } from './generate.ts'
import { createGenerationHash } from './hash.ts'
import { resolveApiDocsOptions } from './options.ts'
import type { ApiDocsNavItem, OxContentApiDocsOptions } from './types.ts'

export interface ApiDocsPluginOptions {
  initialHash?: string
  initialNav?: ApiDocsNavItem[]
}

export function createApiDocsVitePlugin(
  options: OxContentApiDocsOptions,
  pluginOptions: ApiDocsPluginOptions = {}
): Plugin {
  const resolvedOptions = resolveApiDocsOptions(options)
  let lastHash = pluginOptions.initialHash
  let navItems = pluginOptions.initialNav ?? []
  let debounceTimer: ReturnType<typeof setTimeout> | undefined

  async function regenerate(force = false): Promise<void> {
    const nextHash = await createGenerationHash(resolvedOptions)
    if (!force && lastHash === nextHash) {
      return
    }

    const result = await generateOxContentApiDocs(options)
    lastHash = result.hash
    navItems = result.nav
  }

  return {
    name: 'vitepress-api-references:api-docs',
    enforce: 'post',
    async buildStart() {
      await regenerate()
    },
    configureServer(server) {
      const watchedFiles = getWatchedFiles(options)
      server.watcher.add(watchedFiles)
      server.watcher.on('all', (_event, filePath) => {
        if (!watchedFiles.includes(filePath)) {
          return
        }
        queueRegenerate(server, () => regenerate(true))
      })
    },
    resolveId(id) {
      if (resolvedOptions.nav.virtualModule && id === resolvedOptions.nav.virtualModule) {
        return id
      }
      return undefined
    },
    load(id) {
      if (resolvedOptions.nav.virtualModule && id === resolvedOptions.nav.virtualModule) {
        return `export const navItems = ${JSON.stringify(navItems)}\n`
      }
      return undefined
    }
  }

  function queueRegenerate(server: ViteDevServer, run: () => Promise<void>): void {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    debounceTimer = setTimeout(() => {
      void run().then(() => {
        server.ws.send({ type: 'full-reload' })
      })
    }, 100)
  }
}

function getWatchedFiles(options: OxContentApiDocsOptions): string[] {
  const resolvedOptions = resolveApiDocsOptions(options)
  return [
    ...resolvedOptions.entryPoints.map(entry => entry.path),
    ...(resolvedOptions.extraction.externalPackageSources?.map(source => source.entry) ?? [])
  ]
}
