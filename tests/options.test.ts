import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { expect, test } from 'vite-plus/test'
import { resolveApiDocsOptions } from '../src/options.ts'

test('resolves paths relative to root', () => {
  const root = path.resolve('fixtures/basic')
  const resolved = resolveApiDocsOptions({
    root: pathToFileURL(root),
    tsconfig: 'tsconfig.json',
    entryPoints: [{ path: 'src/index.ts', name: 'default' }],
    outDir: 'docs/api',
    basePath: 'api',
    extraction: {
      externalPackageSources: [
        { package: 'external-package', entry: 'node_modules/external/index.d.ts' }
      ]
    }
  })

  expect(resolved.root).toBe(root)
  expect(resolved.tsconfig).toBe(path.join(root, 'tsconfig.json'))
  expect(resolved.entryPoints[0]).toEqual({
    path: path.join(root, 'src/index.ts'),
    name: 'default'
  })
  expect(resolved.outDir).toBe(path.join(root, 'docs/api'))
  expect(resolved.basePath).toBe('/api')
  expect(resolved.extraction.externalPackageSources?.[0]?.entry).toBe(
    path.join(root, 'node_modules/external/index.d.ts')
  )
})
