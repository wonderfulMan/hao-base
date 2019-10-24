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
var index_1 = require("./../const/index");
var path = require("path");
var fs = require("fs");
var const_1 = require("../const");
var check_1 = require("../helper/check");
function getDirPath() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return path.join.apply(path, __spread([process.cwd()], args));
}
exports.getDirPath = getDirPath;
function getAssignDir(assign) {
    try {
        var all = fs.readdirSync(assign);
        return all.length > 0 ? all : undefined;
    }
    catch (error) {
        check_1.errorMessageExit(['工作目录不存在，请设置', error]);
        return undefined;
    }
}
exports.getAssignDir = getAssignDir;
function hasDirExist(assign, exist) {
    var dirPath = getDirPath(assign);
    var all = getAssignDir(dirPath);
    return all
        ? all.some(function (it) { return hasDir(path.join(dirPath, it)) && it === exist; })
        : false;
}
exports.hasDirExist = hasDirExist;
function readMutilDirByAssignDir(assign, exist) {
    var dirPath = getDirPath(assign, exist);
    var all = getAssignDir(dirPath);
    if (all && all.length > 0) {
        var paths = all.filter(function (it) { return hasDir(path.join(dirPath, it)); });
        if (!paths.length) {
            check_1.errorMessageExit(assign + "\u76EE\u5F55\u4E0B\u6CA1\u6709\u591A\u9875\u9762\u5BF9\u5E94\u5B50\u76EE\u5F55\u5165\u53E3");
        }
        var files = getEntryFileByAssignPath(paths, dirPath);
        return files;
    }
    else {
        return undefined;
    }
}
exports.readMutilDirByAssignDir = readMutilDirByAssignDir;
function readSingleDirByAssignDir(assign) {
    var dirPath = getDirPath(assign);
    var all = getAssignDir(dirPath);
    if (all && all.length) {
        var ret = getEntryFileBySingle(all, dirPath);
        ret && !ret.length && check_1.errorMessageExit(assign + "\u76EE\u5F55\u4E0B\u6CA1\u6709\u627E\u5230\u5165\u53E3\u6587\u4EF6\u8BF7\u68C0\u67E5\uFF08index.js/index.jsx/index.ts/index.tsx\uFF09");
        return ret;
    }
    else {
        check_1.errorMessageExit(assign + "\u76EE\u5F55\u4E0B\u6CA1\u6709\u627E\u5230\u5165\u53E3\u6587\u4EF6\u8BF7\u68C0\u67E5\uFF08index.js/index.jsx/index.ts/index.tsx\uFF09");
    }
}
exports.readSingleDirByAssignDir = readSingleDirByAssignDir;
function hasDir(path) {
    try {
        return fs.lstatSync(path).isDirectory();
    }
    catch (error) {
        check_1.errorMessageExit('目录是否存在异常');
        return false;
    }
}
function getEntryFileByAssignPath(paths, assign) {
    var result = [];
    for (var i = 0, l = paths.length; i < l; i++) {
        var ph = paths[i];
        var dirPath = path.join(assign, ph);
        var file = getAssignDir(dirPath);
        if (file && file.length > 0) {
            var ret = file.filter(function (it) { return const_1.ENTRY_FILE_STAT.includes(it); })[0];
            var template = file.filter(function (it) { return index_1.HTML_PLUGIN_TPL.includes(it); })[0];
            if (!ret)
                check_1.errorMessageExit(ph + "\u76EE\u5F55\u4E0B\u6CA1\u6709\u627E\u5230\u5165\u53E3\u6587\u4EF6\u8BF7\u68C0\u67E5\uFF08" + const_1.ENTRY_FILE_STAT.map(function (it) { return it; }).join('/') + "\uFF09");
            if (!template)
                check_1.errorMessageExit(ph + "\u76EE\u5F55\u4E0B\u6CA1\u6709\u627E\u5230\u5165\u53E3\u6A21\u7248\u6587\u4EF6\u8BF7\u68C0\u67E5\uFF08" + index_1.HTML_PLUGIN_TPL.map(function (it) { return it; }).join('/') + "\uFF09");
            result.push({
                file: ret,
                path: path.join(dirPath, ret),
                dir: ph,
                template: path.join(dirPath, template),
                dirPath: dirPath,
                entry: ph
            });
        }
        else {
            check_1.errorMessageExit(ph + "\u76EE\u5F55\u4E0B\u6CA1\u6709\u5165\u53E3\u6587\u4EF6");
        }
    }
    for (var index = 0, l = result.length; index < l; index++) {
        var cur = result[index];
        var next = result[index + 1] || '';
        if (next) {
            if (cur.dir === next.dir) {
                check_1.errorMessageExit(cur.dir + "\u76EE\u5F55\u4E0B\u53EA\u80FD\u6709\u4E00\u4E2A\u5165\u53E3\u6587\u4EF6");
            }
        }
    }
    return result;
}
function getEntryFileBySingle(paths, assign) {
    var result = [];
    for (var i = 0, l = paths.length; i < l; i++) {
        var ph = paths[i];
        var filePath = path.join(assign, ph);
        var isDir = hasDir(filePath);
        if (!isDir && const_1.ENTRY_FILE_STAT.includes(ph)) {
            result.push({
                file: ph,
                path: filePath,
                dir: '',
                dirPath: assign,
                entry: 'main'
            });
        }
    }
    if (result.length > 1) {
        var logName = result
            .map(function (it) { return it.file; })
            .join(',');
        check_1.errorMessageExit("\u76EE\u5F55\u4E0B\u53EA\u80FD\u6709\u4E00\u4E2A\u5165\u53E3\u6587\u4EF6\uFF0C\u5F53\u524D\u68C0\u67E5\u5230" + logName);
    }
    var template = paths.filter(function (it) { return index_1.HTML_PLUGIN_TPL.includes(it); })[0];
    if (!template)
        check_1.errorMessageExit("\u76EE\u5F55\u4E0B\u6CA1\u6709\u627E\u5230\u5165\u53E3\u6A21\u7248\u6587\u4EF6\u8BF7\u68C0\u67E5\uFF08" + index_1.HTML_PLUGIN_TPL.map(function (it) { return it; }).join('/') + "\uFF09");
    result[0].template = path.join(result[0].dirPath, template);
    return result;
}
