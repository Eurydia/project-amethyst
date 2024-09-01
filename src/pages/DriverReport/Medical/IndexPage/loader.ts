import {
	getDriverGeneralReportAll,
	getDriver,
} from "$backend/database/get";
import { transformDriverReportModelToEntry } from "$core/transform";
import { DriverReportEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: DriverReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const models =
			await getDriverGeneralReportAll();
		const entryRequests = models.map(
			async (model) => {
				const driver = await getDriver(model.id);
				if (driver === null) {
					return null;
				}
				return transformDriverReportModelToEntry(
					model,
					driver,
				);
			},
		);
		const entries = (
			await Promise.all(entryRequests)
		).filter((entry) => entry !== null);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
