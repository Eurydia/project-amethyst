import { invoke } from "@tauri-apps/api/tauri";

export const openDir = async (dirPath: string) =>
	invoke("open_dir", { dirPath });

export const openFile = async (
	filePath: string,
) => invoke("open_file", { filePath });
