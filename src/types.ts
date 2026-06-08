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

interface ExternalPackageSourceInput {
  /** Package name whose exported docs can be linked from generated references. */
  package: string
  /** Entry point file or URL used to extract metadata for the external package. */
  entry: string | URL
}

interface VitePressSidebarSectionOptions {
  /** Label shown for the generated top-level sidebar section. */
  text: string
  /**
   * Whether the generated top-level sidebar section starts collapsed in VitePress.
   *
   * @default undefined
   */
  collapsed?: boolean
}

interface ResolvedOxContentExtractionOptions extends Omit<
  JsEntryPointDocsOptions,
  'root' | 'tsconfig'
> {
  /** External package sources converted to the structure expected by ox-content. */
  externalPackageSources?: JsExternalPackageSource[]
}

/** Controls which declarations and metadata ox-content extracts from entry points. */
export interface OxContentExtractionOptions {
  /**
   * Include declarations marked as private.
   *
   * @default false
   */
  private?: boolean
  /**
   * Include declarations marked as internal.
   *
   * @default false
   */
  internal?: boolean
  /**
   * Preserve external documentation links and metadata from source declarations.
   *
   * @default false
   */
  externalDocs?: boolean
  /**
   * Include generic type parameter declarations and descriptions in generated docs.
   *
   * @default false
   */
  typeParameters?: boolean
  /**
   * External packages used to resolve cross-package references in generated docs.
   *
   * @default undefined
   */
  externalPackageSources?: ExternalPackageSourceInput[]
}

/** Markdown rendering options forwarded to ox-content after project defaults are applied. */
export interface OxContentMarkdownOptions extends Omit<
  JsDocsMarkdownOptions,
  'basePath' | 'githubUrl'
> {}

type VitePressSidebarInsert =
  | 'append'
  | 'prepend'
  | 'replace'
  | ((sidebar: unknown, generated: VitePressSidebarItem) => unknown)

/** Configures generated VitePress sidebar data and optional navigation artifacts. */
export interface VitePressNavOptions {
  /**
   * Whether generated navigation integration is enabled.
   *
   * @default true
   */
  enabled?: boolean
  /**
   * Optional top-level sidebar section that wraps all generated API doc items.
   *
   * @default undefined
   */
  section?: VitePressSidebarSectionOptions
  /**
   * Positioning strategy used when merging generated items into an existing sidebar.
   *
   * @default 'append'
   */
  insert?: VitePressSidebarInsert
  /**
   * Sidebar item text to replace when `insert` is set to `replace`.
   *
   * @default undefined
   */
  replaceText?: string
  /**
   * Route key to update when the existing VitePress sidebar is a route map.
   *
   * @default undefined
   */
  sidebarRoute?: string
  /**
   * Collapsed state for generated sidebar branches, or a resolver called per item.
   *
   * @default undefined
   */
  collapsed?: boolean | ((item: ApiDocsNavItem, depth: number) => boolean | undefined)
  /**
   * File path for generated navigation code, or `false` to skip writing it.
   *
   * @default undefined
   */
  outputFile?: string | false
  /**
   * Virtual module id that exposes generated navigation data, or `false` to disable it.
   *
   * @default false
   */
  virtualModule?: string | false
  /**
   * Named export used in the generated navigation code file.
   *
   * @default 'apiDocsNav'
   */
  exportName?: string
}

