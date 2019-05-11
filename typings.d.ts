declare module 'webpack-node-externals';
declare module 'electron-watch';

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
    extractComments?: boolean | 'all' | 'some' | RegExp | ((node: Node, comment: any) => boolean) | {
      condition: RegExp;
      filename(file: string): string;
      banner(licenseFile: string): string;
    };
    terserOptions?: {
      compress?: {
        drop_console?: boolean;
      };
    };
  }

  export default class TerserPlugin extends Plugin {
    constructor(config?: TerserPluginConfiguration);
  }
}

declare module 'electron-devtools-installer' {
  export const EMBER_INSPECTOR: any;
  export const REACT_DEVELOPER_TOOLS: any;
  export const BACKBONE_DEBUGGER: any;
  export const JQUERY_DEBUGGER: any;
  export const ANGULARJS_BATARANG: any;
  export const VUEJS_DEVTOOLS: any;
  export const REDUX_DEVTOOLS: any;
  export const REACT_PERF: any;
  export const CYCLEJS_DEVTOOL: any;
  export const MOBX_DEVTOOLS: any;
  export const APOLLO_DEVELOPER_TOOLS: any;
  export default function (devTool: any): Promise<any>;
}

declare module 'electron-redux';

declare module '*.styles' {
  import { CSSResult } from 'lit-element';

  const content: CSSResult;
  export default content;
}
