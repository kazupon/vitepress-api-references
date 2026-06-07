import { describe, expect, test } from 'vite-plus/test'
import {
  createVitePressSidebarSection,
  mergeVitePressSidebar,
  toVitePressSidebarItems
} from '../src/sidebar.ts'
import type { ApiDocsNavItem } from '../src/types.ts'

const nav: ApiDocsNavItem[] = [
  {
    title: 'default',
    path: '/api/default',
    children: [
      {
        title: 'Functions',
        path: '/api/default/functions',
        children: [{ title: 'greet', path: '/api/default/functions/greet' }]
      }
    ]
  }
]

describe('toVitePressSidebarItems', () => {
  test('keeps module links and omits category links', () => {
    expect(toVitePressSidebarItems(nav)).toEqual([
      {
        text: 'default',
        link: '/api/default',
        items: [
          {
            text: 'Functions',
            items: [{ text: 'greet', link: '/api/default/functions/greet' }]
          }
        ]
      }
    ])
  })

  test('wraps generated items in a configured section', () => {
    expect(
      createVitePressSidebarSection(nav, {
        section: { text: 'API References', collapsed: false }
      })
    ).toEqual({
      text: 'API References',
      collapsed: false,
      items: toVitePressSidebarItems(nav)
    })
  })
})

describe('mergeVitePressSidebar', () => {
  test('appends generated section by default', () => {
    expect(mergeVitePressSidebar([{ text: 'Guide' }], { text: 'API' })).toEqual([
      { text: 'Guide' },
      { text: 'API' }
    ])
  })

  test('replaces matching section', () => {
    expect(
      mergeVitePressSidebar(
        [{ text: 'Guide' }, { text: 'API References' }],
        { text: 'API References', items: [] },
        { insert: 'replace', replaceText: 'API References' }
      )
    ).toEqual([{ text: 'Guide' }, { text: 'API References', items: [] }])
  })
})
