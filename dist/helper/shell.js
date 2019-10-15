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
            var _a = __read(args, 2), mode = _a[0], curEnv = _a[1];
            resolve({
                mode: typeof mode === 'string' ? mode : '',
                curEnv: typeof curEnv === 'string' ? curEnv : ''
            });
        });
        commander.parse(process.argv);
    });
}
exports.getShellArgs = getShellArgs;
