import { BaseConfig } from 'hao-base';
import * as webpack from 'webpack';
export declare function getStyleLoaders(webpackConfig: webpack.Configuration, customConfig: BaseConfig, isModules?: boolean, styleType?: 'less' | 'scss' | 'css', postcssConfig?: any): ({
    loader: string;
    options: any;
} | {
    loader: string;
    options?: undefined;
})[];
