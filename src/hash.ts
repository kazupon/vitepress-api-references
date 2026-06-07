/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import type { ResolvedOxContentApiDocsOptions } from './types.ts'

export async function createGenerationHash(
  options: ResolvedOxContentApiDocsOptions
): Promise<string> {
  const hash = createHash('sha256')
  hash.update(JSON.stringify(toHashableOptions(options)))

  for (const filePath of collectInputFiles(options)) {
    hash.update(filePath)
    hash.update(await statHash(filePath))
  }

  return hash.digest('hex')
}

function toHashableOptions(options: ResolvedOxContentApiDocsOptions): unknown {
  return {
    root: options.root,
    tsconfig: options.tsconfig,
    entryPoints: options.entryPoints,
    outDir: options.outDir,
    basePath: options.basePath,
    githubUrl: options.githubUrl,
    extraction: options.extraction,
    markdown: options.markdown,
    docsJson: options.docsJson,
    escapeHeadingAngleBrackets: options.escapeHeadingAngleBrackets
  }
}

function collectInputFiles(options: ResolvedOxContentApiDocsOptions): string[] {
  return [
    ...options.entryPoints.map(entry => entry.path),
    ...(options.tsconfig ? [options.tsconfig] : []),
    ...(options.extraction.externalPackageSources?.map(source => source.entry) ?? [])
  ]
}

async function statHash(filePath: string): Promise<string> {
  try {
    const stat = await fs.stat(filePath)
    return `${stat.mtimeMs}:${stat.size}`
  } catch {
    return 'missing'
  }
}
