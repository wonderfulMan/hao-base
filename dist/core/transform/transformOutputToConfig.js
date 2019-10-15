"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../../helper/path");
function transformOutputToConfig(config) {
    config.output = {
        path: path_1.default.BUIL_DIR_PATH,
        filename: function (payload) {
            return "js/[name].[contenthash].js";
        }
    };
}
exports.transformOutputToConfig = transformOutputToConfig;
