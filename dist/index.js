"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var check_1 = require("./helper/check");
function compilerConfig(config) {
    var errorMessage = check_1.checkOptions(config);
    if (errorMessage) {
        console.error("\u001B[31m%s\u001B[39m", errorMessage);
        process.exit(0);
        return undefined;
    }
    core_1.default(config);
}
exports.default = compilerConfig;
//# sourceMappingURL=index.js.map