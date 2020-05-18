/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * fork facebook inline-chunk-html-plugin
 */
'use strict';
import * as HtmlWebacpkPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';

class InlineChunkHtmlPlugin {

  htmlWebpackPlugin: HtmlWebacpkPlugin
  tests: ReadonlyArray<RegExp>

  constructor(htmlWebpackPlugin: HtmlWebacpkPlugin, tests: ReadonlyArray<RegExp>) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.tests = tests;
  }

  getInlinedTag(publicPath: string, assets: any, tag: any) {
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return tag;
    }
    const scriptName = tag.attributes.src.replace(publicPath, '');
    if (!this.tests.some(test => scriptName.match(test))) {
      return tag;
    }
    const asset = assets[scriptName];
    if (asset == null) {
      return tag;
    }
    return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
  }

  apply(compiler: any) {
    let publicPath = compiler.options.output.publicPath;
    if (!publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', (compilation: webpack.compilation.Compilation) => {
      const tagFunction = (tag: any) =>
        this.getInlinedTag(publicPath, compilation.assets, tag);

       // @ts-ignore 
      const hooks = this.htmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', (assets: any) => {
        assets.headTags = assets.headTags.map(tagFunction);
        assets.bodyTags = assets.bodyTags.map(tagFunction);
      });

      // Still emit the runtime chunk for users who do not use our generated
      // index.html file.
      // hooks.afterEmit.tap('InlineChunkHtmlPlugin', () => {
      //   Object.keys(compilation.assets).forEach(assetName => {
      //     if (this.tests.some(test => assetName.match(test))) {
      //       delete compilation.assets[assetName];
      //     }
      //   });
      // });
    });
  }
}

module.exports = InlineChunkHtmlPlugin;
