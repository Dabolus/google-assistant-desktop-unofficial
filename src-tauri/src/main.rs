#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod cmd;

use tauri::Builder;

// Include the `google` module, which is generated from Google protobuf definitions
pub mod google {
    pub mod api {
        include!(concat!(env!("OUT_DIR"), "/google.api.rs"));
    }

    pub mod r#type {
        include!(concat!(env!("OUT_DIR"), "/google.r#type.rs"));
    }

    pub mod assistant {
        pub mod embedded {
            pub mod v1alpha2 {
                include!(concat!(
                    env!("OUT_DIR"),
                    "/google.assistant.embedded.v1alpha2.rs"
                ));
            }
        }
    }
}

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmd::get_device_info,
            cmd::menu_toggle,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
