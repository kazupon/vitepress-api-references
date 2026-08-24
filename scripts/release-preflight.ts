/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import { execFileSync } from 'node:child_process'

function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' }).trim()
}

execFileSync('git', ['fetch', 'origin', 'main'], { stdio: 'inherit' })

const branch = git(['branch', '--show-current'])
if (branch !== 'main') {
  throw new Error(`Release must run on main (current: ${branch || 'detached HEAD'})`)
}

const head = git(['rev-parse', 'HEAD'])
const originMain = git(['rev-parse', 'origin/main'])
if (head !== originMain) {
  throw new Error('HEAD must match origin/main before release')
}
