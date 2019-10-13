"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
function compiler(webpackConfig) {
    if (webpackConfig.mode === 'development') {
        build(webpackConfig);
    }
    if (webpackConfig.mode === 'production') {
        build(webpackConfig);
    }
}
exports.compiler = compiler;
function build(webpackConfig) {
    var compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
        console.log('build err', err);
        return false;
    });
}
exports.build = build;
function server() {
}
exports.server = server;
//# sourceMappingURL=compiler.js.map