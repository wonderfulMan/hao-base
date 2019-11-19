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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var check_1 = require("../../helper/check");
var path_1 = require("../../helper/path");
function transformResolveToConfig(webpackConfig, customConfig) {
    var alias = {};
    var extensions = ['.js', '.jsx'];
    if (customConfig.typescript) {
        extensions.push('.ts');
    }
    if (customConfig.frame === 'react') {
        alias['react-dom'] = require.resolve('@hot-loader/react-dom');
        if (customConfig.typescript) {
            extensions.push('.tsx');
        }
    }
    if (customConfig.frame === 'vue') {
        alias['vue$'] = require.resolve('vue/dist/vue.esm.js');
        extensions.push('.vue');
    }
    if (customConfig.alias) {
        var size = check_1.getObjectSize(customConfig.alias);
        if (size) {
            Object.entries(customConfig.alias)
                .forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return (alias[key] = path.join(path_1.default.WORK_DIR_PATH(), value));
            });
        }
    }
    webpackConfig.resolve = {
        alias: alias,
        extensions: extensions
    };
}
exports.transformResolveToConfig = transformResolveToConfig;
