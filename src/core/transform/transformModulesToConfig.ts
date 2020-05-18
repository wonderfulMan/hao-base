
import * as webpack from 'webpack'

import { BaseConfig } from 'hao-base';
import {
  getStyleRules,
  getVueRules,
  getCommonJavascriptRule,
  getAssetsRules
} from "../set/loader";

/**
 * 添加 规则到webpack 配置
 * @param config 配置对象
 */
export function transformModulesToConfig(webpackConfig: webpack.Configuration, customConfig: BaseConfig): void {

  const rules: Array<webpack.RuleSetRule> = []
  const commonJavascriptRule = getCommonJavascriptRule(webpackConfig, customConfig)
  const styleRule = getStyleRules(webpackConfig, customConfig)
  const vueRules = getVueRules(webpackConfig, customConfig)
  const assetesRules = getAssetsRules()
  const parseRules = { parser: { requireEnsure: false } }

  vueRules && rules.push(vueRules)
  
  rules.push(
    parseRules,
    commonJavascriptRule,
    ...styleRule,
    ...assetesRules
  )

  webpackConfig.module = {
    strictExportPresence: true,
    rules
  }
}