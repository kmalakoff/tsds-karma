import spawn from 'cross-spawn-cb';
import getopts from 'getopts-compat';
import { link, unlink } from 'link-unlink';
import { wrap } from 'node-version-call';
import path from 'path';
import Queue from 'queue-cb';
import resolveBin from 'resolve-bin-sync';
import type { CommandCallback, CommandOptions } from 'tsds-lib';
import { installPath } from 'tsds-lib';
import url from 'url';

const major = +process.versions.node.split('.')[0];
const version = major > 14 ? 'local' : 'stable';
const __dirname = path.dirname(typeof __filename === 'undefined' ? url.fileURLToPath(import.meta.url) : __filename);
const dist = path.join(__dirname, '..');
const workerWrapper = wrap(path.join(dist, 'cjs', 'command.js'));
const config = path.join(__dirname, '..', '..', 'assets', 'karma.conf.cjs');

function worker(args: string[], options: CommandOptions, callback: CommandCallback) {
  const cwd: string = (options.cwd as string) || process.cwd();
  const opts = getopts(args, { alias: { 'dry-run': 'd' }, boolean: ['dry-run'] });

  if (opts['dry-run']) {
    console.log('Dry-run: would run browser tests with karma');
    return callback();
  }

  link(cwd, installPath(options), (err, restore) => {
    if (err) return callback(err);

    try {
      const karmaBin = resolveBin('karma');
      const filteredArgs = args.filter((arg) => arg !== '--dry-run' && arg !== '-d');
      const tests = filteredArgs.length ? filteredArgs[0] : 'test/**/*.test.*';

      const queue = new Queue(1);
      queue.defer(spawn.bind(null, karmaBin, ['start', config, tests], options));
      queue.await((err) => unlink(restore, callback.bind(null, err)));
    } catch (err) {
      callback(err);
    }
  });
}

export default function karma(args: string[], options: CommandOptions, callback: CommandCallback): void {
  version !== 'local' ? workerWrapper('stable', args, options, callback) : worker(args, options, callback);
}
