"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
function setEnvironmentVars(envObject) {
    var defineObj = {};
    for (var prop in envObject) {
        defineObj["process.env[" + prop] = JSON.stringify(envObject[prop]);
    }
    return new webpack.DefinePlugin(defineObj);
}
//# sourceMappingURL=env.js.map