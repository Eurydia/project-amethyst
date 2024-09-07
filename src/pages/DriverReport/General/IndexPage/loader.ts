import {
	getDriverAll,
	getDriverReportGeneralAll,
	getTopicAll,
} from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import {
	DriverModelImpl,
	DriverReportModelImpl,
} from "$types/impl/Driver";
import { DriverReportEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: DriverReportEntry[];
	driverMultiSelectOptions: MultiSelectOption[];
	topicMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getDriverReportGeneralAll()
		).map(DriverReportModelImpl.toEntry);

		const entries = (
			await Promise.all(reports)
		).filter((entry) => entry !== null);

		const driverMultiSelectOptions = (
			await getDriverAll()
		).map(DriverModelImpl.toMultiSelectOption);

		const topicMultiSelectOptions = (
			await getTopicAll()
		).map((topic) => ({
			label: topic,
			value: topic,
		}));

		const loaderData: IndexPageLoaderData = {
			entries,
			driverMultiSelectOptions,
			topicMultiSelectOptions,
		};
		return loaderData;
	};
