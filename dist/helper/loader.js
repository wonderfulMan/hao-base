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
function getStyleLoaders(webpackConfig, customConfig, isModules, styleType, postcssConfig) {
    if (isModules === void 0) { isModules = false; }
    if (styleType === void 0) { styleType = 'css'; }
    var afterLoaders = [];
    var beforeLoaders = [];
    var options = {};
    var isProduction = webpackConfig.mode === 'production';
    afterLoaders.push({
        loader: require.resolve('postcss-loader'),
        options: {
            plugins: [
                require('autoprefixer')()
            ],
        }
    });
    beforeLoaders.push({
        loader: require.resolve(isProduction
            ? miniCssExtractPlugin.loader
            : (customConfig.frame === 'vue'
                ? 'vue-style-loader'
                : 'style-loader'))
    });
    if (postcssConfig) {
        afterLoaders.push({
            loader: require.resolve('postcss-loader'),
            options: postcssConfig
        });
    }
    if (styleType === 'scss') {
        afterLoaders.push({
            loader: require.resolve('sass-loader')
        });
    }
    if (styleType === 'less') {
        afterLoaders.push({
            loader: require.resolve('less-loader')
        });
    }
    if (customConfig.styleResources &&
        customConfig.styleResources.length > 0) {
        afterLoaders.push({
            loader: require.resolve('sass-resource-loader'),
            options: {
                resources: customConfig.styleResources
                    .map(function (filePath) { return path.join(path_1.default.WORK_DIR_PATH(customConfig.workDir), filePath); })
            }
        });
    }
    if (isModules) {
        options.modules = {
            mode: 'local',
            localIdentName: 'purify-[name]-[local]-[hash:base64:5]',
            context: path_1.default.WORK_DIR_PATH(),
            hashPrefix: 'hash'
        };
        options.localsConvention = 'camelCase';
    }
    if (customConfig.sourceMap) {
        options.sourceMap = true;
    }
    if (afterLoaders.length > 0) {
        options.importLoaders = afterLoaders.length;
    }
    if (customConfig.typescript && webpackConfig.mode === 'development') {
        beforeLoaders.push({
            loader: require.resolve('@teamsupercell/typings-for-css-modules-loader'),
            options: {
                formatter: "prettier"
            }
        });
    }
    beforeLoaders.push({
        loader: require.resolve('css-loader'),
        options: options
    });
    return __spread(beforeLoaders, afterLoaders);
}
exports.getStyleLoaders = getStyleLoaders;
