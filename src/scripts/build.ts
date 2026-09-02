import spawn from 'cross-spawn-cb';
import exit from 'exit-compat';
import path from 'path';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE || '');
const prefix = process.env.npm_config_prefix || '';
const bin = isWindows ? prefix : path.join(prefix, 'bin');

spawn(path.join(bin, 'tsds'), ['build'], { cwd: process.cwd(), stdio: 'inherit' }, (err) => {
  exit(err ? 1 : 0);
});
