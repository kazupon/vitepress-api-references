import { generateOxContentApiDocs } from '../src/index.ts'

const result = await generateOxContentApiDocs({
  entryPoints: [{ path: 'src/index.ts', name: 'main' }],
  outDir: 'standalone',
  basePath: '/standalone',
  markdown: {
    pathStrategy: 'typedoc',
    singleEntryRoot: 'flatten',
    renderStyle: 'markdown',
    indexFormat: 'table'
  }
})

console.log(`Generated ${result.generatedFiles.length} files`)
