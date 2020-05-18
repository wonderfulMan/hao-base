import * as webpack from 'webpack';

import { BaseConfig } from 'hao-base';
import { build } from './build';
import {server}from './server';
export function compiler(webpackConfig: webpack.Configuration, customConfig: BaseConfig) {
  if (webpackConfig.mode === 'development') {
    server(webpackConfig, customConfig)
  }
  if (webpackConfig.mode === 'production') {
    build(webpackConfig)
  }
}