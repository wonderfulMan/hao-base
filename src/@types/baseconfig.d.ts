/*
 * @Author: your name
 * @Date: 2019-10-05 23:17:04
 * @LastEditTime : 2020-01-07 14:59:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hao-base/src/@types/baseconfig.d.ts
 */
declare module 'hao-base' {

  import { LibraryTarget } from 'webpack'
  import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
  import * as eslint from 'eslint';

  type eslintConfigOptions = eslint.Linter.Config

  interface BaseConfig {
    frame?: 'vue' | 'react' | undefined,
    workDir?: string,  // 当前目录
    mutilDir?: string, // 多页面父入口目录
    envVars?: { [key: string]: string } // 环境变量对象
    typescript?: boolean // 是否启用 css文件生成声明文件
    styleResources?: [] // 全局style变量注入 (如果含有该选项并且选项长达大于1，进行全局注入)
    styleSourceMap?: boolean // 是否启用样式sourceMap
    fileSourceMap?: boolean // 是否启用 js/ts的sourceMap
    sourceMap?: boolean // 是否开启 全部的sourcemap
    devServer?: WebpackDevServerConfiguration // devServer配置
    alias?: { [key: string]: string }, // 别名
    performance?: boolean, // 是否启用打包分析
    globalVaras?: { [key: string]: string }, // 全局变量注入
    inlineRuningTimeChunk?: boolean // 是否开启runingtime行内模式
    openEslint?: boolean // 是否开启eslint配置
    eslintConfig?: eslintConfigOptions,
    output?: {
      publicPath?: string // 打包时的路径
      library?: string,
      libraryTarget?: LibraryTarget
    }
  }

  type ResultChild = { path: string, dirPath: string, file: string, dir: string, entry: string, template?: string }
  type EntryResult = Array<ResultChild>
  type EntryReturn = Array<ResultChild> | undefined


  type EntriesConfig = {
    [key: string]: string
  }

  type ShellArgs = {
    mode?: string,
    curEnv?: string
  }

  type CssLoaderOptions = {
    localIdentName?: string,
    modules?: any,
    sourceMap?: boolean,
    importLoaders?: number,
    localsConvention?: string
  }
}
