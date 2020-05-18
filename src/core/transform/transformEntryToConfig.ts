import { EntriesConfig, EntryReturn } from "hao-base"
import * as webpack from 'webpack'

/**
 * 添加 入口到webpack 配置
 * @param config 配置对象
 * @param entries 入口文件 
 */
export function transformEntryToConfig(config: webpack.Configuration, entries: EntryReturn): void {
  if (entries) {
    const entriesConfig: webpack.Entry = {}
    entries.forEach(item => {
      entriesConfig[`${item.entry}`] = item.path
    })
    config.entry = entriesConfig
  }
}