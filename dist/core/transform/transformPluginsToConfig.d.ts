import { BaseConfig, ShellArgs, EntryReturn } from "hao-base";
import * as webpack from 'webpack';
export declare function transformPluginsToConfig(webpackConfig: webpack.Configuration, customConfig: BaseConfig, shellArgs: ShellArgs, entry: EntryReturn): void;
