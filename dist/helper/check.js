"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkOptions(config) {
    if (!config.workDir) {
        return '请设置工作目录';
    }
    var isPlain = isPlainObject(config.env);
    if (!isPlain) {
        return 'env选项必须为一个简单对象';
    }
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
//# sourceMappingURL=check.js.map