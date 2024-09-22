/** @format */

import { AttendanceLogModel } from "$types/models/attendance-log";
import { tauri } from "@tauri-apps/api";

export const tauriGetAttendanceLogAll = async (): Promise<
	AttendanceLogModel[]
> => tauri.invoke("get_attendance_log_all");

export const tauriGetAttendanceLogToday = async (): Promise<
	AttendanceLogModel[]
> => tauri.invoke("get_attendance_log_today");
