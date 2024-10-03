/** @format */

import { tauriGetAttendanceLogToday } from "$backend/database/get/attendance-logs";
import { ATTENDANCE_LOG_MODEL_TRANSFORMER } from "$core/transformers/attendance-log-model";
import { AttendanceLogEntry } from "$types/models/attendance-log";
import { LoaderFunction } from "react-router-dom";

export type HomePageLoaderData = {
  logEntries: AttendanceLogEntry[];
};
export const homePageLoader: LoaderFunction = async () => {
  const logs = (await tauriGetAttendanceLogToday()).map(
    ATTENDANCE_LOG_MODEL_TRANSFORMER.toEntry
  );

  const logEntries = (await Promise.all(logs)).filter(
    (entry) => entry !== null
  );

  const loaderData: HomePageLoaderData = {
    logEntries,
  };
  return loaderData;
};
