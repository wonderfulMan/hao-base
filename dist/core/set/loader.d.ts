import { BaseConfig } from 'hao-base';
import * as webpack from 'webpack';
export declare function getStyleRules(webpackConfig: webpack.Configuration, customConfig: BaseConfig): Array<webpack.RuleSetRule>;
export declare function getCommonJavascriptRule(webpackConfig: webpack.Configuration): webpack.RuleSetRule;
export declare function getTsRules(): void;
export declare function getAssetsRules(): void;
