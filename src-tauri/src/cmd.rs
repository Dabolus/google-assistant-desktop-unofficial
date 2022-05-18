use serde::Serialize;
use tauri::command;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DeviceInfo {
    user_name: String,
    device_languages: Vec<String>,
    device_name: String,
    device_id: String,
    device_platform: String,
}

#[command]
pub fn get_device_info() -> Option<DeviceInfo> {
    let device_info = DeviceInfo {
        user_name: whoami::realname(),
        device_languages: whoami::lang().collect::<Vec<String>>(),
        device_name: whoami::devicename(),
        device_id: whoami::hostname(),
        device_platform: whoami::platform().to_string(),
    };
    Some(device_info)
}

#[command]
pub fn menu_toggle(window: tauri::Window) {
    window.menu_handle().toggle().unwrap();
}
