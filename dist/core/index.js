"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var index_1 = require("./entry/index");
var env_1 = require("../helper/env");
var config_1 = require("./config");
function buildCompiler(config) {
    var compiler = webpack(config);
    console.log(config);
    compiler.run(function (err, stats) {
        return false;
    });
}
function core(config) {
    var entry = index_1.getEntry(config);
    var webpackConfig = {};
    env_1.setEnv(config.env);
    config_1.addEntryToConfig(webpackConfig, entry);
    config_1.addOutputToConfig(webpackConfig);
    config_1.addPluginsToConfig(webpackConfig);
    config_1.addRulesToConfig(webpackConfig);
    buildCompiler(webpackConfig);
}
exports.default = core;
//# sourceMappingURL=index.js.map