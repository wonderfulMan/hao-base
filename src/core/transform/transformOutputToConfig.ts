/*
 * @Author: your name
 * @Date: 2019-10-14 10:12:00
 * @LastEditTime : 2020-01-07 15:03:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hao-base/src/core/transform/transformOutputToConfig.ts
 */
import * as webpack from 'webpack'
import APP_PATH from "../../helper/path"
import { BaseConfig } from 'hao-base'
/**
 * 添加 出口到webpack 配置
 * @param config 配置对象
 */
export function transformOutputToConfig(webpackConfig: webpack.Configuration, customConfig: BaseConfig): void {

  const selectHashType = webpackConfig.mode === 'development' ? 'hash' : 'contenthash'

  webpackConfig.output = {
    path: APP_PATH.BUIL_DIR_PATH,
    filename: `[name]/app-[${selectHashType}:8].bundle.js`,
    chunkFilename: `[name]/[name]-chunk-[${selectHashType}:8].bundle.js`,
    pathinfo: webpackConfig.mode === 'development',
    library: customConfig.output?.library,
    libraryTarget: customConfig.output?.libraryTarget,
    publicPath: customConfig.output?.publicPath || webpackConfig.mode === 'development' ? '/' : '../'
  }



}