import webpack = require('webpack');
import { BaseConfig } from 'hao-base';
import { getEntry } from './set/entry';
import {
  transformEntryToConfig,
  transformModeToConfig,
  transformOutputToConfig,
  transformPluginsToConfig,
  transformModulesToConfig,
  transformOptimizationToConfig,
  transformResolveToConfig,
  transformExtensionsToConfig,
  transformDevTools
} from './transform';
import { compiler } from '../compiler';

async function core(customConfig: BaseConfig): Promise<void> {
  // 获取入口文件
  const entry = getEntry(customConfig);
  // webpack配置
  const webpackConfig: webpack.Configuration = {}
  // 设置环境变量并设置
  const shellArgs = await transformModeToConfig(webpackConfig)
  // 添加 入口
  transformEntryToConfig(webpackConfig, entry)
  // 添加 出口
  transformOutputToConfig(webpackConfig, customConfig)
  // 添加 plugin
  transformPluginsToConfig(webpackConfig, customConfig, shellArgs, entry)
  // 添加 modules
  transformModulesToConfig(webpackConfig, customConfig)
  // 性能优化
  transformOptimizationToConfig(webpackConfig, customConfig)
  // 添加resolve
  transformResolveToConfig(webpackConfig, customConfig)
  // 添加extensions
  transformExtensionsToConfig(webpackConfig, customConfig)
  // 添加devTools
  transformDevTools(webpackConfig)
  // 打包编译
  compiler(webpackConfig, customConfig)
}

export default core