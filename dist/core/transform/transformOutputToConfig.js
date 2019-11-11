"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../../helper/path");
function transformOutputToConfig(webpackConfig, customConfig) {
    var selectHashType = webpackConfig.mode === 'development' ? 'hash' : 'contenthash';
    var publicPath = webpackConfig.mode === 'development' ? '/' : customConfig.publicPath || '../';
    webpackConfig.output = {
        path: path_1.default.BUIL_DIR_PATH,
        filename: "[name]/app-[" + selectHashType + ":8].bundle.js",
        publicPath: publicPath,
        chunkFilename: "[name]/[name]-chunk-[" + selectHashType + ":8].bundle.js",
        pathinfo: webpackConfig.mode === 'development'
    };
}
exports.transformOutputToConfig = transformOutputToConfig;
