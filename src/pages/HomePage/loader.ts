import { getAttendanceLogToday } from "$backend/database/get";
import { AttendanceLogModelImpl } from "$types/impl/AttendanceLog";
import { AttendanceLogEntry } from "$types/models/AttendanceLog";
import { LoaderFunction } from "react-router-dom";

export type HomePageLoaderData = {
	logEntries: AttendanceLogEntry[];
};
export const homePageLoader: LoaderFunction =
	async () => {
		const logs = (
			await getAttendanceLogToday()
		).map(AttendanceLogModelImpl.toEntry);

		const logEntries = (
			await Promise.all(logs)
		).filter((entry) => entry !== null);

		const loaderData: HomePageLoaderData = {
			logEntries,
		};
		return loaderData;
	};
