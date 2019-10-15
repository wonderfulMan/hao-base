#!/usr/bin/env node
const fs = require('fs')
const parseConfig = require('../dist/index.js').default
try {
  const file = `${process.cwd()}/haoBase.js`
  fs.accessSync(file)
  parseConfig(require(file))
} catch(e) {
  // 无配置 单页面编译（区分ts/js）
  parseConfig()
}