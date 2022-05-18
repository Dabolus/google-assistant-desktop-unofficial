import './hello-world.element';

import { getDeviceInfo } from './communication';

getDeviceInfo().then(console.log);
