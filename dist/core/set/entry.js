"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var read_1 = require("../../helper/read");
function mutil(config) {
    var hasExist = read_1.hasDirExist(config.workDir, config.mutilDir);
    if (!hasExist) {
        console.error("\u001B[31m%s\u001B[39m", '不存在多页面模式父入口文件夹,请检查mutilDir选项！');
        process.exit(0);
        return undefined;
    }
    var mutil = read_1.readMutilDirByAssignDir(config.workDir, config.mutilDir);
    if (!mutil) {
        console.error("\u001B[31m%s\u001B[39m", config.mutilDir + "\u76EE\u5F55\u4E0B\u6CA1\u6709\u4EFB\u4F55\u591A\u9875\u9762\u5165\u53E3\u6587\u4EF6\u5939");
        process.exit(0);
        return undefined;
    }
    return mutil;
}
function single(config) {
    return read_1.readSingleDirByAssignDir(config.workDir);
}
function getEntry(config) {
    var isMulti = config.mutilDir;
    return (!!isMulti || isMulti === ''
        ? mutil(config) : single(config));
}
exports.getEntry = getEntry;
