"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var const_1 = require("../../const");
var loader_1 = require("../../helper/loader");
var read_1 = require("../../helper/read");
var path_1 = require("../../helper/path");
var babel_1 = require("../../helper/babel");
var eslint_1 = require("../../helper/eslint");
function getStyleRules(webpackConfig, customConfig) {
    var absolutePath = read_1.getDirPath('postcss.config.js');
    var postcssConfig = null;
    if (fs.existsSync(absolutePath)) {
        postcssConfig = require(absolutePath);
    }
    var cssNormalRules = {
        test: const_1.REG_TEST.styleReg.css.normal,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, false, 'css', postcssConfig)
    };
    var cssModuleRules = {
        test: const_1.REG_TEST.styleReg.css.module,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, true, 'css', postcssConfig)
    };
    var lessNormalRules = {
        test: const_1.REG_TEST.styleReg.less.normal,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, false, 'less', postcssConfig)
    };
    var lessModuleRules = {
        test: const_1.REG_TEST.styleReg.less.module,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, true, 'less', postcssConfig)
    };
    var sassNormalRules = {
        test: const_1.REG_TEST.styleReg.scss.normal,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, false, 'scss', postcssConfig)
    };
    var sassModuleRules = {
        test: const_1.REG_TEST.styleReg.scss.module,
        exclude: /node_modules/,
        use: loader_1.getStyleLoaders(webpackConfig, customConfig, true, 'scss', postcssConfig)
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
function getCommonJavascriptRule(webpackConfig, customConfig) {
    var useLoaders = [{
            loader: require.resolve('babel-loader'),
            options: babel_1.default(customConfig)
        }];
    if (customConfig.openEslint) {
        useLoaders.push({
            loader: require.resolve('eslint-loader'),
            options: eslintLoaderConfig(webpackConfig, customConfig)
        });
    }
    return {
        test: customConfig.typescript ? const_1.REG_TEST.tsReg : const_1.REG_TEST.jsReg.js,
        enforce: customConfig.openEslint ? 'pre' : undefined,
        exclude: function (file) {
            var baseExclude = /node_modules/.test(file);
            if (customConfig.frame === 'vue') {
                return baseExclude && !/\.vue\.js/.test(file);
            }
            return baseExclude;
        },
        use: useLoaders
    };
}
exports.getCommonJavascriptRule = getCommonJavascriptRule;
function getAssetsRules() {
    var fileRules = {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1000,
                    outputPath: 'images/',
                    name: '[name].[hash:8].[ext]',
                }
            },
            {
                loader: require.resolve('image-webpack-loader'),
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75
                    }
                }
            }
        ]
    };
    var fontRules = {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    name: "[name]-[hash:5].min.[ext]",
                    limit: 5000,
                    publicPath: "fonts/",
                    outputPath: "fonts/"
                }
            }
        ]
    };
    return [fileRules, fontRules];
}
exports.getAssetsRules = getAssetsRules;
function getVueRules(webpackConfig, customConfig) {
    var hotReload = customConfig.devServer
        ? (typeof customConfig.devServer.hot === 'boolean'
            ? customConfig.devServer.hot
            : true)
        : true;
    if (customConfig.frame === 'vue') {
        return {
            test: const_1.REG_TEST.vueReg,
            exclude: /node_modules/,
            use: [
                {
                    loader: require.resolve('vue-loader'),
                    options: {
                        hotReload: hotReload,
                    }
                }
            ]
        };
    }
}
exports.getVueRules = getVueRules;
function eslintLoaderConfig(webpackConfig, customConfig) {
    return {
        fix: true,
        cache: webpackConfig.mode === 'development' ? path.join(path_1.default.WORK_DIR_PATH(), '../node_modules/.cache/eslint') : false,
        failOnError: webpackConfig.mode === 'production',
        useEslintrc: false,
        formatter: require.resolve('eslint-friendly-formatter'),
        baseConfig: {
            extends: eslint_1.eslintrcConfig
        }
    };
}
exports.eslintLoaderConfig = eslintLoaderConfig;
