import {
	getTopicAll,
	getVehicleAll,
	getVehicleReportGeneralAll,
} from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import {
	VehicleModelImpl,
	VehicleReportGeneralModelImpl,
} from "$types/impl/Vehicle";
import { VehicleReportGeneralEntry } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: VehicleReportGeneralEntry[];
	topicMultiSelectOptions: MultiSelectOption[];
	vehicleMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getVehicleReportGeneralAll()
		).map(VehicleReportGeneralModelImpl.toEntry);

		const entries = (
			await Promise.all(reports)
		).filter((report) => report !== null);

		const topicMultiSelectOptions: MultiSelectOption[] =
			(await getTopicAll()).map((topic) => ({
				label: topic,
				value: topic,
			}));

		const vehicleMultiSelectOptions = (
			await getVehicleAll()
		).map(VehicleModelImpl.toMultiSelectOption);

		const loaderData: IndexPageLoaderData = {
			entries,
			topicMultiSelectOptions,
			vehicleMultiSelectOptions,
		};
		return loaderData;
	};
