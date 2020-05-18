import { HTML_PLUGIN_TPL } from './../const/index';
import * as path from 'path';
import * as fs from 'fs';
import { ResultChild, EntryResult, EntryReturn } from 'hao-base';
import { COLORS, ENTRY_FILE_STAT } from '../const';
import { errorMessageExit } from '../helper/check';

/**
 * 根据多个路径合并路径
 * @param args 多个路径
 */
export function getDirPath(...args: string[]): string {
  return path.join(process.cwd(), ...args);
}

/**
 * 读取指定目录下的所有文件
 * @param assign 指定目录
 */
export function getAssignDir(assign: string): Array<string> | void {
  try {
    const all = fs.readdirSync(assign)
    return all.length > 0 ? all : undefined
  } catch (error) {
    errorMessageExit(['工作目录不存在，请设置', error])
    return undefined
  }
}
/**
 * 判断指定目录下是否有指定的目录
 * @param assign 指定目录
 * @param exist 存在assign的内部目录
 */
export function hasDirExist(assign: string, exist: string): boolean {
  const dirPath = getDirPath(assign)
  const all = getAssignDir(dirPath)
  return all
    ? all.some(it => hasDir(path.join(dirPath, it)) && it === exist)
    : false
}

/**
 * 读取指定目录下的入口目录(多页面)
 * @param assign 指定入口目录
 * @param multi 是否多页面
 */
export function readMutilDirByAssignDir(assign: string, exist: string): EntryReturn {
  const dirPath = getDirPath(assign, exist)
  const all = getAssignDir(dirPath)
  if (all && all.length > 0) {
    const paths = all.filter(it => hasDir(path.join(dirPath, it)))
    if (!paths.length) {
      errorMessageExit(`${assign}目录下没有多页面对应子目录入口`)
    }
    const files = getEntryFileByAssignPath(paths, dirPath)
    return files
  } else {
    return undefined
  }
}
/**
 * 单入口读取入口文件
 * @param assign 指定目录
 */
export function readSingleDirByAssignDir(assign: string): EntryReturn {
  const dirPath = getDirPath(assign)
  const all = getAssignDir(dirPath)
  if (all && all.length) {
    const ret = getEntryFileBySingle(all, dirPath)
    ret && !ret.length && errorMessageExit(`${assign}目录下没有找到入口文件请检查（index.js/index.jsx/index.ts/index.tsx）`)
    return ret
  } else {
    errorMessageExit(`${assign}目录下没有找到入口文件请检查（index.js/index.jsx/index.ts/index.tsx）`)
  }
}
/**
 * 判断当前子路径是否为一个目录
 * @param path 子路径
 */
function hasDir(path: string): boolean {
  try {
    return fs.lstatSync(path).isDirectory()
  } catch (error) {
    errorMessageExit('目录是否存在异常')
    return false
  }
}

/**
 * 获取多个路径下的入口文件，入口文件暂定为index.js/index.ts
 * @param paths 多个路径
 */
function getEntryFileByAssignPath(paths: Array<string>, assign: string): EntryReturn {
  const result: EntryResult = []
  for (let i = 0, l = paths.length; i < l; i++) {
    const ph = paths[i]
    const dirPath = path.join(assign, ph)
    const file = getAssignDir(dirPath)
    if (file && file.length > 0) {
      const ret = file.filter(it => ENTRY_FILE_STAT.includes(it))[0]
      const template = file.filter(it => HTML_PLUGIN_TPL.includes(it))[0]
      if (!ret) errorMessageExit(`${ph}目录下没有找到入口文件请检查（${ENTRY_FILE_STAT.map(it => it).join('/')}）`)
      if (!template) errorMessageExit(`${ph}目录下没有找到入口模版文件请检查（${HTML_PLUGIN_TPL.map(it => it).join('/')}）`)

      result.push({
        file: ret,
        path: path.join(dirPath, ret),
        dir: ph,
        template: path.join(dirPath, template),
        dirPath,
        entry: ph
      })
    } else {
      errorMessageExit(`${ph}目录下没有入口文件`)
    }
  }
  for (let index = 0, l = result.length; index < l; index++) {
    const cur = result[index];
    const next = result[index + 1] || '';
    if (next) {
      if (cur.dir === next.dir) {
        errorMessageExit(`${cur.dir}目录下只能有一个入口文件`)
      }
    }
  }
  return result
}

/**
 * 获取多个路径下的入口文件，入口文件暂定为index.js/index.ts 单入口试用
 * @param paths 多个路径
 */
function getEntryFileBySingle(paths: Array<string>, assign: string): EntryReturn {
  let result: EntryReturn = []
  for (let i = 0, l = paths.length; i < l; i++) {
    const ph = paths[i]
    const filePath = path.join(assign, ph)
    const isDir = hasDir(filePath)
    if (!isDir && ENTRY_FILE_STAT.includes(ph)) {
      result.push({
        file: ph,
        path: filePath,
        dir: '',
        dirPath: assign,
        entry: 'main'
      })
    }
  }
  if (result.length > 1) {
    const logName = result
      .map(it => it.file)
      .join(',')
    errorMessageExit(`目录下只能有一个入口文件，当前检查到${logName}`)
  }

  const template = paths.filter(it => HTML_PLUGIN_TPL.includes(it))[0]
  if (!template) errorMessageExit(`目录下没有找到入口模版文件请检查（${HTML_PLUGIN_TPL.map(it => it).join('/')}）`)
  result[0].template = path.join(result[0].dirPath, template)

  return result
}