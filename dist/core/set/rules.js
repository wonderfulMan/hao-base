"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("../../const");
function getStyleRules(config) {
    var rules = [];
    rules.push({
        test: const_1.REG_TEST.styleReg.css.normal,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
            },
            {
                loader: "postcss-loader"
            }
        ]
    });
    rules.push({
        test: const_1.REG_TEST.styleReg.css.module,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: '[hash:base64:6]'
                }
            },
            {
                loader: "postcss-loader"
            }
        ]
    });
    rules.push({
        test: const_1.REG_TEST.styleReg.scss.module,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            },
            {
                loader: "sass-loader"
            },
            {
                loader: "postcss-loader"
            }
        ]
    });
    rules.push({
        test: const_1.REG_TEST.styleReg.scss.module,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: '[hash:base64:6]'
                }
            },
            {
                loader: "sass-loader"
            },
            {
                loader: "postcss-loader"
            }
        ]
    });
    rules.push({
        test: const_1.REG_TEST.styleReg.less.module,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            },
            {
                loader: "less-loader"
            },
            {
                loader: "postcss-loader"
            }
        ]
    });
    rules.push({
        test: const_1.REG_TEST.styleReg.less.module,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: '[hash:base64:6]'
                }
            },
            {
                loader: "less-loader"
            },
            {
                loader: "postcss-loader"
            }
        ]
    });
}
exports.getStyleRules = getStyleRules;
function getJsRules() {
}
exports.getJsRules = getJsRules;
function getTsRules() {
}
exports.getTsRules = getTsRules;
function getAssetsRules() {
}
exports.getAssetsRules = getAssetsRules;
//# sourceMappingURL=rules.js.map