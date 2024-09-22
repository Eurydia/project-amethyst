/** @format */

import { tauri } from "@tauri-apps/api";

export const tauriGetTopicAll = async (): Promise<string[]> =>
	tauri.invoke("get_topic_all");
