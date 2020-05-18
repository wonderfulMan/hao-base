import * as fs from 'fs';
import * as path from 'path'
import * as webpack from 'webpack';

import { BaseConfig } from 'hao-base';
import { REG_TEST } from '../../const';
import { getStyleLoaders } from '../../helper/loader';
import { getDirPath } from '../../helper/read';
import APP_PATH from '../../helper/path'
import generatorBabelConfig from '../../helper/babel';
import { eslintrcConfig } from '../../helper/eslint';
/**
 * 全部rules配置
 */
export function getStyleRules(webpackConfig: webpack.Configuration, customConfig: BaseConfig): Array<webpack.RuleSetRule> {

  // 读取postcssconfig
  const absolutePath = getDirPath('postcss.config.js')
  let postcssConfig = null

  if (fs.existsSync(absolutePath)) {
    postcssConfig = require(absolutePath)
  }

  const cssNormalRules = {
    test: REG_TEST.styleReg.css.normal,
    use: getStyleLoaders(webpackConfig, customConfig, false, 'css', postcssConfig)
  }
  const cssModuleRules = {
    test: REG_TEST.styleReg.css.module,
    use: getStyleLoaders(webpackConfig, customConfig, true, 'css', postcssConfig)
  }
  const lessNormalRules = {
    test: REG_TEST.styleReg.less.normal,
    use: getStyleLoaders(webpackConfig, customConfig, false, 'less', postcssConfig)
  }
  const lessModuleRules = {
    test: REG_TEST.styleReg.less.module,
    use: getStyleLoaders(webpackConfig, customConfig, true, 'less', postcssConfig)
  }
  const sassNormalRules = {
    test: REG_TEST.styleReg.scss.normal,
    use: getStyleLoaders(webpackConfig, customConfig, false, 'scss', postcssConfig)
  }
  const sassModuleRules = {
    test: REG_TEST.styleReg.scss.module,
    use: getStyleLoaders(webpackConfig, customConfig, true, 'scss', postcssConfig)
  }
  return [
    cssNormalRules,
    lessNormalRules,
    sassNormalRules,
    cssModuleRules,
    lessModuleRules,
    sassModuleRules
  ]
}
/**
 * 通用js文件配置
 */
export function getCommonJavascriptRule(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.RuleSetRule {

  // loader判断
  const useLoaders: webpack.Rule['use'] = [{
    loader: require.resolve('babel-loader'),
    options: generatorBabelConfig(customConfig)
  }]
  // 判断是否开启eslint
  if (customConfig.openEslint) {
    useLoaders.push(
      {
        loader: require.resolve('eslint-loader'),
        options: eslintLoaderConfig(webpackConfig, customConfig)
      }
    )
  }
  // 读取用户自定义babel配置
  return {
    test: customConfig.typescript ? REG_TEST.tsReg : REG_TEST.jsReg.js,
    enforce: customConfig.openEslint ? 'pre' : undefined,
    exclude: file => {
      const baseExclude = /node_modules/.test(file)
      if (customConfig.frame === 'vue') {
        return baseExclude && !/\.vue\.js/.test(file)
      }
      return baseExclude
    },
    use: useLoaders
  }
}

export function getAssetsRules(): Array<webpack.RuleSetRule> {
  const fileRules = {
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
            quality: 65 // 压缩率
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
  }
  const fontRules = {
    test: /\.(eot|woff2?|ttf|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          name: "[name]-[hash:5].min.[ext]",
          limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
          publicPath: "fonts/",
          outputPath: "fonts/"
        }
      }
    ]
  }
  return [fileRules, fontRules]
}

export function getVueRules(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.RuleSetRule | void {

  const hotReload = customConfig.devServer
    ? (
      typeof customConfig.devServer.hot === 'boolean'
        ? customConfig.devServer.hot
        : true
    )
    : true

  if (customConfig.frame === 'vue') {
    return {
      test: REG_TEST.vueReg,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('vue-loader'),
          options: {
            hotReload,
          }
        }
      ]
    }
  }
}

export function eslintLoaderConfig(webpackConfig: webpack.Configuration, customConfig: BaseConfig) {
  return {
    fix: true,
    cache: webpackConfig.mode === 'development' ? path.join(APP_PATH.WORK_DIR_PATH(), '../node_modules/.cache/eslint') : false,
    failOnError: webpackConfig.mode === 'production',
    useEslintrc: false,
    formatter: require.resolve('eslint-friendly-formatter'),
    baseConfig: {
      ...eslintrcConfig(webpackConfig, customConfig)
    }
  }
}
