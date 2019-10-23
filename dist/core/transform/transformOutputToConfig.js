"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../../helper/path");
function transformOutputToConfig(config) {
    config.output = {
        path: path_1.default.BUIL_DIR_PATH,
        filename: function (webpack) {
            var name = webpack.chunk.name;
            return "[name]/" + name + "-[contenthash:8].bundle.js";
        }
    };
}
exports.transformOutputToConfig = transformOutputToConfig;
