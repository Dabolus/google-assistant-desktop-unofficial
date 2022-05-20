import 'urlpattern-polyfill';
import './components/shell';

import { getDeviceInfo } from './communication';

getDeviceInfo().then(console.log);
