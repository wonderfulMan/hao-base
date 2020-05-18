import * as path from 'path';
import { CssLoaderOptions, BaseConfig } from 'hao-base';
import * as webpack from 'webpack';
import * as miniCssExtractPlugin from 'mini-css-extract-plugin';

import APP_PATH from '../helper/path';

// 处理样式loader
export function getStyleLoaders(
  webpackConfig: webpack.Configuration,
  customConfig: BaseConfig,
  isModules: boolean = false,
  styleType: 'less' | 'scss' | 'css' = 'css',
  postcssConfig?: any
) {
  const afterLoaders = []
  const beforeLoaders = []
  const options: CssLoaderOptions = {}
  const isProduction = webpackConfig.mode === 'production'


  // 先处理 postcss-loader sass-loader less-loader 等
  afterLoaders.push({
    loader: require.resolve('postcss-loader'),
    options: {
      plugins: [
        require('autoprefixer')()
      ],
    }
  })

  beforeLoaders.push({
    loader: require.resolve(isProduction
      ? miniCssExtractPlugin.loader
      : (customConfig.frame === 'vue'
        ? 'vue-style-loader'
        : 'style-loader')
    )
  })

  if (postcssConfig) {
    afterLoaders.push({
      loader: require.resolve('postcss-loader'),
      options: postcssConfig
    })
  }

  if (styleType === 'scss') {
    afterLoaders.push({
      loader: require.resolve('sass-loader')
    })
  }
  if (styleType === 'less') {
    afterLoaders.push({
      loader: require.resolve('less-loader')
    })
  }
  if (customConfig.styleResources &&
    customConfig.styleResources.length > 0) {
    afterLoaders.push({
      loader: require.resolve('sass-resources-loader'),
      options: {
        resources: customConfig.styleResources
          .map(filePath => path.join(APP_PATH.WORK_DIR_PATH(customConfig.workDir), filePath))
      }
    })
  }
  // 开启模块化
  if (isModules) {
    options.modules = {
      mode: 'local',
      localIdentName: 'purify-[name]-[local]-[hash:base64:5]',
      context: APP_PATH.WORK_DIR_PATH(),
      hashPrefix: 'hash',
    }
    options.localsConvention = 'camelCase'
  }
  // 是否启用sourceMap
  if (customConfig.sourceMap) {
    options.sourceMap = true
  }
  // 如果有后续loader 
  if (afterLoaders.length > 0) {
    options.importLoaders = afterLoaders.length
  }
  // 使用css类型文件
  if (isModules &&customConfig.typescript && webpackConfig.mode === 'development') {
    beforeLoaders.push(
      {
        loader: require.resolve('@teamsupercell/typings-for-css-modules-loader'),
        options: {
          formatter: "prettier"
        }
      }
    )
  }
  beforeLoaders.push({
    loader: require.resolve('css-loader'),
    options
  })
  return [...beforeLoaders, ...afterLoaders]
}