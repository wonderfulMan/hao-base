declare module 'speed-measure-webpack-plugin' {
  import { Plugin, compilation, Compiler, Configuration } from 'webpack';
  class SpeedMeasureWebpackPlugin extends Plugin {
    constructor(options?: Options);
    apply(compiler: Compiler): void;
    wrap(options: Configuration): Configuration
  }

  type Options = {
    disable?: boolean,
    outputFormat?: string | Function,
    outputTarget?: string | Function,
    pluginNames?: { [key: string]: string },
    granularLoaderData?: boolean
  }

  export = SpeedMeasureWebpackPlugin
}