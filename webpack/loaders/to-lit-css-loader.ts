import { loader } from 'webpack';

export default function(this: loader.LoaderContext, source: string) {
  this.cacheable && this.cacheable();

  return `
    const {css} = require('lit-element');
    module.exports = css\`${source}\`;
  `;
}
