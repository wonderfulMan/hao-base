"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformDevTools(webpackConfig) {
    webpackConfig.devtool = webpackConfig.mode === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map';
}
exports.transformDevTools = transformDevTools;
