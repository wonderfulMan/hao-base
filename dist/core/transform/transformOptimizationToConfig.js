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
        minimizer: webpackConfig.mode === 'production' ? minimizePlugins : []
    };
}
exports.transformOptimizationToConfig = transformOptimizationToConfig;
