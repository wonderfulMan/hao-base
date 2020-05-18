
import * as webpack from 'webpack'

export function transformDevTools(webpackConfig: webpack.Configuration): void {

  webpackConfig.devtool = webpackConfig.mode === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map'

}