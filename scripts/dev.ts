import { spawn } from 'child_process';
import { copy } from 'fs-extra';
import { resolve } from 'path';
import waitOn from 'wait-on';

// Workaround for Windows
// See: https://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
if (process.platform === 'win32') {
  import('readline').then(rl => {
    const int = rl.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    int.on('SIGINT', () => process.emit('SIGINT' as any));
  });
}

// Make sure we are in the project root directory
process.chdir(resolve(__dirname, '..'));

waitOn({ resources: [`http://localhost:${process.env.PORT || '8080'}`] })
  .then(() => copy('./package.json', './node_modules/.build/package.json'))
  .then(() => {
    const child = spawn(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['electron', 'node_modules/.build'],
      {
        detached: true,
        stdio: 'inherit',
      },
    );

    process.on('SIGINT', () => {
      child.kill();
      process.exit(0);
    });
  });
