import { CssLoaderOptions, BaseConfig } from 'hao-base';
import * as webpack from 'webpack';
export declare function getStyleLoaders(webpackConfig: webpack.Configuration, customConfig: BaseConfig, isModules?: boolean, styleType?: 'less' | 'scss' | 'css'): ({
    loader: string;
    options?: undefined;
} | {
    loader: string;
    options: CssLoaderOptions;
} | {
    loader: string;
    options: {
        plugins: (loader: any) => void;
        resources?: undefined;
    };
} | {
    loader: string;
    options: {
        resources: string[];
        plugins?: undefined;
    };
})[];
