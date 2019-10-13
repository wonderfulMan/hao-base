"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
function getShellArgs() {
    return new Promise(function (resolve) {
        commander
            .option('--mode', '当前模式（build/dev）')
            .option('--curenv', '当前模式（build/dev）')
            .action(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var mode = args[0], curEnv = args[1];
            resolve({
                mode: typeof mode === 'string' ? mode : '',
                curEnv: typeof curEnv === 'string' ? curEnv : ''
            });
        });
        commander.parse(process.argv);
    });
}
exports.getShellArgs = getShellArgs;
//# sourceMappingURL=shell.js.map