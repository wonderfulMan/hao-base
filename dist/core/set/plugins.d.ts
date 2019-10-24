import * as webpack from 'webpack';
import { BaseConfig, ShellArgs, EntryReturn } from 'hao-base';
export declare function setGlobalVarsToContext(webpackConfig: webpack.Configuration, customConfig: BaseConfig, shellArgs: ShellArgs): webpack.DefinePlugin;
export declare function setOptimizePlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig): Array<webpack.Plugin>;
export declare function setStylesPlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig, entries: EntryReturn): Array<webpack.Plugin>;
export declare function setHtmlPlugins(webpackConfig: webpack.Configuration, customConfig: BaseConfig, entries: EntryReturn): Array<webpack.Plugin> | void;
export declare function setVueLoaderPlugin(webpackConfig: webpack.Configuration, customConfig: BaseConfig): webpack.Plugin | void;
