"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var loader_1 = require("../set/loader");
function transformModulesToConfig(webpackConfig, customConfig) {
    var rules = [];
    var commonJavascriptRule = loader_1.getCommonJavascriptRule(webpackConfig);
    var styleRule = loader_1.getStyleRules(webpackConfig, customConfig);
    rules.push({ oneOf: __spread([commonJavascriptRule], styleRule) });
    webpackConfig.module = { rules: rules };
}
exports.transformModulesToConfig = transformModulesToConfig;
