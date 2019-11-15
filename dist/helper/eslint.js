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
var path = require("path");
var path_1 = require("./path");
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
    var eslintConfig = customConfig.eslintConfig.parserOptions;
    var parserOptions = {
        "parser": getEslintParser(customConfig),
        "ecmaVersion": eslintConfig ? eslintConfig.ecmaVersion : '6',
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
function getRules(customConfig) {
    var rules = {};
    var extensions = [".js", ".jsx"];
    if (customConfig.frame === 'react') {
        customConfig.typescript && extensions.push('.tsx');
    }
    customConfig.frame === 'vue' && extensions.push('.vue');
    if (customConfig.typescript) {
        rules["@typescript-eslint/explicit-function-return-type"] = [
            "warn",
            {
                "allowExpressions": true,
                "allowTypedFunctionExpressions": true
            }
        ];
    }
    rules["react/jsx-filename-extension"] = ["warn", { extensions: extensions }];
    rules["import/no-extraneous-dependencies"] = [
        "error",
        {
            "packageDir": [path.resolve(__dirname, '../../'), path.join(path_1.default.WORK_DIR_PATH(), '../')]
        }
    ];
    return __assign(__assign({}, rules), customConfig.eslintConfig.rules);
}
function getSettings(customConfig) {
    var settings = {};
    var extensions = [".js", ".jsx"];
    if (customConfig.frame === 'react') {
        customConfig.typescript && extensions.push('.tsx');
    }
    customConfig.frame === 'vue' && extensions.push('.vue');
    settings["import/resolver"] = {
        "webpack": {
            "config": {
                "resolve": {
                    extensions: extensions,
                    alias: {
                        'react-dom': require.resolve('@hot-loader/react-dom')
                    }
                }
            }
        }
    };
    return __assign(__assign({}, settings), customConfig.eslintConfig.settings);
}
function eslintrcConfig(webpackConfig, customConfig) {
    var parserOptions = getParserOptions(customConfig);
    var plugins = getPlugins(customConfig);
    var esExtends = getExtends(customConfig);
    var rules = getRules(customConfig);
    var settings = getSettings(customConfig);
    return {
        "root": customConfig.eslintConfig.root || true,
        "env": __assign({ "browser": true, "es6": true }, customConfig.eslintConfig.env),
        "globals": __assign({}, customConfig.eslintConfig.globals),
        "extends": esExtends,
        settings: settings,
        rules: rules,
        parserOptions: parserOptions,
        plugins: plugins,
    };
}
exports.eslintrcConfig = eslintrcConfig;
