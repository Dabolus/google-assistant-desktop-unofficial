declare module 'webpack-node-externals';
declare module 'electron-watch';

declare module 'script-ext-html-webpack-plugin' {
  import { Plugin } from 'webpack';

  export interface ScriptExtHtmlWebpackPluginConfig {
    defaultAttribute?: string;
  }

  export default class ScriptExtHtmlWebpackPlugin extends Plugin {
    public constructor(options: ScriptExtHtmlWebpackPluginConfig);
  }
}

declare module 'terser-webpack-plugin' {
  import { Plugin } from 'webpack';

  export interface TerserPluginConfiguration {
    cache?: boolean;
    parallel?: boolean;
    extractComments?:
      | boolean
      | 'all'
      | 'some'
      | RegExp
      | ((node: Node, comment: { value: string }) => boolean)
      | {
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
    public constructor(config?: TerserPluginConfiguration);
  }
}

declare module 'electron-devtools-installer' {
  export interface DevTool {
    id: string;
    electron: string;
  }
  export const EMBER_INSPECTOR: DevTool;
  export const REACT_DEVELOPER_TOOLS: DevTool;
  export const BACKBONE_DEBUGGER: DevTool;
  export const JQUERY_DEBUGGER: DevTool;
  export const ANGULARJS_BATARANG: DevTool;
  export const VUEJS_DEVTOOLS: DevTool;
  export const REDUX_DEVTOOLS: DevTool;
  export const REACT_PERF: DevTool;
  export const CYCLEJS_DEVTOOL: DevTool;
  export const MOBX_DEVTOOLS: DevTool;
  export const APOLLO_DEVELOPER_TOOLS: DevTool;
  export default function(devTool: DevTool): Promise<void>;
}

declare module 'electron-redux';
declare module 'html-webpack-plugin';
declare module 'remark-html';
declare module 'remark-external-links';

declare module '*.styles' {
  import { CSSResult } from 'lit-element';

  const content: CSSResult;
  export default content;
}

declare module '@locales/*' {
  import { Catalog } from '@lingui/core';

  const content: Catalog;
  export default content;
}
