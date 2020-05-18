import * as path from 'path'
import { BaseConfig } from "hao-base"
import * as webpack from 'webpack'
import { getObjectSize } from "../../helper/check"
import APP_PATH from "../../helper/path"

export function transformResolveToConfig(
  webpackConfig: webpack.Configuration,
  customConfig: BaseConfig,
): void {

  const alias: webpack.Resolve['alias'] = {}
  const extensions: webpack.Resolve['extensions'] = ['.js', '.jsx']

  if (customConfig.typescript) {
    extensions.push('.ts')
  }

  if (customConfig.frame === 'react') {
    alias['react-dom'] = require.resolve('@hot-loader/react-dom')
    alias['react-is'] = require.resolve('react-is')
    if (customConfig.typescript) {
      extensions.push('.tsx')
    }
  }

  if (customConfig.frame === 'vue') {
    alias['vue$'] = require.resolve('vue/dist/vue.esm.js')
    extensions.push('.vue')
  }

  if (customConfig.alias) {
    const size = getObjectSize(customConfig.alias)
    if (size) {
      Object.entries(customConfig.alias)
        .forEach(([key, value]) => (alias[key] = path.join(APP_PATH.WORK_DIR_PATH(), value)))
    }
  }
  webpackConfig.resolve = {
    alias,
    extensions
  }

}