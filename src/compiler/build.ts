import * as webpack from 'webpack';
import SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

import { COLORS } from '../const';

export function build(webpackConfig: webpack.Configuration) {
  const smp = new SpeedMeasureWebpackPlugin()
  const smpConfig = smp.wrap(webpackConfig)
  const compiler = webpack(smpConfig)

  // console.log(JSON.stringify(webpackConfig))
  compiler.run((err, stats) => {
    if (err === null) {
      console.log(COLORS.green, '构建完成')
    }
    return false
  })
}