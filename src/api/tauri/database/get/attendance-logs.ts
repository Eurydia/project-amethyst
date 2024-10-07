import { attendanceLogModelSchema } from "$types/models/attendance-log";
import { tauri } from "@tauri-apps/api";

export const tauriGetAttendanceLogAll = async () => {
  const data = await tauri.invoke("get_attendance_log_all");
  const r = attendanceLogModelSchema
    .array()
    .safeParse(data);
  return r.success ? r.data : [];
};

export const tauriGetAttendanceLogToday = async () => {
  const logs = await tauri.invoke(
    "get_attendance_log_today"
  );
  const r = attendanceLogModelSchema
    .array()
    .safeParse(logs);
  return r.success ? r.data : [];
};

export const tauriGetAttendanceLog = async (
  logId: number
) => {
  const data = await tauri.invoke("get_attendance_log", {
    logId,
  });
  const r = attendanceLogModelSchema.safeParse(data);
  return r.success ? r.data : null;
};
