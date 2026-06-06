/**
 * vitepress api references entry point
 *
 * @module default
 */

/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import { createDebug } from 'obug'

const debug = createDebug('vitepress-api-references')

export function fn() {
  debug('fn called')
  return 'Hello, tsdown!'
}
