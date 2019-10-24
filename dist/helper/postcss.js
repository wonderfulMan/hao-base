"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultPostcssConfig = {
    plugins: [
        require('autoprefixer')
    ]
};
function generatorPostcssConfig(config) {
    return function (postcss) {
        var customPostcssConfig = config(postcss);
        defaultPostcssConfig;
    };
}
exports.generatorPostcssConfig = generatorPostcssConfig;
