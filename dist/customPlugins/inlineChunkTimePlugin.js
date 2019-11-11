'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var InlineChunkHtmlPlugin = (function () {
    function InlineChunkHtmlPlugin(htmlWebpackPlugin, tests) {
        this.htmlWebpackPlugin = htmlWebpackPlugin;
        this.tests = tests;
    }
    InlineChunkHtmlPlugin.prototype.getInlinedTag = function (publicPath, assets, tag) {
        if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
            return tag;
        }
        var scriptName = tag.attributes.src.replace(publicPath, '');
        if (!this.tests.some(function (test) { return scriptName.match(test); })) {
            return tag;
        }
        var asset = assets[scriptName];
        if (asset == null) {
            return tag;
        }
        return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
    };
    InlineChunkHtmlPlugin.prototype.apply = function (compiler) {
        var _this = this;
        var publicPath = compiler.options.output.publicPath;
        if (!publicPath.endsWith('/')) {
            publicPath += '/';
        }
        compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', function (compilation) {
            var tagFunction = function (tag) {
                return _this.getInlinedTag(publicPath, compilation.assets, tag);
            };
            var hooks = _this.htmlWebpackPlugin.getHooks(compilation);
            hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', function (assets) {
                assets.headTags = assets.headTags.map(tagFunction);
                assets.bodyTags = assets.bodyTags.map(tagFunction);
            });
        });
    };
    return InlineChunkHtmlPlugin;
}());
module.exports = InlineChunkHtmlPlugin;
