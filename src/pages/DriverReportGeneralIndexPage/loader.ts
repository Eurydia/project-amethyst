import {
	getDriverAll,
	getDriverGeneralReportAll,
	getDriverWithId,
} from "$backend/database/get";
import { DriverReport } from "$types/form-data";
import { LoaderFunction } from "react-router-dom";

export type DriverReportGeneralIndexPageLoaderData =
	{
		entries: DriverReport[];
		drivers: string[];
	};

export const driverReportGeneralIndexPageLoader: LoaderFunction =
	async () => {
		const rawEntries =
			await getDriverGeneralReportAll();

		console.log(rawEntries);

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

		const drivers = (await getDriverAll()).map(
			(driver) => {
				return `${driver.name} ${driver.surname}`.normalize();
			},
		);

		const loaderData: DriverReportGeneralIndexPageLoaderData =
			{
				entries,
				drivers,
			};
		return loaderData;
	};
