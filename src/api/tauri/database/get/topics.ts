import { tauri } from "@tauri-apps/api";
import { z } from "zod";

export const tauriGetTopicAll = async () => {
  const topics = await tauri.invoke("get_topic_all");
  const r = z.string().array().safeParse(topics);
  return r.success ? r.data : [];
};
