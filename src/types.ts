/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import type {
  JsDocsMarkdownModule,
  JsDocsMarkdownOptions,
  JsEntryPointDocsOptions,
  JsEntryPointSpec,
  JsExternalPackageSource
} from '@ox-content/napi'

type EntryPointInput = string | { path: string | URL; name?: string }

export interface OxContentExtractionOptions {
  private?: boolean
  internal?: boolean
  externalDocs?: boolean
  typeParameters?: boolean
  externalPackageSources?: Array<{ package: string; entry: string | URL }>
}

export interface OxContentMarkdownOptions extends Omit<
  JsDocsMarkdownOptions,
  'basePath' | 'githubUrl'
> {}

type VitePressSidebarInsert =
  | 'append'
  | 'prepend'
  | 'replace'
  | ((sidebar: unknown, generated: VitePressSidebarItem) => unknown)

export interface VitePressNavOptions {
  enabled?: boolean
  section?: {
    text: string
    collapsed?: boolean
  }
  insert?: VitePressSidebarInsert
  replaceText?: string
  sidebarRoute?: string
  collapsed?: boolean | ((item: ApiDocsNavItem, depth: number) => boolean | undefined)
  outputFile?: string | false
  virtualModule?: string | false
  exportName?: string
}

export interface OxContentApiDocsOptions {
  root?: string | URL
  tsconfig?: string | URL
  entryPoints: EntryPointInput[]
  outDir: string | URL
  basePath: string
  githubUrl?: string
  clean?: boolean
  write?: boolean
  extraction?: OxContentExtractionOptions
  markdown?: OxContentMarkdownOptions
  nav?: VitePressNavOptions
  docsJson?: boolean | string
  escapeHeadingAngleBrackets?: boolean
}

export interface ResolvedOxContentApiDocsOptions extends Omit<
  OxContentApiDocsOptions,
  'root' | 'tsconfig' | 'entryPoints' | 'outDir' | 'extraction' | 'nav'
> {
  root: string
  tsconfig?: string
  entryPoints: JsEntryPointSpec[]
  outDir: string
  extraction: Omit<JsEntryPointDocsOptions, 'root' | 'tsconfig'> & {
    externalPackageSources?: JsExternalPackageSource[]
  }
  nav: Required<Pick<VitePressNavOptions, 'enabled' | 'insert' | 'virtualModule'>> &
    Omit<VitePressNavOptions, 'enabled' | 'insert' | 'virtualModule'>
}

export interface ApiDocsNavItem {
  title: string
  path: string
  children?: ApiDocsNavItem[]
}

export interface VitePressSidebarItem {
  text?: string
  link?: string
  collapsed?: boolean
  items?: VitePressSidebarItem[]
}

export interface MergeVitePressSidebarOptions {
  insert?: VitePressSidebarInsert
  replaceText?: string
  sidebarRoute?: string
}

export interface OxContentApiDocsResult {
  files: Record<string, string>
  nav: ApiDocsNavItem[]
  docs: JsDocsMarkdownModule[]
  generatedFiles: string[]
  diagnostics: string[]
  hash: string
  resolvedOptions: ResolvedOxContentApiDocsOptions
}
