import { AttendanceLogModel } from "$types/models/attendance-log";
import { tauri } from "@tauri-apps/api";

export const getAttendanceLogAll = async (): Promise<AttendanceLogModel[]> =>
  tauri.invoke("get_attendance_log_all");

export const getAttendanceLogToday = async (): Promise<AttendanceLogModel[]> =>
  tauri.invoke("get_attendance_log_today");
