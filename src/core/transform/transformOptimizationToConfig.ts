import * as webpack from 'webpack';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin'

import { BaseConfig } from 'hao-base';

export function transformOptimizationToConfig(webpackConfig: webpack.Configuration, customConfig: BaseConfig) {

  const minimizePlugins = [
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
      extractComments: true,
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
  ]

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
          priority: -40,
          name: 'commons',
          maxInitialRequests: 5,
        },
        vue: {
          test: (module) => {
            return /vue|vuex|vue-router/.test(module.context);
          },
          minChunks: 1,
          chunks: "all",
          name: 'vue-vendor',
          priority: -10,
          reuseExistingChunk: false
        },
        react: {
          test: (module) => {
            return /react|react-is|redux|react-router|react-dom|react-redux|scheduler/.test(module.context);
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
  }

}
