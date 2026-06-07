/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import type {
  ApiDocsNavItem,
  MergeVitePressSidebarOptions,
  VitePressNavOptions,
  VitePressSidebarItem
} from './types.ts'

export function toVitePressSidebarItems(
  nav: ApiDocsNavItem[],
  options: VitePressNavOptions = {}
): VitePressSidebarItem[] {
  return nav.map(item => toSidebarItem(item, options, 0))
}

export function createVitePressSidebarSection(
  nav: ApiDocsNavItem[],
  options: VitePressNavOptions = {}
): VitePressSidebarItem {
  const items = toVitePressSidebarItems(nav, options)
  const section = options.section

  if (!section) {
    return { items }
  }

  return {
    text: section.text,
    collapsed: section.collapsed,
    items
  }
}

export function mergeVitePressSidebar(
  sidebar: unknown,
  generated: VitePressSidebarItem,
  options: MergeVitePressSidebarOptions = {}
): unknown {
  const insert = options.insert ?? 'append'

  if (typeof insert === 'function') {
    return insert(sidebar, generated)
  }

  if (isSidebarMulti(sidebar)) {
    const route = options.sidebarRoute
    if (!route) {
      return sidebar
    }

    return {
      ...sidebar,
      [route]: mergeVitePressSidebar(sidebar[route], generated, options)
    }
  }

  const items = Array.isArray(sidebar) ? sidebar : []

  if (insert === 'prepend') {
    return [generated, ...items]
  }

  if (insert === 'replace') {
    return replaceSidebarItem(items, generated, options.replaceText)
  }

  return [...items, generated]
}

function toSidebarItem(
  item: ApiDocsNavItem,
  options: VitePressNavOptions,
  depth: number
): VitePressSidebarItem {
  const children = item.children?.map(child => toSidebarItem(child, options, depth + 1))
  const sidebarItem: VitePressSidebarItem = {
    text: item.title
  }
  const collapsed = resolveCollapsed(item, options, depth)

  if (collapsed !== undefined) {
    sidebarItem.collapsed = collapsed
  }

  if (children?.length) {
    sidebarItem.items = children
    if (depth === 0 && item.path) {
      sidebarItem.link = item.path
    }
  } else if (item.path) {
    sidebarItem.link = item.path
  }

  return sidebarItem
}

function replaceSidebarItem(
  items: unknown[],
  generated: VitePressSidebarItem,
  replaceText?: string
): unknown[] {
  let replaced = false
  const next = items.map(item => {
    if (isSidebarItem(item)) {
      if (replaceText && item.text === replaceText) {
        replaced = true
        return generated
      }

      if (replaceText && item.items) {
        const nested = replaceSidebarItem(item.items, generated, replaceText)
        if (nested !== item.items) {
          replaced = true
          return { ...item, items: nested }
        }
      }
    }
    return item
  })

  return replaced ? next : [...items, generated]
}

function resolveCollapsed(
  item: ApiDocsNavItem,
  options: VitePressNavOptions,
  depth: number
): boolean | undefined {
  if (typeof options.collapsed === 'function') {
    return options.collapsed(item, depth)
  }
  return options.collapsed
}

function isSidebarItem(value: unknown): value is VitePressSidebarItem {
  return typeof value === 'object' && value !== null
}

function isSidebarMulti(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(item => Array.isArray(item))
  )
}
