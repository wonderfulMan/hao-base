import { BaseConfig, ShellArgs, EntryReturn } from "hao-base"
import * as webpack from 'webpack'
import {
  setGlobalVarsToContext,
  setOptimizePlugins,
  setStylesPlugins,
  setHtmlPlugins,
  setVueLoaderPlugin,
  setTypescirptPlugin
} from "../set/plugins"
/**
 * 添加 插件到webpack 配置
 * @param config 配置对象
 */
export function transformPluginsToConfig(
  webpackConfig: webpack.Configuration, 
  customConfig: BaseConfig, 
  shellArgs: ShellArgs,
  entry: EntryReturn
): void {

  const plugins = []

  const definevVarsPlugin = setGlobalVarsToContext(webpackConfig, customConfig, shellArgs)
  const optimizePlugins = setOptimizePlugins(webpackConfig, customConfig)
  const stylesPlugins = setStylesPlugins(webpackConfig, customConfig, entry)
  const htmlPlugins = setHtmlPlugins(webpackConfig, customConfig, entry)
  const vueLoaderPlugin = setVueLoaderPlugin(webpackConfig, customConfig)
  const typescriptPlugin = setTypescirptPlugin(webpackConfig, customConfig)

  plugins.push(
    definevVarsPlugin, 
    ...stylesPlugins, 
    ...optimizePlugins,
    ...htmlPlugins,
  )

  vueLoaderPlugin && plugins.push(vueLoaderPlugin)
  typescriptPlugin && plugins.push(typescriptPlugin)

  webpackConfig.plugins = plugins
  
}