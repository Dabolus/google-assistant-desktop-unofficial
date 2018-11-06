import '@skatejs/ssr/register';
import { Shell } from './shell.component';

describe('Shell', () => {
  it('tests Web Components!', () => {
    const shell = document.createElement('gad-shell');
    expect(shell).toBeInstanceOf(Shell);
  });
});
