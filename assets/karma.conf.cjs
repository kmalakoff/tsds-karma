"use strict";
var extensions = [
    '.ts',
    '.tsx',
    '.mts',
    '.js',
    '.jsx',
    '.mjs'
];
var preprocessors = extensions.reduce(function(memo, ext) {
    memo["test/**/*".concat(ext)] = [
        'webpack',
        'sourcemap'
    ];
    return memo;
}, {});
var webpack = {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: extensions,
        extensionAlias: {
            '.js': [
                '.ts',
                '.js'
            ],
            '.mjs': [
                '.mts',
                '.mjs'
            ]
        },
        alias: {
            jsdom: false
        }
    }
};
module.exports = function(config) {
    var pattern = process.argv[process.argv.length - 1];
    config.set({
        basePath: process.cwd(),
        frameworks: [
            'mocha',
            'webpack'
        ],
        reporters: [
            'mocha'
        ],
        preprocessors: preprocessors,
        files: [
            {
                pattern: pattern,
                watched: false
            }
        ],
        webpack: webpack,
        client: {
            mocha: {
                timeout: 5000
            }
        },
        colors: true,
        browsers: [
            'ChromeHeadless'
        ],
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity
    });
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }