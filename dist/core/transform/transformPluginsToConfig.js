"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugins_1 = require("../set/plugins");
function transformPluginsToConfig(webpackConfig, customConfig, shellArgs) {
    var plugins = [];
    var definePlugins = plugins_1.setGlobalVarsToContext(webpackConfig, customConfig, shellArgs);
    var cleanPlugin = plugins_1.setCleanDirByBuild(webpackConfig, customConfig, shellArgs);
    cleanPlugin && plugins.push(cleanPlugin);
    plugins.push(definePlugins);
    webpackConfig.plugins = plugins;
}
exports.transformPluginsToConfig = transformPluginsToConfig;
//# sourceMappingURL=transformPluginsToConfig.js.map