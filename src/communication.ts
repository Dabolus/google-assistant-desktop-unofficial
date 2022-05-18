import { invoke } from '@tauri-apps/api';

export interface DeviceInfo {
  userName: string;
  deviceLanguages: string[];
  deviceName: string;
  deviceId: string;
  devicePlatform: string;
}

export const getDeviceInfo = async (): Promise<DeviceInfo> =>
  invoke('get_device_info');
