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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var path_1 = require("./path");
var check_1 = require("../helper/check");
function getEslintParser(customConfig) {
    var parser = 'babel-eslint';
    if (customConfig.typescript) {
        parser = '@typescript-eslint/parser';
    }
    return parser;
}
function getParserOptions(customConfig) {
    var parserOptions = __assign({ "parser": getEslintParser(customConfig), "ecmaVersion": 6, "sourceType": "module", "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        } }, (customConfig.eslintConfig && customConfig.eslintConfig.parserOptions));
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
    if (customConfig.typescript) {
        extensions.push('.ts');
    }
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
    return __assign(__assign({}, rules), (customConfig.eslintConfig && customConfig.eslintConfig.rules));
}
function getSettings(customConfig) {
    var settings = {};
    var extensions = [".js", ".jsx"];
    var alias = {};
    if (customConfig.typescript) {
        extensions.push('.ts');
    }
    if (customConfig.frame === 'react') {
        customConfig.typescript && extensions.push('.tsx');
    }
    customConfig.frame === 'vue' && extensions.push('.vue');
    if (customConfig.alias) {
        var size = check_1.getObjectSize(customConfig.alias);
        if (size) {
            Object.entries(customConfig.alias)
                .forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return (alias[key] = path.join(path_1.default.WORK_DIR_PATH(), value));
            });
        }
    }
    settings["import/resolver"] = {
        "webpack": {
            "config": {
                "resolve": {
                    extensions: extensions,
                    alias: __assign({ 'react-dom': require.resolve('@hot-loader/react-dom') }, alias)
                }
            }
        }
    };
    return __assign(__assign({}, settings), (customConfig.eslintConfig && customConfig.eslintConfig.settings));
}
function eslintrcConfig(webpackConfig, customConfig) {
    var parserOptions = getParserOptions(customConfig);
    var plugins = getPlugins(customConfig);
    var esExtends = getExtends(customConfig);
    var rules = getRules(customConfig);
    var settings = getSettings(customConfig);
    return {
        "root": (customConfig.eslintConfig && customConfig.eslintConfig.root) || true,
        "env": __assign({ "browser": true, "es6": true }, (customConfig.eslintConfig && customConfig.eslintConfig.env)),
        "globals": __assign({}, (customConfig.eslintConfig && customConfig.eslintConfig.globals)),
        "extends": esExtends,
        settings: settings,
        rules: rules,
        parserOptions: parserOptions,
        plugins: plugins,
    };
}
exports.eslintrcConfig = eslintrcConfig;
