"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../../helper/path");
function transformOutputToConfig(config) {
    config.output = {
        path: path_1.default.BUIL_DIR_PATH,
        filename: function (webpack) {
            return "[name]/app-[contenthash:8].bundle.js";
        },
        chunkFilename: "[name]/[name]-chunk-[contenthash:8].bundle.js"
    };
}
exports.transformOutputToConfig = transformOutputToConfig;
