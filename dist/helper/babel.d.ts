declare const generatorBabelConfig: (frame: "vue" | "react" | undefined) => {
    "cacheDirectory": boolean;
    "babelrc": boolean;
    "extends": string | undefined;
    "presets": (string | {
        "useBuiltIns": string;
        "modules": boolean;
        "corejs": number;
    })[][];
    "plugins": string[];
};
export default generatorBabelConfig;
