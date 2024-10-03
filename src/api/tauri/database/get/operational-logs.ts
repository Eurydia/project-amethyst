import { operationalLogModelSchema } from "$types/models/operational-log";
import { tauri } from "@tauri-apps/api";

export const tauriGetOperationLogAll = async () => {
  const logs = await tauri.invoke(
    "get_operational_log_all"
  );
  const r = operationalLogModelSchema
    .array()
    .safeParse(logs);
  return r.success ? r.data : [];
};

export const tauriGetOperationLogToday = async () => {
  const logs = await tauri.invoke(
    "get_operational_log_today"
  );
  const r = operationalLogModelSchema
    .array()
    .safeParse(logs);
  return r.success ? r.data : [];
};
