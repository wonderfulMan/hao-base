import { BaseConfig } from 'hao-base';
import * as fs from 'fs';
import { getDirPath } from "./read"

const absPath = getDirPath('babel.config.js')

const generatorBabelConfig = (customConfig: BaseConfig) => {

  const baseConfig = {
    "cacheDirectory": true,
    "babelrc": false,
    "extends": fs.existsSync(absPath) ? absPath : undefined,
    "presets": [
      [
        require.resolve("@babel/preset-env"),
        {
          "useBuiltIns": "usage",
          "modules": false,
          "corejs": 3
        }
      ]
    ],
    "plugins": [
      require.resolve("@babel/plugin-transform-runtime"),
      require.resolve("@babel/plugin-syntax-dynamic-import")
    ]
  }

  if (customConfig.frame === 'react') {
    baseConfig.presets.push([require.resolve('@babel/preset-react')])
    baseConfig.plugins.push(require.resolve('react-hot-loader/babel'))
  }

  if (customConfig.typescript) {
    baseConfig.presets.push([require.resolve('@babel/preset-typescript')])
    baseConfig.plugins.push(require.resolve('@babel/plugin-transform-typescript'))
  }
  
  return baseConfig
}

export default generatorBabelConfig