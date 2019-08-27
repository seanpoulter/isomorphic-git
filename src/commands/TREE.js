// @ts-check
import { FileSystem } from '../models/FileSystem.js'
import { GitWalkerRepo } from '../models/GitWalkerRepo.js'
import { join } from '../utils/join.js'
import { cores } from '../utils/plugins.js'
import { GitWalkerSymbol } from '../utils/symbols.js'

/**
 *
 * @typedef Walker
 * @property {Symbol} Symbol('GitWalkerSymbol')
 */

/**
 * Get a git commit Walker
 *
 * See [walkBeta1](./walkBeta1.md)
 *
 * @param {object} args
 * @param {string} [args.core = 'default'] - The plugin core identifier to use for plugin injection
 * @param {FileSystem} [args.fs] - [deprecated] The filesystem containing the git repo. Overrides the fs provided by the [plugin system](./plugin_fs.md).
 * @param {string} [args.dir] - The [working tree](dir-vs-gitdir.md) directory path
 * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
 * @param {string} [args.ref='HEAD'] - [required] The commit to walk
 *
 * @returns {Walker} Returns a git commit Walker
 *
 */
export function TREE ({
  core = 'default',
  dir,
  gitdir = join(dir, '.git'),
  fs: _fs = cores.get(core).get('fs'),
  ref = 'HEAD'
}) {
  const fs = new FileSystem(_fs)
  const o = Object.create(null)
  Object.defineProperty(o, GitWalkerSymbol, {
    value: function () {
      return new GitWalkerRepo({ fs, gitdir, ref })
    }
  })
  Object.freeze(o)
  return o
}