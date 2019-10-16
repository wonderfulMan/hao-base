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
var webpack = require("webpack");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var hardSourceWebpackPlugin = require("hard-source-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var check_1 = require("../../helper/check");
var plugins_1 = require("../../helper/plugins");
var path_1 = require("../../helper/path");
function setGlobalVarsToContext(webpackConfig, customConfig, shellArgs) {
    var defineMap = { 'process.env': { NODE_ENV: JSON.stringify(webpackConfig.mode) } };
    var curEnv = shellArgs.curEnv;
    var customGlobalVars = customConfig.globalVars;
    var hasProperty = check_1.getObjectSize(customGlobalVars);
    if (hasProperty && customGlobalVars) {
        var ret = Object
            .entries(customGlobalVars)
            .filter(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (key === curEnv)
                return value;
        })[0];
        if (ret) {
            var _a = __read(ret, 2), _ = _a[0], value = _a[1];
            defineMap['process.env'] = __assign(__assign({}, defineMap['process.env']), value);
        }
    }
    return new webpack.DefinePlugin(defineMap);
}
exports.setGlobalVarsToContext = setGlobalVarsToContext;
function setOptimizePlugins(webpackConfig, customConfig) {
    var optimizePlugins = [];
    var ignoreFileRegs = [];
    var friendlyOptions = plugins_1.setConsoleMessageByMode(webpackConfig);
    if (customConfig.useCssType) {
        ignoreFileRegs.push(/css\.d\.ts$/, /less\.d\.ts$/, /scss\.d\.ts$/);
        optimizePlugins.push(new webpack.WatchIgnorePlugin(ignoreFileRegs));
    }
    optimizePlugins.push(new FriendlyErrorsWebpackPlugin(friendlyOptions));
    if (webpackConfig.mode === 'production') {
        optimizePlugins.push(new clean_webpack_plugin_1.CleanWebpackPlugin({
            verbose: true
        }));
        optimizePlugins.push(new hardSourceWebpackPlugin({
            cacheDirectory: path.join(path_1.default.WORK_DIR_PATH(), '../node_modules/.cache/hard-source/[confighash]'),
            configHash: function (webpackConfig) {
                return require('node-object-hash')({ sort: false }).hash(webpackConfig);
            },
            environmentHash: {
                root: process.cwd(),
                directories: [],
                files: ['package-lock.json', 'yarn.lock'],
            },
        }));
    }
    return optimizePlugins;
}
exports.setOptimizePlugins = setOptimizePlugins;
function setStylesPlugins(webpackConfig, customConfig) {
    var stylesPlugins = [];
    if (webpackConfig.mode === 'production') {
        stylesPlugins.push(new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: {
                safe: true,
                autoprefixer: { disable: true },
                mergeLonghand: false,
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }));
    }
    stylesPlugins.push(new MiniCssExtractPlugin({
        filename: webpackConfig.mode === 'development' ? 'css/[name].css' : 'css/[name].[chunkhash:8].css',
        chunkFilename: webpackConfig.mode === 'development' ? 'css/[id].chunk.css' : 'css/[id].[chunkhash:8].css',
    }));
    return stylesPlugins;
}
exports.setStylesPlugins = setStylesPlugins;
function setHtmlPluguns(webpackConfig, customConfig) {
}
exports.setHtmlPluguns = setHtmlPluguns;
