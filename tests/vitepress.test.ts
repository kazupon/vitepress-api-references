import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { expect, test } from 'vite-plus/test'
import { withOxContentApiDocs } from '../src/vitepress.ts'

test('withOxContentApiDocs generates docs, merges sidebar, and registers plugin', async () => {
  const root = await createFixtureRoot()
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
