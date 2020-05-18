/*
 * @Author: your name
 * @Date: 2019-10-15 23:52:27
 * @LastEditTime : 2020-01-05 23:59:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hao-base/src/compiler/server.ts
 */
import * as Path from 'path';
import * as os from 'os';
import * as address from 'address';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server'
import { BaseConfig } from 'hao-base';
import APP_PATH from '../helper/path';


function autoGetHost() {
  let needHost = address.ip();
  if (needHost) {
    if (
      /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
        needHost
      )) {
        needHost = needHost
    } else {
      needHost = 'localhost'
    }
  }

  return needHost;
}

export function server(webpackConfig: webpack.Configuration, customConfig: BaseConfig) {
  const host = autoGetHost()
  const devServerConfig: WebpackDevServer.Configuration = {
    host,
    port: customConfig.devServer!.port || 8080,
    open: true,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    compress: true,
    clientLogLevel: 'none',
    watchContentBase: true,
    hotOnly: true,
    hot: webpackConfig.mode === 'development',
    quiet: true,
    contentBase: APP_PATH.BUIL_DIR_PATH,
    ...customConfig.devServer
  }
  // 单独处理publicPath
  devServerConfig.publicPath = `http://${devServerConfig.host}:${devServerConfig.port}/`

  const devServer = new WebpackDevServer(
    webpack(webpackConfig),
    devServerConfig
  )
  devServer.listen(devServerConfig.port!, devServerConfig.host!, (error) => {
    if (error) {
      return console.log(error);
    }
    ;['SIGINT', 'SIGTERM'].forEach((signal: NodeJS.Signals | string) => {
      process.on((signal as NodeJS.Signals), () => {
        devServer.close(() => {
          process.exit(0)
        })
      })
    })
  })
}