/** User-facing options for generating API reference markdown and VitePress integration. */
export interface OxContentApiDocsOptions {
  /**
   * Project root used to resolve relative paths.
   *
   * @default process.cwd()
   */
  root?: string | URL
  /**
   * TypeScript configuration file used for declaration extraction.
   *
   * @default undefined
   */
  tsconfig?: string | URL
  /** Source entry points whose exported declarations become API docs pages. */
  entryPoints: EntryPointInput[]
  /** Directory where generated markdown and optional artifacts are written. */
  outDir: string | URL
  /** Base route used when generating links between API docs pages. */
  basePath: string
  /**
   * GitHub repository URL used to generate source links for declarations.
   *
   * @default undefined
   */
  githubUrl?: string
  /**
   * Whether generated output should be cleaned before writing.
   *
   * @default undefined
   */
  clean?: boolean
  /**
   * Whether generated files and artifacts are written to disk.
   *
   * @default true
   */
  write?: boolean
  /**
   * Controls which declarations and metadata are extracted from entry points.
   *
   * @default {}
   */
  extraction?: OxContentExtractionOptions
  /**
   * Controls markdown page generation, grouping, sorting, and rendering details.
   *
   * @default {}
   */
  markdown?: OxContentMarkdownOptions
  /**
   * Controls generated VitePress sidebar integration and optional nav artifacts.
   *
   * @default { enabled: true, insert: 'append', virtualModule: false }
   */
  nav?: VitePressNavOptions
  /**
   * Whether to write docs JSON, or the output path to write it to.
   *
   * @default undefined
   */
  docsJson?: boolean | string
  /**
   * Escape `<` and `>` in markdown heading lines to avoid HTML parsing in VitePress.
   *
   * @default false
   */
  escapeHeadingAngleBrackets?: boolean
}

/** API docs options after defaults are applied and all paths are normalized. */
export interface ResolvedOxContentApiDocsOptions extends Omit<
  OxContentApiDocsOptions,
  'root' | 'tsconfig' | 'entryPoints' | 'outDir' | 'extraction' | 'nav'
> {
  /** Absolute project root used as the base for all relative inputs. */
  root: string
  /**
   * Absolute TypeScript configuration path, when configured.
   *
   * @default undefined
   */
  tsconfig?: string
  /** Entry point specs with paths resolved to absolute filesystem paths. */
  entryPoints: JsEntryPointSpec[]
  /** Absolute output directory for generated markdown and optional artifacts. */
  outDir: string
  /** Extraction options with defaults applied and external package paths resolved. */
  extraction: ResolvedOxContentExtractionOptions
  /** VitePress navigation options with default integration settings applied. */
  nav: Required<Pick<VitePressNavOptions, 'enabled' | 'insert' | 'virtualModule'>> &
    Omit<VitePressNavOptions, 'enabled' | 'insert' | 'virtualModule'>
}

/** Navigation item generated from API docs metadata. */
export interface ApiDocsNavItem {
  /** Human-readable title shown in generated navigation and sidebar items. */
  title: string
  /** VitePress link path for the generated API docs page. */
  path: string
  /** Nested navigation items for grouped modules or declaration hierarchies. */
  children?: ApiDocsNavItem[]
}

/** Minimal VitePress sidebar item shape used by generated API docs. */
export interface VitePressSidebarItem {
  /** Text label displayed in the VitePress sidebar. */
  text?: string
  /** VitePress route path opened when the sidebar item is selected. */
  link?: string
  /** Whether this item's nested children start collapsed. */
  collapsed?: boolean
  /** Nested sidebar items displayed below this item. */
  items?: VitePressSidebarItem[]
}

/** Options for merging generated sidebar items into an existing VitePress sidebar. */
export interface MergeVitePressSidebarOptions {
  /** Positioning strategy used when inserting generated items into the sidebar. */
  insert?: VitePressSidebarInsert
  /** Existing sidebar item text to replace when `insert` is set to `replace`. */
  replaceText?: string
  /** Route key to update when the existing VitePress sidebar is a route map. */
  sidebarRoute?: string
}

/** Result produced by API docs generation. */
export interface OxContentApiDocsResult {
  /** Generated markdown and artifact contents keyed by relative output path. */
  files: Record<string, string>
  /** Navigation metadata derived from generated docs. */
  nav: ApiDocsNavItem[]
  /** Markdown module data generated from extracted declarations. */
  docs: JsDocsMarkdownModule[]
  /** Absolute paths for files written to disk or planned when `write` is `false`. */
  generatedFiles: string[]
  /** Diagnostic messages reported while extracting docs. */
  diagnostics: string[]
  /** Hash representing the current generation options and watched input files. */
  hash: string
  /** Normalized options used for this generation run. */
  resolvedOptions: ResolvedOxContentApiDocsOptions
}
