#[tauri::command(rename_all = "camelCase")]
pub fn open_dir(_: tauri::AppHandle, dir_path: String) -> Result<(), &'static str> {
    match std::path::Path::new(&dir_path).try_exists() {
        Ok(true) => (),
        Ok(false) => match std::fs::create_dir_all(&dir_path) {
            Ok(()) => (),
            Err(_) => return Err("Cannot create path"),
        },
        Err(_) => return Err("Cannot open path"),
    }

    match opener::open(dir_path) {
        Ok(()) => Ok(()),
        Err(_) => Err("Cannot open path"),
    }
}

#[tauri::command(rename_all = "camelCase")]
pub fn open_file(_: tauri::AppHandle, file_path: String) -> Result<(), &'static str> {
    match opener::open(file_path) {
        Ok(()) => Ok(()),
        Err(_) => Err("Cannot open path"),
    }
}
