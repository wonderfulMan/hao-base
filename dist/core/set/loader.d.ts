import * as webpack from 'webpack';
import { BaseConfig } from 'hao-base';
export declare function getStyleRules(webpackConfig: webpack.Configuration, customConfig: BaseConfig): Array<webpack.RuleSetRule>;
export declare function getCommonJavascriptRule(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.RuleSetRule;
export declare function getTsRules(): void;
export declare function getAssetsRules(): void;
export declare function getVueRules(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.RuleSetRule | void;
