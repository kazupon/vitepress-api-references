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

  test('uses boolean collapsed option for generated branches and section fallback', () => {
    expect(
      createVitePressSidebarSection(nav, {
        section: { text: 'API References' },
        collapsed: true
      })
    ).toEqual({
      text: 'API References',
      collapsed: true,
      items: [
        {
          text: 'default',
          collapsed: true,
          link: '/api/default',
          items: [
            {
              text: 'Functions',
              collapsed: true,
              items: [{ text: 'greet', link: '/api/default/functions/greet' }]
            }
          ]
        }
      ]
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

  test('replaces only the matching top-level section in grouped sidebars', () => {
    const generated = {
      text: 'API References',
      items: [{ text: 'default', link: '/api/default', items: [] }]
    }
    const result = mergeVitePressSidebar(
      [
        {
          text: 'Introduction',
          items: [
            { text: "What's Gunshi?", link: '/guide/introduction/what-is-gunshi' },
            { text: 'Setup', link: '/guide/introduction/setup' }
          ]
        },
        {
          text: 'API References',
          collapsed: false,
          items: [{ text: 'API References', link: '/api' }]
        },
        {
          text: 'Release Notes',
          items: [{ text: 'Gunshi v0.27 Release Notes', link: '/release/v0.27' }]
        }
      ],
      generated,
      { insert: 'replace', replaceText: 'API References' }
    )

    expect(result).toEqual([
      {
        text: 'Introduction',
        items: [
          { text: "What's Gunshi?", link: '/guide/introduction/what-is-gunshi' },
          { text: 'Setup', link: '/guide/introduction/setup' }
        ]
      },
      generated,
      {
        text: 'Release Notes',
        items: [{ text: 'Gunshi v0.27 Release Notes', link: '/release/v0.27' }]
      }
    ])
    expect(countSidebarText(result, 'API References')).toBe(1)
  })

  test('appends generated section once when no replacement target exists', () => {
    const generated = { text: 'API References', items: [{ text: 'default', link: '/api/default' }] }
    const result = mergeVitePressSidebar(
      [
        {
          text: 'Introduction',
          items: [{ text: 'Setup', link: '/guide/introduction/setup' }]
        },
        {
          text: 'Release Notes',
          items: [{ text: 'Gunshi v0.27 Release Notes', link: '/release/v0.27' }]
        }
      ],
      generated,
      { insert: 'replace', replaceText: 'API References' }
    )

    expect(result).toEqual([
      {
        text: 'Introduction',
        items: [{ text: 'Setup', link: '/guide/introduction/setup' }]
      },
      {
        text: 'Release Notes',
        items: [{ text: 'Gunshi v0.27 Release Notes', link: '/release/v0.27' }]
      },
      generated
    ])
    expect(countSidebarText(result, 'API References')).toBe(1)
  })

  test('replaces nested matching section without root fallback append', () => {
    const generated = { text: 'API References', items: [{ text: 'default', link: '/api/default' }] }
    const result = mergeVitePressSidebar(
      [
        {
          text: 'Guide',
          items: [
            { text: 'Overview', link: '/guide/' },
            { text: 'API References', items: [{ text: 'Old', link: '/old-api' }] }
          ]
        },
        { text: 'Release Notes', link: '/release/' }
      ],
      generated,
      { insert: 'replace', replaceText: 'API References' }
    )

    expect(result).toEqual([
      {
        text: 'Guide',
        items: [{ text: 'Overview', link: '/guide/' }, generated]
      },
      { text: 'Release Notes', link: '/release/' }
    ])
    expect(countSidebarText(result, 'API References')).toBe(1)
  })
})

function countSidebarText(value: unknown, text: string): number {
  if (Array.isArray(value)) {
    return value.reduce((count, item) => count + countSidebarText(item, text), 0)
  }

  if (typeof value === 'object' && value !== null) {
    const item = value as { text?: unknown; items?: unknown }
    return (item.text === text ? 1 : 0) + countSidebarText(item.items, text)
  }

  return 0
}
