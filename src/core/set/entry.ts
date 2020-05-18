import { BaseConfig, EntryReturn } from 'hao-base';

import {
  hasDirExist,
  readMutilDirByAssignDir,
  readSingleDirByAssignDir
} from '../../helper/read';
import { COLORS } from '../../const';

//  入口处理
function mutil(config: BaseConfig): EntryReturn {
  // 判断多页面父文件夹是否存在
  const hasExist = hasDirExist(config.workDir!, config.mutilDir!)
  if (!hasExist) {
    console.error(COLORS.red, '不存在多页面模式父入口文件夹,请检查mutilDir选项！')
    process.exit(0)
    return undefined
  }
  // 读取每个多页面入口文件
  const mutil = readMutilDirByAssignDir(config.workDir!, config.mutilDir!)
  if (!mutil) {
    console.error(COLORS.red, `${config.mutilDir}目录下没有任何多页面入口文件夹`)
    process.exit(0)
    return undefined
  }
  return mutil
}
//  单页面入口处理
function single(config: BaseConfig): EntryReturn {
  // 判断工作目录内是否有入口文件
  return readSingleDirByAssignDir(config.workDir!)
}

// 获取入口配置
export function getEntry(config: BaseConfig) {
  // 判断当前为单页面/多页面模式
  const isMulti = config.mutilDir
  // 如果为多页面判断当前多页面父目录是否存在
  return (
    !!isMulti || isMulti === ''
      ? mutil(config) : single(config)
  )
}
