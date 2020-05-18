import * as path from 'path';

import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as hardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HtmlWebacpkPlugin from 'html-webpack-plugin';
// import * as PurgecssPlugin from 'purgecss-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import chalk from 'chalk'

import { BaseConfig, ShellArgs, EntryReturn } from 'hao-base';
import { getObjectSize, errorMessageExit } from '../../helper/check';
import { setConsoleMessageByMode } from '../../helper/plugins';
import { tsFormatter } from '../../helper/tsFormatter';
import APP_PATH from '../../helper/path';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


type DefineMap = { [key: string]: any }
/**
 * 设置全局变量到作用域
 */
export function setGlobalVarsToContext(
  webpackConfig: webpack.Configuration,
  customConfig: BaseConfig,
  shellArgs: ShellArgs
): webpack.DefinePlugin {
  // 变量map 默认全局变量（由webpack mode选项决定）
  let defineMap: DefineMap = { 'process.env': { NODE_ENV: JSON.stringify(webpackConfig.mode) } };
  // 获取用户命令行自定义变量
  const curEnv = shellArgs.curEnv
  // 读取自定义配置文件全局变量
  const customGlobalVars = customConfig.envVars
  // 判断globalVars内部是否有属性
  const hasProperty = getObjectSize(customGlobalVars)
  // 如果globalVars内部一个属性都没
  if (hasProperty && customGlobalVars) {
    // 获取内部的key和value
    let ret = Object
      .entries<any>(customGlobalVars)
      .filter(([key, value]) => {
        // 判断当前key是否和curEnv一致，决定注入对应的配置
        if (key === curEnv) return value
      })[0]
    if (ret) {
      const [_, value] = ret
      defineMap['process.env'] = {
        ...defineMap['process.env'],
        ...value
      }
    }
  }
  return new webpack.DefinePlugin(defineMap)
}
/**
 * 优化插件
 * @param webpackConfig webpack配置文件
 * @param customConfig 用户自定义配置文件
 */
export function setOptimizePlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig): Array<webpack.Plugin> {
  const optimizePlugins = []
  const ignoreFileRegs = []
  const friendlyOptions = setConsoleMessageByMode(webpackConfig)
  // 如果开启了生成样式声明文件
  if (customConfig.typescript) {
    // 添加 WatchIgnorePlugin
    ignoreFileRegs.push(
      /css\.d\.ts$/,
      /less\.d\.ts$/,
      /scss\.d\.ts$/
    )
    // 忽略文件
    optimizePlugins.push(new webpack.WatchIgnorePlugin(ignoreFileRegs))
  }
  // 如果是生产环境
  if (webpackConfig.mode === 'production') {

    optimizePlugins.push(
      // 清楚dist
      new CleanWebpackPlugin({
        verbose: true
      }),
      // 缓存插件替代cache-loader
      new hardSourceWebpackPlugin({
        cacheDirectory: path.join(APP_PATH.WORK_DIR_PATH(), '../node_modules/.cache/hard-source/[confighash]'),
        configHash: (webpackConfig) => (
          require('node-object-hash')({ sort: false }).hash(webpackConfig)
        ),
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package-lock.json', 'yarn.lock'],
        },
      }),
    )
    if (customConfig.performance) {
      // 打包分析
      optimizePlugins.push(new BundleAnalyzerPlugin())
    }
    // tree-shaking优化
    // optimizePlugins.push(new webpackDeepScopePlugin())
  }
  // 如果开发环境
  if (webpackConfig.mode === 'development') {
    // 热更新
    if (customConfig.devServer && customConfig.devServer.hot) {
      optimizePlugins.push(new webpack.HotModuleReplacementPlugin())
    }
  }

  // 添加命令行输出
  optimizePlugins.push(new FriendlyErrorsWebpackPlugin(friendlyOptions))
  // 进度打包
  optimizePlugins.push(new ProgressBarPlugin({
    format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    clear: false,
  }))

  return optimizePlugins
}
/**
 * 样式相关插件
 * @param webpackConfig webpack配置文件
 * @param customConfig 用户自定义配置文件
 */
export function setStylesPlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig, entries: EntryReturn): Array<webpack.Plugin> {
  const stylesPlugins = []
  if (!entries) {
    errorMessageExit('没有找到入口文件');
  }
  // const workPath = APP_PATH.WORK_DIR_PATH()

  stylesPlugins.push(
    new MiniCssExtractPlugin({
      filename: webpackConfig.mode! === 'development' ? '[name]/[name].css' : '[name]/[name]-[chunkhash:8].css',
      chunkFilename: webpackConfig.mode === 'development' ? '[name]/[id].chunk.css' : '[name]/[id]-[chunkhash:8].css',
    }),
    // css module 无法删除多余样式
    // new PurgecssPlugin({
    //   paths: () => glob.sync([
    //     `${workPath}/**/*.html`,
    //     `${workPath}/**/*.css`,
    //     `${workPath}/**/*.scss`,
    //     `${workPath}/**/*.sass`,
    //     `${workPath}/**/*.less`,
    //     `${workPath}/**/*.js`,
    //   ], { nodir: true }),
    //   whitelistPatterns: () => [/^purify-/]
    // })
  )

  return stylesPlugins
}
/**
 * 设置html插件
 */
export function setHtmlPlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig, entries: EntryReturn): Array<webpack.Plugin> | void {
  const htmlPlugins = []
  if (!entries) {
    errorMessageExit('没有找到入口文件');
    return
  }
  // 判断多页面还是单页面
  for (let i = 0, l = entries.length; i < l; i++) {
    htmlPlugins.push(new HtmlWebacpkPlugin({
      filename: `${entries[i].entry}/index.html`,
      template: entries[i].template,
      chunks: ['manifest', 'vue-vendor', 'react-vendor', 'other-vendor', 'commons', entries[i].entry,],
      chunksSortMode: 'manual',
      minify: webpackConfig.mode === 'production' ?
        {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : undefined
    }))
  }

  return htmlPlugins
}

export function setVueLoaderPlugin(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.Plugin | void {
  if (customConfig.frame === 'vue') {
    return new VueLoaderPlugin()
  }
}

export function setTypescirptPlugin(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.Plugin | void {
  if (customConfig.typescript) {
    return new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(process.cwd(), './tsconfig.json'),
      async: false,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      watch: APP_PATH.WORK_DIR_PATH(),
      silent: true,
      reportFiles: [
        "**"
      ],
      formatter: webpackConfig.mode === 'production' ? tsFormatter : undefined
    })
  }
}