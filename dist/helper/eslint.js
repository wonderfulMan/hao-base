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
function getEslintParser(customConfig) {
    var parser = 'babel-eslint';
    if (customConfig.eslintConfig.parser) {
        parser = customConfig.eslintConfig.parser;
    }
    if (customConfig.typescript) {
        parser = '@typescript-eslint/parser';
    }
    return parser;
}
function getParserOptions(customConfig) {
    var ecmaVersion = customConfig.eslintConfig.parserOptions.ecmaVersion;
    var parserOptions = {
        "parser": getEslintParser(customConfig),
        "ecmaVersion": ecmaVersion || '6',
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    };
    return parserOptions;
}
function getPlugins(customConfig) {
    var plugins = [];
    if (customConfig.frame === 'vue') {
        plugins.push('vue');
    }
    if (customConfig.frame === 'react') {
        plugins.push('react');
    }
    if (customConfig.typescript) {
        plugins.push("@typescript-eslint");
    }
    plugins.push('prettier');
    return plugins;
}
function getExtends(customConfig) {
    var eslintExtends = ["airbnb"];
    if (customConfig.frame === 'react') {
        eslintExtends.push("airbnb/hooks", "prettier/react", "plugin:react/recommended");
    }
    if (customConfig.frame === 'vue') {
        eslintExtends.push("plugin:vue/essential");
    }
    if (customConfig.typescript) {
        eslintExtends.push("plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint");
    }
    eslintExtends.push("plugin:prettier/recommended");
    return eslintExtends;
}
function eslintrcConfig(webpackConfig, customConfig) {
    var parserOptions = getParserOptions(customConfig);
    var plugins = getPlugins(customConfig);
    var esExtends = getExtends(customConfig);
    return {
        "root": customConfig.eslintConfig.root || true,
        "env": __assign({ "browser": true, "es6": true }, customConfig.eslintConfig.env),
        "rules": __assign({}, customConfig.eslintConfig.rules),
        "globals": __assign({}, customConfig.eslintConfig.globals),
        "settings": __assign({}, customConfig.eslintConfig.settings),
        "extends": esExtends,
        parserOptions: parserOptions,
        plugins: plugins,
    };
}
exports.eslintrcConfig = eslintrcConfig;
