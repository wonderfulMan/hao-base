import * as path from "path"
import { CLIEngine, Linter } from 'eslint'
import * as webpack from 'webpack'
import { BaseConfig } from 'hao-base'

import APP_PATH from './path'
import { getObjectSize } from '../helper/check'

// 获取eslint解析器
function getEslintParser(customConfig: BaseConfig) {
  let parser = 'babel-eslint'
  // 如果为typescirpt
  if (customConfig.typescript) {
    parser = '@typescript-eslint/parser'
  }
  return parser
}
// 获取解析器配置
function getParserOptions(customConfig: BaseConfig) {

  const parserOptions = {
    "parser": getEslintParser(customConfig),
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    },
    ...(customConfig.eslintConfig && customConfig.eslintConfig.parserOptions)
  }

  return parserOptions
}
// 获取eslint插件
function getPlugins(customConfig: BaseConfig) {
  const plugins = []
  if (customConfig.frame === 'vue') {
    plugins.push('vue')
  }
  if (customConfig.frame === 'react') {
    plugins.push('react')
  }
  if (customConfig.typescript) {
    plugins.push("@typescript-eslint")
  }
  plugins.push('prettier')
  return plugins
}
// 获取继承
function getExtends(customConfig: BaseConfig) {
  const eslintExtends = ["airbnb"]
  if (customConfig.frame === 'react') {
    eslintExtends.push("airbnb/hooks", "prettier/react", "plugin:react/recommended")
  }
  if (customConfig.frame === 'vue') {
    eslintExtends.push("plugin:vue/essential")
  }
  if (customConfig.typescript) {
    eslintExtends.push("plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint")
  }
  eslintExtends.push("plugin:prettier/recommended")
  return eslintExtends
}
// 获取规则
function getRules(customConfig: BaseConfig) {
  const rules: { [key: string]: any } = {}
  const extensions = [".js", ".jsx"]
  if (customConfig.typescript) {
    extensions.push('.ts')
  }
  if (customConfig.frame === 'react') {
    customConfig.typescript && extensions.push('.tsx')
  }
  customConfig.frame === 'vue' && extensions.push('.vue')
  // 如果为typescript,允许函数表达式
  if (customConfig.typescript) {
    rules["@typescript-eslint/explicit-function-return-type"] = [
      "warn",
      {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true
      }
    ]
  }
  rules["react/jsx-filename-extension"] = ["warn", { extensions }]
  rules["import/extensions"] = ["warn", { extensions }]
  // 依赖获取/cli的形式很多以来是内部npm包同时也包含用户自定义的包
  rules["import/no-extraneous-dependencies"] = [
    "error",
    {
      "packageDir": [path.resolve(__dirname, '../../'), path.join(APP_PATH.WORK_DIR_PATH(), '../')]
    }
  ]
  return {
    ...rules,
    ...(customConfig.eslintConfig && customConfig.eslintConfig.rules)
  }
}
// 获取设置
function getSettings(customConfig: BaseConfig) {
  const settings: { [key: string]: any } = {}
  const extensions = [".js", ".jsx"]
  const alias: webpack.Resolve['alias'] = {}

  if (customConfig.typescript) {
    extensions.push('.ts')
  }
  if (customConfig.frame === 'react') {
    customConfig.typescript && extensions.push('.tsx')
  }
  customConfig.frame === 'vue' && extensions.push('.vue')

  if (customConfig.alias) {
    const size = getObjectSize(customConfig.alias)
    if (size) {
      Object.entries(customConfig.alias)
        .forEach(([key, value]) => (alias[key] = path.join(APP_PATH.WORK_DIR_PATH(), value)))
    }
  }

  // 导入模块省略扩展名
  settings["import/resolver"] = {
    "webpack": {
      "config": {
        "resolve": {
          extensions,
          alias: {
            'react-dom': require.resolve('@hot-loader/react-dom'),
            ...alias
          }
        }
      }
    }
  }
  return {
    ...settings,
    ...(customConfig.eslintConfig && customConfig.eslintConfig.settings)
  }
}
// 输出eslint配置文件
export function eslintrcConfig(webpackConfig: webpack.Configuration, customConfig: BaseConfig): CLIEngine.Options['baseConfig'] {

  const parserOptions = getParserOptions(customConfig)
  const plugins = getPlugins(customConfig)
  const esExtends = getExtends(customConfig)
  const rules = getRules(customConfig)
  const settings = getSettings(customConfig)
  return {
    "root": (customConfig.eslintConfig && customConfig.eslintConfig.root) || true,
    "env": {
      "browser": true,
      "es6": true,
      ...(customConfig.eslintConfig && customConfig.eslintConfig.env)
    },
    "globals": {
      ...(customConfig.eslintConfig && customConfig.eslintConfig.globals)
    },
    "extends": esExtends,
    settings,
    rules,
    parserOptions,
    plugins,
  }
}
