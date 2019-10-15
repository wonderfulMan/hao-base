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
var path = require("path");
var miniCssExtractPlugin = require("mini-css-extract-plugin");
var path_1 = require("../helper/path");
function getStyleLoaders(webpackConfig, customConfig, isModules, styleType) {
    if (isModules === void 0) { isModules = false; }
    if (styleType === void 0) { styleType = 'css'; }
    var loaders = [];
    var beforeLoaders = [];
    var options = {};
    var isProduction = webpackConfig.mode === 'production';
    beforeLoaders.push({
        loader: 'postcss-loader',
    });
    if (styleType === 'scss') {
        beforeLoaders.push({
            loader: 'sass-loader'
        });
    }
    if (styleType === 'less') {
        beforeLoaders.push({
            loader: 'less-loader'
        });
    }
    if (customConfig.styleResources &&
        customConfig.styleResources.length > 0) {
        beforeLoaders.push({
            loader: 'sass-resource-loader',
            options: {
                resources: customConfig.styleResources
                    .map(function (filePath) { return path.join(path_1.default.WORK_DIR_PATH(customConfig.workDir), filePath); })
            }
        });
    }
    if (isModules) {
        options.modules = true;
        options.localIdentName = '[name]---[local]---[hash:base64:5]';
        options.camelCase = true;
    }
    if (isProduction) {
        options.minimize = true;
    }
    if (customConfig.useCssType) {
        options.namedExport = true;
    }
    if (customConfig.sourceMap) {
        options.sourceMap = true;
    }
    if (beforeLoaders.length > 0) {
        options.importLoaders = beforeLoaders.length;
    }
    loaders.push.apply(loaders, __spread([isProduction ? miniCssExtractPlugin.loader : 'style-loader',
        {
            loader: customConfig.useCssType ? 'typings-for-css-modules-loader' : 'css-loader',
            options: options
        }], beforeLoaders));
    return loaders;
}
exports.getStyleLoaders = getStyleLoaders;
