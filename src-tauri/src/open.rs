#[tauri::command]
pub fn open_path(_: tauri::AppHandle, path: std::path::PathBuf) -> Result<(), &'static str> {
    match opener::open(&path) {
        Ok(()) => Ok(()),
        Err(_) => Err("Cannot open path"),
    }
}
