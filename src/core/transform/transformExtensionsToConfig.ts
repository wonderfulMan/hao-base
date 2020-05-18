import { BaseConfig } from "hao-base"
import * as webpack from 'webpack'
import { getObjectSize } from "../../helper/check"

export function transformExtensionsToConfig(
  webpackConfig: webpack.Configuration,
  customConfig: BaseConfig,
): void {

  const externals = customConfig.globalVaras

  if (externals && getObjectSize(externals)) {
    webpackConfig.externals = externals
  }

}