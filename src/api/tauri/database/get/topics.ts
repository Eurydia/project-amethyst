import { tauri } from "@tauri-apps/api";

export const getTopicAll = async (): Promise<string[]> =>
  tauri.invoke("get_topic_all");
