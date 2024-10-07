import { tauriGetAttendanceLogAll } from "$backend/database/get/attendance-logs";
import { ATTENDANCE_LOG_MODEL_TRANSFORMER } from "$core/transformers/attendance-log";
import { AttendanceLogEntry } from "$types/models/attendance-log";
import { LoaderFunction } from "react-router-dom";

export type AttendanceLogIndexPageLoaderData = {
  logEntries: AttendanceLogEntry[];
};

export const attendanceLogIndexPageLoader: LoaderFunction =
  async () => {
    const logs = (await tauriGetAttendanceLogAll()).map(
      ATTENDANCE_LOG_MODEL_TRANSFORMER.toEntry
    );

    const logEntries = (await Promise.all(logs)).filter(
      (entry) => entry !== null
    );
    const loaderData: AttendanceLogIndexPageLoaderData = {
      logEntries,
    };
    return loaderData;
  };
