"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTRY_FILE_STAT = ['index.js', 'index.ts', 'index.tsx', 'index.jsx'];
exports.HTML_PLUGIN_TPL = ['index.html'];
exports.OUT_PUT_PATH = 'dist';
exports.REG_TEST = {
    styleReg: {
        css: {
            normal: /^(?!.*\.module).*\.css/,
            module: /^(.*\.module).*\.css/
        },
        less: {
            normal: /^(?!.*\.module).*\.less/,
            module: /^(.*\.module).*\.less/
        },
        scss: {
            normal: /^(?!.*\.module).*\.(scss|sass)/,
            module: /^(.*\.module).*\.(scss|sass)/
        }
    },
    jsReg: {
        js: /\.(js|jsx)?$/,
        json: /\.json?$/
    },
    tsReg: /\.(j|t)sx?$/,
    asseteReg: {
        image: /\.(bmp|gif|jpe?g|png)/,
        font: /\.(eot|woff2?|ttf|svg)$/
    },
    vueReg: /\.vue$/
};
