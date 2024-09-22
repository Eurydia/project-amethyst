/** @format */

import { OperationalLogModel } from "$types/models/operational-log";
import { tauri } from "@tauri-apps/api";

export const tauriGetOperationLogAll = async (): Promise<
	OperationalLogModel[]
> => tauri.invoke("get_operational_log_all");

export const tauriGetOperationLogToday = async (): Promise<
	OperationalLogModel[]
> => tauri.invoke("get_operational_log_today");
