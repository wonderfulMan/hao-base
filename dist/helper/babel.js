"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var babelConfig = {
    "cacheDirectory": true,
    "babelrc": false,
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
        require.resolve("@babel/plugin-transform-runtime")
    ]
};
exports.default = babelConfig;
