import * as webpack from 'webpack';
import { BaseConfig, ShellArgs } from 'hao-base';
export declare function setGlobalVarsToContext(webpackConfig: webpack.Configuration, customConfig: BaseConfig, shellArgs: ShellArgs): webpack.DefinePlugin;
export declare function setOptimizePlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig): Array<webpack.Plugin>;
export declare function setStylesPlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig): Array<webpack.Plugin>;
export declare function setHtmlPluguns(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.Plugin | void;
