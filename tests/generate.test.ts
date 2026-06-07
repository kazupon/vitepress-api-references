import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { generateOxContentApiDocs } from '../src/generate.ts'

describe('generateOxContentApiDocs', () => {
  let root: string | undefined

  afterEach(async () => {
    if (root) {
      await fs.rm(root, { recursive: true, force: true })
      root = undefined
    }
  })

  test('generates markdown and nav from a TypeScript entry point', async () => {
    root = await createFixtureRoot()
    const result = await generateOxContentApiDocs({
      root,
      entryPoints: [{ path: 'src/index.ts', name: 'default' }],
      outDir: 'docs/api',
      basePath: '/api',
      markdown: {
        pathStrategy: 'typedoc',
        renderStyle: 'markdown',
        indexFormat: 'table'
      },
      docsJson: true
    })

    expect(Object.keys(result.files).length).toBeGreaterThan(0)
    expect(result.generatedFiles.length).toBeGreaterThan(0)
    expect(result.nav.length).toBeGreaterThan(0)
    expect(result.generatedFiles.some(file => file.endsWith('docs.json'))).toBe(true)
  })

  test('can skip filesystem writes', async () => {
    root = await createFixtureRoot()
    const result = await generateOxContentApiDocs({
      root,
      entryPoints: ['src/index.ts'],
      outDir: 'docs/api',
      basePath: '/api',
      write: false
    })

    expect(result.generatedFiles.length).toBe(Object.keys(result.files).length)
  })
})

async function createFixtureRoot(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'vpar-'))
  await fs.mkdir(path.join(root, 'src'), { recursive: true })
  await fs.writeFile(
    path.join(root, 'src/index.ts'),
    [
      '/**',
      ' * Greets a user.',
      ' *',
      ' * @param name - User name.',
      ' * @returns Greeting message.',
      ' */',
      'export function greet(name: string): string {',
      '  return `Hello, ${name}`',
      '}',
      ''
    ].join('\n')
  )
  return root
}
