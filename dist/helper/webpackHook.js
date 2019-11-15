"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var tsFormatter_1 = require("./tsFormatter");
var formatWebpackMessages_1 = require("./formatWebpackMessages");
var isInteractive = process.stdout.isTTY;
function clearConsole() {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
}
function typescriptByWebpackDevServer(customConfig, compiler, devSocket) {
    var _this = this;
    var isFirstCompile = true;
    var tsMessagesPromise;
    var tsMessagesResolver;
    if (customConfig.typescript) {
        compiler.hooks.beforeCompile.tap('beforeCompile', function () {
            tsMessagesPromise = new Promise(function (resolve) {
                tsMessagesResolver = function (msgs) { return resolve(msgs); };
            });
        });
        ForkTsCheckerWebpackPlugin
            .getCompilerHooks(compiler)
            .receive.tap('afterTypeScriptCheck', function (diagnostics, lints) {
            var allMsgs = __spread(diagnostics, lints);
            var format = function (message) {
                return message.file + "\n" + tsFormatter_1.tsFormatter(message, true);
            };
            tsMessagesResolver({
                errors: allMsgs.filter(function (msg) { return msg.severity === 'error'; }).map(format),
                warnings: allMsgs
                    .filter(function (msg) { return msg.severity === 'warning'; })
                    .map(format),
            });
        });
    }
    compiler.hooks.done.tap('done', function (stats) { return __awaiter(_this, void 0, void 0, function () {
        var statsData, delayedMsg, messages_1, messages, isSuccessful;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (isInteractive) {
                        clearConsole();
                    }
                    statsData = stats.toJson({
                        all: false,
                        warnings: true,
                        errors: true,
                    });
                    if (!(customConfig.typescript && statsData.errors.length === 0)) return [3, 2];
                    delayedMsg = setTimeout(function () {
                        console.log('正在检查typescirpt类型');
                    }, 100);
                    return [4, tsMessagesPromise];
                case 1:
                    messages_1 = _e.sent();
                    clearTimeout(delayedMsg);
                    (_a = statsData.errors).push.apply(_a, __spread(messages_1.errors));
                    (_b = statsData.warnings).push.apply(_b, __spread(messages_1.warnings));
                    (_c = stats.compilation.errors).push.apply(_c, __spread(messages_1.errors));
                    (_d = stats.compilation.warnings).push.apply(_d, __spread(messages_1.warnings));
                    if (messages_1.errors.length > 0) {
                        devSocket.errors(messages_1.errors);
                    }
                    else if (messages_1.warnings.length > 0) {
                        devSocket.warnings(messages_1.warnings);
                    }
                    if (isInteractive) {
                        clearConsole();
                    }
                    _e.label = 2;
                case 2:
                    messages = formatWebpackMessages_1.formatWebpackMessages(statsData);
                    isSuccessful = !messages.errors.length && !messages.warnings.length;
                    if (isSuccessful) {
                        console.log('编译成功');
                    }
                    isFirstCompile = false;
                    if (messages.errors.length) {
                        if (messages.errors.length > 1) {
                            messages.errors.length = 1;
                        }
                        console.log('Failed to compile');
                        console.log(messages.errors.join('\n\n'));
                        return [2];
                    }
                    if (messages.warnings.length) {
                    }
                    return [2];
            }
        });
    }); });
    var isSmokeTest = process.argv.some(function (arg) { return arg.indexOf('--smoke-test') > -1; });
    if (isSmokeTest) {
        compiler.hooks.failed.tap('smokeTest', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, tsMessagesPromise];
                    case 1:
                        _a.sent();
                        process.exit(1);
                        return [2];
                }
            });
        }); });
        compiler.hooks.done.tap('smokeTest', function (stats) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, tsMessagesPromise];
                    case 1:
                        _a.sent();
                        if (stats.hasErrors() || stats.hasWarnings()) {
                            process.exit(1);
                        }
                        else {
                            process.exit(0);
                        }
                        return [2];
                }
            });
        }); });
    }
    return compiler;
}
exports.typescriptByWebpackDevServer = typescriptByWebpackDevServer;
