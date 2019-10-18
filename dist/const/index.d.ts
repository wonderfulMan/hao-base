export declare const ENTRY_FILE_STAT: string[];
export declare const HTML_PLUGIN_TPL: string[];
export declare const OUT_PUT_PATH = "dist";
export declare const enum COLORS {
    bold = "\u001B[1m%s\u001B[22m",
    italic = "\u001B[3m%s\u001B[23m",
    underline = "\u001B[4m%s\u001B[24m",
    inverse = "\u001B[7m%s\u001B[27m",
    strikethrough = "\u001B[9m%s\u001B[29m",
    white = "\u001B[37m%s\u001B[39m",
    grey = "\u001B[90m%s\u001B[39m",
    black = "\u001B[30m%s\u001B[39m",
    blue = "\u001B[34m%s\u001B[39m",
    cyan = "\u001B[36m%s\u001B[39m",
    green = "\u001B[32m%s\u001B[39m",
    magenta = "\u001B[35m%s\u001B[39m",
    red = "\u001B[31m%s\u001B[39m",
    yellow = "\u001B[33m%s\u001B[39m",
    whiteBG = "\u001B[47m%s\u001B[49m",
    greyBG = "\u001B[49;5;8m%s\u001B[49m",
    blackBG = "\u001B[40m%s\u001B[49m",
    blueBG = "\u001B[44m%s\u001B[49m",
    cyanBG = "\u001B[46m%s\u001B[49m",
    greenBG = "\u001B[42m%s\u001B[49m",
    magentaBG = "\u001B[45m%s\u001B[49m",
    redBG = "\u001B[41m%s\u001B[49m",
    yellowBG = "\u001B[43m%s\u001B[49m"
}
export declare const REG_TEST: {
    styleReg: {
        css: {
            normal: RegExp;
            module: RegExp;
        };
        less: {
            normal: RegExp;
            module: RegExp;
        };
        scss: {
            normal: RegExp;
            module: RegExp;
        };
    };
    jsReg: {
        js: RegExp;
        json: RegExp;
    };
    tsReg: RegExp;
    asseteReg: {
        image: RegExp;
        font: RegExp;
    };
    vueReg: RegExp;
};
export declare const enum MODE {
    BUILD = "build",
    DEV = "dev"
}
