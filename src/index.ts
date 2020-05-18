/*
 * @Author: your name
 * @Date: 2019-10-05 22:06:35
 * @LastEditTime : 2020-01-05 22:28:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hao-base/src/index.ts
 */
import { BaseConfig } from 'hao-base';
import core from './core';
import { checkOptions } from './helper/check';
import { COLORS } from './const';

async function parseConfig (config: BaseConfig) {

  if (!config) {
    config = {}
    config.workDir = 'src'
  }

  // 检查入口选项
  const errorMessage = await checkOptions(config);
  if (errorMessage) {
    console.error(COLORS.red, errorMessage)
    process.exit(0)
    return undefined
  }
  core(config)
}

export default parseConfig