"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var check_1 = require("../../helper/check");
function transformExtensionsToConfig(webpackConfig, customConfig) {
    var externals = customConfig.globalVaras;
    if (externals && check_1.getObjectSize(externals)) {
        webpackConfig.externals = externals;
    }
}
exports.transformExtensionsToConfig = transformExtensionsToConfig;
