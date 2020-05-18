import { ShellArgs } from "hao-base"
import * as webpack from 'webpack'

import { getShellArgs } from "../../helper/shell"
import { MODE } from "../../const"

/**
 * 添加 当前模式到webpack配置
 * @param config 配置对象
 */
export async function transformModeToConfig(config: webpack.Configuration): Promise<ShellArgs> {
  // 获取命令行输入mode
  const args = await getShellArgs()
  const value = args.mode === MODE.BUILD ? 'production' : 'development'
  config.mode = value
  return args
}