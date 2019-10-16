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
Object.defineProperty(exports, "__esModule", { value: true });
var shell_1 = require("./shell");
function checkOptions(config) {
    return __awaiter(this, void 0, void 0, function () {
        var args, isPlain;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, shell_1.getShellArgs()];
                case 1:
                    args = _a.sent();
                    if (!args.mode) {
                        return [2, '请设置当前mode命令行选项(build or dev)例如(Hbase --mode build or Hbase --mode dev)'];
                    }
                    if (args.mode !== "build" && args.mode !== "dev") {
                        return [2, 'mode选项只能为build or dev'];
                    }
                    if (!config.workDir) {
                        return [2, '请设置工作目录'];
                    }
                    isPlain = isPlainObject(config.globalVars);
                    if (config.globalVars && !isPlain) {
                        return [2, 'globalVars选项必须为一个简单对象'];
                    }
                    return [2];
            }
        });
    });
}
exports.checkOptions = checkOptions;
function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
}
exports.isPlainObject = isPlainObject;
function getObjectSize(obj) {
    var count = 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}
exports.getObjectSize = getObjectSize;
function errorMessageExit(message, color) {
    if (color === void 0) { color = "\u001B[31m%s\u001B[39m"; }
    console.error(color, Array.isArray(message) ? message.map(function (it) { return it; }) : message);
    process.exit(0);
    return undefined;
}
exports.errorMessageExit = errorMessageExit;
