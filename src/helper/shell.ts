/*
 * @Author: your name
 * @Date: 2019-10-12 13:24:07
 * @LastEditTime : 2020-01-05 21:59:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hao-base/src/helper/shell.ts
 */
import * as commander from 'commander'
import { ShellArgs } from 'hao-base'

export function getShellArgs(): Promise<ShellArgs> {
  return new Promise(resolve => {
    commander
      .option('--mode', '当前模式（build/dev）')
      .option('--curenv', '当前模式（build/dev）')
      .action((...args) => {
        const [mode, curEnv] = args
        resolve({
          mode: typeof mode === 'string' ? mode : '',
          curEnv: typeof curEnv === 'string' ? curEnv : ''
        })
      })
    commander.parse(process.argv)
  })
}