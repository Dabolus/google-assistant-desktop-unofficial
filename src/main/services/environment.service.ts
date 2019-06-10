import { injectable } from '@helpers/di.helper';

export type Mode = 'production' | 'development' | 'test';

export type Platform =
  | 'aix'
  | 'android'
  | 'darwin'
  | 'freebsd'
  | 'linux'
  | 'openbsd'
  | 'sunos'
  | 'win32'
  | 'cygwin';

export interface Environment {
  mode: Mode;
  platform: Platform;
  mac: boolean;
}

@injectable()
export class EnvironmentService implements Environment {
  public get mode(): Mode {
    return process.env.NODE_ENV as Mode;
  }

  public get platform(): Platform {
    return process.platform;
  }

  public get mac(): boolean {
    return this.platform === 'darwin';
  }
}
