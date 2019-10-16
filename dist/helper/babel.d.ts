declare const babelConfig: {
    "cacheDirectory": boolean;
    "babelrc": boolean;
    "presets": (string | {
        "useBuiltIns": string;
        "modules": boolean;
        "corejs": number;
    })[][];
    "plugins": string[];
};
export default babelConfig;
