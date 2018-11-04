declare module 'script-ext-html-webpack-plugin' {
  import { Plugin } from 'webpack';

  export interface ScriptExtHtmlWebpackPluginConfig {
    defaultAttribute?: string;
  }

  export default class ScriptExtHtmlWebpackPlugin extends Plugin {
    constructor(options: ScriptExtHtmlWebpackPluginConfig);
  }
}

declare module 'terser-webpack-plugin' {
  import { Plugin } from 'webpack';

  export interface TerserPluginConfiguration {
    cache?: boolean;
    parallel?: boolean;
    extractComments?: boolean;
  }

  export default class TerserPlugin extends Plugin {
    constructor(config?: TerserPluginConfiguration);
  }
}
