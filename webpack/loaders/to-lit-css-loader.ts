import loaderUtils from 'loader-utils';
import { loader } from 'webpack';

export default function() {}

export function pitch(this: loader.LoaderContext, remainingRequest: string) {
  this.cacheable && this.cacheable();

  return `
    const {css} = require('lit-element');
    const content = require(${loaderUtils.stringifyRequest(
      this,
      `!!${remainingRequest}`,
    )});
    const str = typeof content === 'string' ? content : content.toString();
    module.exports = css([str]);
  `;
}
