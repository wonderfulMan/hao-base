"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var eslintFormatter_1 = require("./eslintFormatter");
function generatorEslintOptions(webpackConfig, customConfig) {
    var eslintConfig = customConfig.eslintConfig;
    var parser = 'babel-eslint';
    var rules = {};
    var esLintExtends = ['standard'];
    var extensions = ['.js', 'jsx'];
    var plugins = [];
    if (customConfig.frame === 'vue') {
        extensions.push('.vue');
        plugins.push('vue');
    }
    if (customConfig.frame === 'react') {
        plugins.push('react');
    }
    if (customConfig.typescript) {
        extensions.push('.ts', '.tsx');
    }
    if (eslintConfig) {
        if (eslintConfig.parser) {
            parser = eslintConfig.parser;
        }
        if (eslintConfig.plugins) {
            plugins.push(eslintConfig.plugins);
        }
        if (eslintConfig.rules) {
            rules = __assign(__assign({}, rules), eslintConfig.rules);
        }
        if (eslintConfig.prettier) {
            esLintExtends = ["plugin:prettier/recommended"];
        }
        if (eslintConfig.extends) {
            esLintExtends.push(eslintConfig.extends);
        }
    }
    return {
        baseConfig: {
            root: true,
            extends: esLintExtends,
            plugins: plugins,
            rules: rules
        },
        extensions: extensions,
        formatter: eslintFormatter_1.formatter,
        useEslintrc: false,
        cache: true,
        fix: true,
        emitWarning: true,
        parserOptions: {
            parser: parser,
            ecmaVersion: 6,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
                experimentalObjectRestSpread: true
            }
        },
        envs: [
            'browser',
            'jquery',
            'node',
            'commonjs',
            'es6',
            'amd'
        ]
    };
}
exports.generatorEslintOptions = generatorEslintOptions;
