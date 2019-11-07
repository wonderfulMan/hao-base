"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var read_1 = require("./read");
var absPath = read_1.getDirPath('babel.config.js');
var generatorBabelConfig = function (customConfig) {
    var baseConfig = {
        "cacheDirectory": true,
        "babelrc": false,
        "extends": fs.existsSync(absPath) ? absPath : undefined,
        "presets": [
            [
                require.resolve("@babel/preset-env"),
                {
                    "useBuiltIns": "usage",
                    "modules": false,
                    "corejs": 3
                }
            ]
        ],
        "plugins": [
            require.resolve("@babel/plugin-transform-runtime"),
            require.resolve("@babel/plugin-syntax-dynamic-import")
        ]
    };
    if (customConfig.typescript) {
        baseConfig.presets.push([require.resolve('@babel/preset-typescript')]);
        baseConfig.plugins.push(require.resolve('@babel/plugin-transform-typescript'));
    }
    if (customConfig.frame === 'react') {
        baseConfig.presets.push([require.resolve('@babel/preset-react')]);
        baseConfig.plugins.push(require.resolve('react-hot-loader/babel'));
    }
    return baseConfig;
};
exports.default = generatorBabelConfig;
