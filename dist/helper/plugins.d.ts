import * as webpack from 'webpack';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
export declare function setConsoleMessageByMode(webpackConfig: webpack.Configuration): FriendlyErrorsWebpackPlugin.Options;
export declare function setCompilerInfoToWindow(webpackConfig: webpack.Configuration): void;
