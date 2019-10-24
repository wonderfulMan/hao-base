"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var TerserPlugin = require("terser-webpack-plugin");
function transformOptimizationToConfig(webpackConfig, customConfig) {
    var minimizePlugins = [
        new OptimizeCssAssetsPlugin({
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
        }),
        new TerserPlugin({
            terserOptions: {
                parse: {
                    ecma: 8,
                },
                compress: {
                    warnings: false,
                    comparisons: false,
                    inline: 2,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                },
            },
            parallel: true,
            cache: true,
            sourceMap: customConfig.fileSourceMap,
        }),
    ];
    webpackConfig.optimization = {
        usedExports: true,
        minimize: true,
        minimizer: webpackConfig.mode === 'production' ? minimizePlugins : [],
        runtimeChunk: {
            name: 'manifest'
        },
        namedModules: true,
        namedChunks: true,
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "all",
                    minChunks: 2,
                    name: 'commons/commons',
                    maxInitialRequests: 5,
                },
                vue: {
                    test: function (module) {
                        return /vue|vuex|vue-router/.test(module.context);
                    },
                    minChunks: 1,
                    chunks: "all",
                    name: 'vue-vendor',
                    priority: -10,
                    reuseExistingChunk: false
                },
                react: {
                    test: function (module) {
                        return /react|redux|react-router|react-dom|react-redux|scheduler/.test(module.context);
                    },
                    minChunks: 1,
                    chunks: "all",
                    name: 'react-vendor',
                    priority: -20,
                    reuseExistingChunk: false
                },
                otherVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: -30,
                    name: 'other-vendor',
                }
            }
        }
    };
}
exports.transformOptimizationToConfig = transformOptimizationToConfig;
