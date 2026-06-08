/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Writes generated content only when the target file content changes.
 *
 * @param filePath - Output file path.
 * @param content - File content to write.
 * @returns Whether the file was written.
 */
export async function writeGeneratedFile(filePath: string, content: string): Promise<boolean> {
  await fs.mkdir(path.dirname(filePath), { recursive: true })

  try {
    const current = await fs.readFile(filePath, 'utf8')
    if (current === content) {
      return false
    }
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error
    }
  }

  await fs.writeFile(filePath, content)
  return true
}

/**
 * Writes multiple generated files into an output directory.
 *
 * @param files - Generated file contents keyed by relative path.
 * @param outDir - Output directory used to resolve relative paths.
 * @returns Absolute paths for generated files.
 */
export async function writeGeneratedFiles(
  files: Record<string, string>,
  outDir: string
): Promise<string[]> {
  const generatedFiles: string[] = []

  for (const [relativePath, content] of Object.entries(files)) {
    const filePath = path.resolve(outDir, relativePath)
    await writeGeneratedFile(filePath, content)
    generatedFiles.push(filePath)
  }

  return generatedFiles
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'
}
