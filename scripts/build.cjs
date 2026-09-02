#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var compiled = path.join(__dirname, '..', 'dist', 'cjs', 'scripts', 'build.js');
if (fs.existsSync(compiled)) {
  require(compiled);
} else {
  console.log('build: Skipping (dist/ not built yet - run npm run build)');
}
