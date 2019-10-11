"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rules_1 = require("./rules");
function addEntryToConfig(config, entries) {
    if (entries) {
        var entriesConfig_1 = {};
        entries.forEach(function (item) {
            entriesConfig_1[item.entry] = item.path;
        });
        config.entry = entriesConfig_1;
    }
}
exports.addEntryToConfig = addEntryToConfig;
function addOutputToConfig(config) {
    config.output = {
        filename: function (payload) {
            return "js/[name].[contenthash].js";
        }
    };
}
exports.addOutputToConfig = addOutputToConfig;
function addRulesToConfig(config) {
    rules_1.getStyleRules(config);
}
exports.addRulesToConfig = addRulesToConfig;
function addPluginsToConfig(config) {
}
exports.addPluginsToConfig = addPluginsToConfig;
//# sourceMappingURL=config.js.map