"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build_1 = require("./build");
var server_1 = require("./server");
function compiler(webpackConfig, customConfig) {
    if (webpackConfig.mode === 'development') {
        server_1.server(webpackConfig, customConfig);
    }
    if (webpackConfig.mode === 'production') {
        build_1.build(webpackConfig);
    }
}
exports.compiler = compiler;
