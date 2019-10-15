"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rules_1 = require("../set/rules");
function transformModulesToConfig(webpackConfig) {
    rules_1.getStyleRules(webpackConfig);
}
exports.transformModulesToConfig = transformModulesToConfig;
