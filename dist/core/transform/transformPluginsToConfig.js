"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugins_1 = require("../set/plugins");
function transformPluginsToConfig(webpackConfig, customConfig, shellArgs, entry) {
    var plugins = [];
    var definevVarsPlugin = plugins_1.setGlobalVarsToContext(webpackConfig, customConfig, shellArgs);
    var optimizePlugins = plugins_1.setOptimizePlugins(webpackConfig, customConfig);
    var stylesPlugins = plugins_1.setStylesPlugins(webpackConfig, customConfig);
    var htmlPlugins = plugins_1.setHtmlPluguns(webpackConfig, customConfig, entry);
    plugins.push.apply(plugins, __spread([definevVarsPlugin], stylesPlugins, optimizePlugins, htmlPlugins));
    webpackConfig.plugins = plugins;
}
exports.transformPluginsToConfig = transformPluginsToConfig;
