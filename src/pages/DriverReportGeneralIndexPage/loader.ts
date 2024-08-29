import {
	getDriverAll,
	getDriverGeneralReportAll,
	getDriverWithId,
	getTopicAll,
} from "$backend/database/get";
import { DriverReport } from "$types/models";
import { LoaderFunction } from "react-router-dom";

export type DriverReportGeneralIndexPageLoaderData =
	{
		driverOptions: string[];
		topicOptions: string[];
		entries: DriverReport[];
	};

export const driverReportGeneralIndexPageLoader: LoaderFunction =
	async () => {
		const rawEntries =
			await getDriverGeneralReportAll();

		const seen: Record<
			string,
			{ name: string; surname: string }
		> = {};

		const entries: DriverReport[] = [];

		for (const rawEntry of rawEntries) {
			if (seen[rawEntry.id] === undefined) {
				const driver = await getDriverWithId(
					rawEntry.id,
				);
				if (driver === null) {
					continue;
				}
				seen[rawEntry.id] = {
					name: driver.name,
					surname: driver.surname,
				};
			}

			const entry: DriverReport = {
				...rawEntry,
				topics: rawEntry.topics.split(","),
				driver_name: seen[rawEntry.id].name,
				driver_surname: seen[rawEntry.id].surname,
			};
			entries.push(entry);
		}

		const drivers = await getDriverAll();
		const driverOptions = drivers.map(
			(driver) =>
				`${driver.name} ${driver.surname}`,
		);
		const topicOptions = await getTopicAll();

		const loaderData: DriverReportGeneralIndexPageLoaderData =
			{
				driverOptions,
				topicOptions,
				entries,
			};
		return loaderData;
	};
