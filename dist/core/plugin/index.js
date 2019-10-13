"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var check_1 = require("../../helper/check");
function setGlobalVarsToContext(webpackConfig, customConfig, shellArgs) {
    var defineMap = { 'process.env': { NODE_ENV: JSON.stringify(webpackConfig.mode) } };
    var curEnv = shellArgs.curEnv;
    var customGlobalVars = customConfig.globalVars;
    var hasProperty = check_1.getObjectSize(customGlobalVars);
    if (hasProperty && customGlobalVars) {
        var ret = Object
            .entries(customGlobalVars)
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            if (key === curEnv)
                return value;
        })[0];
        if (ret) {
            var _ = ret[0], value = ret[1];
            defineMap['process.env'] = __assign(__assign({}, defineMap['process.env']), value);
        }
    }
    return new webpack.DefinePlugin(defineMap);
}
exports.setGlobalVarsToContext = setGlobalVarsToContext;
function setCleanDirByBuild(webpackConfig, customConfig, shellArgs) {
    if (shellArgs.mode === 'build') {
        return new clean_webpack_plugin_1.CleanWebpackPlugin();
    }
}
exports.setCleanDirByBuild = setCleanDirByBuild;
//# sourceMappingURL=index.js.map