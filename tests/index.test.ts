import { expect, test } from 'vite-plus/test'
import {
  generateOxContentApiDocs,
  mergeVitePressSidebar,
  toVitePressSidebarItems,
  withOxContentApiDocs
} from '../src/index.ts'

test('exports public API', () => {
  expect(generateOxContentApiDocs).toBeTypeOf('function')
  expect(withOxContentApiDocs).toBeTypeOf('function')
  expect(toVitePressSidebarItems).toBeTypeOf('function')
  expect(mergeVitePressSidebar).toBeTypeOf('function')
})
