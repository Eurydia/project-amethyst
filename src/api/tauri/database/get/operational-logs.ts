import { operationalLogModelSchema } from "$types/models/operational-log";
import { tauri } from "@tauri-apps/api";

export const tauriGetOperationalLogAll = async () => {
  const logs = await tauri.invoke(
    "get_operational_log_all"
  );
  const r = operationalLogModelSchema
    .array()
    .safeParse(logs);
  return r.success ? r.data : [];
};

export const tauriGetOperationalLogToday = async () => {
  const logs = await tauri.invoke(
    "get_operational_log_today"
  );
  const r = operationalLogModelSchema
    .array()
    .safeParse(logs);
  return r.success ? r.data : [];
};

export const tauriGetOperationalLog = async (
  log_id: number
) => {
  const log = await tauri.invoke("get_operational_log", {
    log_id,
  });
  const r = operationalLogModelSchema.safeParse(log);
  return r.success ? r.data : null;
};
