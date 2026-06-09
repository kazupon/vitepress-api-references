/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import path from 'node:path'
import {
  extractDocsFromEntryPoints,
  generateDocsDataJson,
  generateDocsMarkdown,
  generateDocsNavCode,
  generateDocsNavMetadataFromDocs
} from '@ox-content/napi'
import { writeGeneratedFile, writeGeneratedFiles } from './files.ts'
import { createGenerationHash } from './hash.ts'
import { resolveApiDocsOptions } from './options.ts'

import type { JsDocsMarkdownModule } from '@ox-content/napi'
import type { ApiDocsNavItem, OxContentApiDocsOptions, OxContentApiDocsResult } from './types.ts'

/**
 * Generates API reference markdown, navigation metadata, and optional artifacts.
 *
 * @example
 * ```ts
 * import { generateOxContentApiDocs } from 'vitepress-api-references'
 *
 * const result = await generateOxContentApiDocs({
 *   entryPoints: ['src/index.ts'],
 *   outDir: 'docs/api',
 *   basePath: '/api'
 * })
 *
 * console.log(result.generatedFiles)
 * ```
 *
 * @param options - API docs generation options.
 * @returns Generated API docs files, metadata, diagnostics, and resolved options.
 */
export async function generateOxContentApiDocs(
  options: OxContentApiDocsOptions
): Promise<OxContentApiDocsResult> {
  const resolvedOptions = resolveApiDocsOptions(options)
  const extractedDocs = extractDocsFromEntryPoints(resolvedOptions.entryPoints, {
    root: resolvedOptions.root,
    tsconfig: resolvedOptions.tsconfig,
    ...resolvedOptions.extraction
  })
  const docs: JsDocsMarkdownModule[] = extractedDocs.map(module => ({
    file: module.name,
    description: module.description,
    sourcePath: module.sourcePath,
    examples: module.examples,
    tags: module.tags,
    entries: module.entries.map(entry => ({
      ...entry,
      tags: entry.tags
        ? Object.entries(entry.tags).map(([tag, value]) => ({
            tag,
            value
          }))
        : undefined,
      hasBody: entry.hasBody ?? false
    }))
  }))
  const markdownOptions = {
    ...resolvedOptions.markdown,
    basePath: resolvedOptions.basePath,
    githubUrl: resolvedOptions.githubUrl
  }
  const rawFiles = generateDocsMarkdown(docs, markdownOptions)
  const files = resolvedOptions.escapeHeadingAngleBrackets
    ? escapeHeadingAngleBrackets(rawFiles)
    : rawFiles
  const nav = generateDocsNavMetadataFromDocs(docs, {
    basePath: resolvedOptions.basePath,
    pathStrategy: resolvedOptions.markdown?.pathStrategy,
    singleEntryRoot: resolvedOptions.markdown?.singleEntryRoot,
    groupOrder: resolvedOptions.markdown?.groupOrder,
    sort: resolvedOptions.markdown?.sort,
    sortEntryPoints: resolvedOptions.markdown?.sortEntryPoints,
    kindSortOrder: resolvedOptions.markdown?.kindSortOrder
  }) as ApiDocsNavItem[]
  const generatedFiles = resolvedOptions.write
    ? await writeGeneratedFiles(files, resolvedOptions.outDir)
    : Object.keys(files).map(file => path.resolve(resolvedOptions.outDir, file))

  if (resolvedOptions.write) {
    await writeOptionalArtifacts(resolvedOptions, docs, nav, generatedFiles)
  }

  return {
    files,
    nav,
    docs,
    generatedFiles,
    diagnostics: extractedDocs.flatMap(module =>
      module.diagnostics.map(diagnostic => diagnostic.message)
    ),
    hash: await createGenerationHash(resolvedOptions),
    resolvedOptions
  }
}

async function writeOptionalArtifacts(
  options: ReturnType<typeof resolveApiDocsOptions>,
  docs: JsDocsMarkdownModule[],
  nav: ApiDocsNavItem[],
  generatedFiles: string[]
): Promise<void> {
  if (options.docsJson) {
    const docsJsonPath = typeof options.docsJson === 'string' ? options.docsJson : 'docs.json'
    const outputPath = path.isAbsolute(docsJsonPath)
      ? docsJsonPath
      : path.join(options.outDir, docsJsonPath)
    await writeGeneratedFile(
      outputPath,
      `${generateDocsDataJson(docs, new Date().toISOString())}\n`
    )
    generatedFiles.push(outputPath)
  }

  if (options.nav.outputFile) {
    const outputPath = path.isAbsolute(options.nav.outputFile)
      ? options.nav.outputFile
      : path.join(options.outDir, options.nav.outputFile)
    await writeGeneratedFile(
      outputPath,
      generateDocsNavCode(nav, options.nav.exportName ?? 'apiDocsNav')
    )
    generatedFiles.push(outputPath)
  }
}

function escapeHeadingAngleBrackets(files: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(files).map(([filePath, content]) => [
      filePath,
      content
        .split('\n')
        .map(line =>
          /^#{1,6}\s/.test(line) ? line.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : line
        )
        .join('\n')
    ])
  )
}
