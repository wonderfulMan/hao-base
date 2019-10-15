"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformEntryToConfig(config, entries) {
    if (entries) {
        var entriesConfig_1 = {};
        entries.forEach(function (item) {
            entriesConfig_1[item.entry] = item.path;
        });
        config.entry = entriesConfig_1;
    }
}
exports.transformEntryToConfig = transformEntryToConfig;
