/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { OxContentApiDocsOptions, ResolvedOxContentApiDocsOptions } from './types.ts'

/**
 * Resolves user API docs options into absolute paths and default values.
 *
 * @param options - User-facing API docs options.
 * @returns Resolved API docs options.
 */
export function resolveApiDocsOptions(
  options: OxContentApiDocsOptions
): ResolvedOxContentApiDocsOptions {
  const root = toAbsolutePath(options.root ?? process.cwd(), process.cwd())
  const outDir = toAbsolutePath(options.outDir, root)
  const tsconfig = options.tsconfig ? toAbsolutePath(options.tsconfig, root) : undefined
  const extraction = options.extraction ?? {}

  return {
    ...options,
    root,
    tsconfig,
    outDir,
    basePath: normalizeBasePath(options.basePath),
    entryPoints: options.entryPoints.map(entry => {
      if (typeof entry === 'string') {
        return { path: toAbsolutePath(entry, root) }
      }
      return {
        path: toAbsolutePath(entry.path, root),
        name: entry.name
      }
    }),
    extraction: {
      private: extraction.private ?? false,
      internal: extraction.internal ?? false,
      externalDocs: extraction.externalDocs ?? false,
      typeParameters: extraction.typeParameters ?? false,
      externalPackageSources: extraction.externalPackageSources?.map(source => ({
        package: source.package,
        entry: toAbsolutePath(source.entry, root)
      }))
    },
    markdown: options.markdown ?? {},
    nav: {
      enabled: options.nav?.enabled ?? true,
      insert: options.nav?.insert ?? 'append',
      virtualModule: options.nav?.virtualModule ?? false,
      ...options.nav
    },
    write: options.write ?? true,
    escapeHeadingAngleBrackets: options.escapeHeadingAngleBrackets ?? false
  }
}

/**
 * Merges base API docs options with override options.
 *
 * @param base - Base options from VitePress configuration.
 * @param override - Override options applied on top of the base options.
 * @returns Merged API docs options.
 */
export function mergeApiDocsOptions(
  base: OxContentApiDocsOptions,
  override?: OxContentApiDocsOptions
): OxContentApiDocsOptions {
  if (!override) {
    return base
  }

  const section = override.nav?.section ?? base.nav?.section
  const nav = {
    ...base.nav,
    ...override.nav
  }

  return {
    ...base,
    ...override,
    extraction: {
      ...base.extraction,
      ...override.extraction
    },
    markdown: {
      ...base.markdown,
      ...override.markdown
    },
    nav: section ? { ...nav, section } : nav
  }
}

function normalizeBasePath(basePath: string): string {
  const normalized = basePath.startsWith('/') ? basePath : `/${basePath}`
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized
}

function toAbsolutePath(value: string | URL, baseDir: string): string {
  if (value instanceof URL) {
    return fileURLToPath(value)
  }
  return path.isAbsolute(value) ? value : path.resolve(baseDir, value)
}
