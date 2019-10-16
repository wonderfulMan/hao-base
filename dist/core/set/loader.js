"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("../../const");
var loader_1 = require("../../helper/loader");
var babel_1 = require("../../helper/babel");
function getStyleRules(webpackConfig, customConfig) {
    var cssNormalRules = {
        test: const_1.REG_TEST.styleReg.css.normal,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, false, 'css')
    };
    var cssModuleRules = {
        test: const_1.REG_TEST.styleReg.css.module,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, true, 'css')
    };
    var lessNormalRules = {
        test: const_1.REG_TEST.styleReg.less.normal,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, false, 'less')
    };
    var lessModuleRules = {
        test: const_1.REG_TEST.styleReg.less.module,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, true, 'less')
    };
    var sassNormalRules = {
        test: const_1.REG_TEST.styleReg.scss.normal,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, false, 'scss')
    };
    var sassModuleRules = {
        test: const_1.REG_TEST.styleReg.scss.module,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, true, 'scss')
    };
    return [
        cssNormalRules,
        lessNormalRules,
        sassNormalRules,
        cssModuleRules,
        lessModuleRules,
        sassModuleRules
    ];
}
exports.getStyleRules = getStyleRules;
function getCommonJavascriptRule(webpackConfig) {
    return {
        test: const_1.REG_TEST.jsReg.js,
        exclude: /node_modules/,
        use: [
            {
                loader: require.resolve('babel-loader'),
                options: babel_1.default
            }
        ]
    };
}
exports.getCommonJavascriptRule = getCommonJavascriptRule;
function getTsRules() {
}
exports.getTsRules = getTsRules;
function getAssetsRules() {
}
exports.getAssetsRules = getAssetsRules;
