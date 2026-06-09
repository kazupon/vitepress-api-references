import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { expect, test } from 'vite-plus/test'
import { withOxContentApiDocs } from '../src/vitepress.ts'

test('withOxContentApiDocs generates docs, merges sidebar, and registers plugin', async () => {
  let root: string | undefined

  try {
    root = await createFixtureRoot()
    const config = await withOxContentApiDocs({
      themeConfig: {
        sidebar: [{ text: 'Guide' }, { text: 'API References' }]
      },
      apiDocs: {
        root,
        entryPoints: [{ path: 'src/index.ts', name: 'default' }],
        outDir: 'docs/api',
        basePath: '/api',
        nav: {
          section: { text: 'API References', collapsed: false },
          insert: 'replace',
          replaceText: 'API References'
        }
      }
    })

    expect(config.themeConfig?.sidebar).toEqual([
      { text: 'Guide' },
      expect.objectContaining({
        text: 'API References',
        collapsed: false,
        items: expect.any(Array)
      })
    ])
    expect(config.vite?.plugins).toEqual([expect.objectContaining({})])
  } finally {
    if (root) {
      await fs.rm(root, { recursive: true, force: true })
    }
  }
})

test('withOxContentApiDocs flattens single-entry typedoc sidebar when requested', async () => {
  let root: string | undefined

  try {
    root = await createFixtureRoot()
    const config = await withOxContentApiDocs({
      themeConfig: {
        sidebar: [{ text: 'API References' }]
      },
      apiDocs: {
        root,
        entryPoints: [{ path: 'src/index.ts', name: 'default' }],
        outDir: 'docs/api',
        basePath: '/api',
        markdown: {
          pathStrategy: 'typedoc',
          singleEntryRoot: 'flatten'
        },
        nav: {
          section: { text: 'API References' },
          insert: 'replace',
          replaceText: 'API References'
        },
        write: false
      }
    })

    expect(config.themeConfig?.sidebar).toEqual([
      {
        text: 'API References',
        items: [
          expect.objectContaining({
            text: 'Variables',
            items: [
              expect.objectContaining({ text: 'value', link: '/api/default/variables/value' })
            ]
          })
        ]
      }
    ])
    const sidebar = config.themeConfig?.sidebar
    expect(Array.isArray(sidebar)).toBe(true)
    const apiSection = (sidebar as { items: Record<string, unknown>[] }[])[0]
    expect(apiSection.items[0]).not.toHaveProperty('link')
  } finally {
    if (root) {
      await fs.rm(root, { recursive: true, force: true })
    }
  }
})

test('withOxContentApiDocs keeps branch links for generated index routes', async () => {
  let root: string | undefined

  try {
    root = await createFixtureRoot()
    const config = await withOxContentApiDocs({
      themeConfig: {
        sidebar: [{ text: 'API References' }]
      },
      apiDocs: {
        root,
        entryPoints: [{ path: 'src/index.ts', name: 'default' }],
        outDir: 'docs/api',
        basePath: '/api',
        markdown: {
          pathStrategy: 'typedoc'
        },
        nav: {
          section: { text: 'API References' },
          insert: 'replace',
          replaceText: 'API References'
        },
        write: false
      }
    })

    expect(config.themeConfig?.sidebar).toEqual([
      {
        text: 'API References',
        items: [
          expect.objectContaining({
            text: 'default',
            link: '/api/default',
            items: [
              expect.objectContaining({
                text: 'Variables',
                items: [
                  expect.objectContaining({ text: 'value', link: '/api/default/variables/value' })
                ]
              })
            ]
          })
        ]
      }
    ])
  } finally {
    if (root) {
      await fs.rm(root, { recursive: true, force: true })
    }
  }
})

test('withOxContentApiDocs skips disabled config', async () => {
  const config = await withOxContentApiDocs({ apiDocs: false })

  expect(config).toEqual({ apiDocs: false })
})

async function createFixtureRoot(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'vpar-vp-'))
  await fs.mkdir(path.join(root, 'src'), { recursive: true })
  await fs.writeFile(
    path.join(root, 'src/index.ts'),
    ['/**', ' * Creates a value.', ' */', 'export const value = 1', ''].join('\n')
  )
  return root
}
