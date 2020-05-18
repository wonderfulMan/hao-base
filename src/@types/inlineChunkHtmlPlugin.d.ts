import webpack = require('webpack');
import HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * This Webpack plugin inlines script chunks into `index.html`.
 */
declare class InlineChunkHtmlPlugin extends webpack.Plugin {
  htmlWebpackPlugin: HtmlWebpackPlugin
  tests: ReadonlyArray<RegExp>
  constructor(htmlWebpackPlugin: HtmlWebpackPlugin, tests: ReadonlyArray<RegExp>);
}

export = InlineChunkHtmlPlugin;
