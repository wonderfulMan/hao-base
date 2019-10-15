"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var APP_PATH = {
    BUIL_DIR_PATH: path.join(process.cwd(), 'dist'),
    WORK_DIR_PATH: function (dir) {
        if (dir === void 0) { dir = 'src'; }
        return path.join(process.cwd(), dir);
    }
};
exports.default = APP_PATH;
