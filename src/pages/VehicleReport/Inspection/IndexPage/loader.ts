import {
	getTopicAll,
	getVehicleAll,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import {
	VehicleModelImpl,
	VehicleReportInspectionModelImpl,
} from "$types/impl/Vehicle";
import { VehicleReportInspectionEntry } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: VehicleReportInspectionEntry[];
	topicMultiSelectOptions: MultiSelectOption[];
	vehicleMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const vehicleMultiSelectOptions = (
			await getVehicleAll()
		).map(VehicleModelImpl.toMultiSelectOption);
		const topicMultiSelectOptions: MultiSelectOption[] =
			(await getTopicAll()).map((topic) => ({
				label: topic,
				value: topic,
			}));

		const reports = (
			await getVehicleReportInspectionAll()
		).map(
			VehicleReportInspectionModelImpl.toEntry,
		);

		const entries = (
			await Promise.all(reports)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			vehicleMultiSelectOptions,
			topicMultiSelectOptions,
			entries,
		};
		return loaderData;
	};
