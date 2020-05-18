/*
 * @Author: your name
 * @Date: 2019-10-10 16:23:25
 * @LastEditTime : 2020-01-05 22:28:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hao-base/src/helper/check.ts
 */
import { BaseConfig } from 'hao-base';
import { getShellArgs } from './shell';
import { MODE, COLORS } from '../const';
// 检验部分基本选项
export async function checkOptions(config: BaseConfig): Promise<string | void> {
  const args = await getShellArgs()
  if (!args.mode) {
    return '请设置当前mode命令行选项(build or dev)例如(Hbase --mode build or Hbase --mode dev)'
  }
  if (args.mode !== MODE.BUILD && args.mode !== MODE.DEV) {
    return 'mode选项只能为build or dev'
  }
  // 工作目录检查
  if (!config.workDir) {
    return '请设置工作目录'
  }
  // 检查环境参数
  const isPlain = isPlainObject(config.envVars)
  if (config.envVars && !isPlain) {
    return 'globalVars选项必须为一个简单对象'
  }
}
// 检验简单对象
export function isPlainObject(obj: any) {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
// 检验对象是否为含有属性
export function getObjectSize(obj: any) {
  let count = 0
  for (let property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      count++;
    }
  }
  return count
}
// 读取文件错误提示
export function errorMessageExit(message: string[] | string, color: COLORS = COLORS.red ) {
  console.error(color, Array.isArray(message) ? message.map(it => it)  : message)
  process.exit(0);
  return undefined
}