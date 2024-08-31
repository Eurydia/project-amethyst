import {
	getDriverGeneralReportAll,
	getDriverWithId,
} from "$backend/database/get";
import { DriverReport } from "$types/models";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: DriverReport[];
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const rawEntries =
			await getDriverGeneralReportAll();

		const entryRequests: Promise<DriverReport | null>[] =
			rawEntries.map(async (rawEntry) => {
				const driver = await getDriverWithId(
					rawEntry.id,
				);
				if (driver === null) {
					return null;
				}

				const entry: DriverReport = {
					id: rawEntry.id,
					topics: rawEntry.topics.split(","),
					datetime: rawEntry.datetime,
					title: rawEntry.title,
					content: rawEntry.content,
					driver_id: driver.id,
					driver_name: driver.name,
					driver_surname: driver.surname,
				};

				return entry;
			});

		const entries = (
			await Promise.all(entryRequests)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
