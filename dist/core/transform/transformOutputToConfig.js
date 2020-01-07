"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../../helper/path");
function transformOutputToConfig(webpackConfig, customConfig) {
    var _a, _b, _c;
    var selectHashType = webpackConfig.mode === 'development' ? 'hash' : 'contenthash';
    webpackConfig.output = {
        path: path_1.default.BUIL_DIR_PATH,
        filename: "[name]/app-[" + selectHashType + ":8].bundle.js",
        chunkFilename: "[name]/[name]-chunk-[" + selectHashType + ":8].bundle.js",
        pathinfo: webpackConfig.mode === 'development',
        library: (_a = customConfig.output) === null || _a === void 0 ? void 0 : _a.library,
        libraryTarget: (_b = customConfig.output) === null || _b === void 0 ? void 0 : _b.libraryTarget,
        publicPath: ((_c = customConfig.output) === null || _c === void 0 ? void 0 : _c.publicPath) || webpackConfig.mode === 'development' ? '/' : '../'
    };
}
exports.transformOutputToConfig = transformOutputToConfig;
