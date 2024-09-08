import {
	getPickupRouteAll,
	getPickupRouteReportGeneralAll,
	getTopicAll,
} from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import {
	PickupRouteModelImpl,
	PickupRouteReportModelImpl,
} from "$types/impl/PickupRoute";
import { PickupRouteReportEntry } from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	reportEntries: PickupRouteReportEntry[];
	routeMultiSelectOptions: MultiSelectOption[];
	topicMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const topicMultiSelectOptions = (
			await getTopicAll()
		).map((topic) => ({
			value: topic,
			label: topic,
		}));

		const routeMultiSelectOptions = (
			await getPickupRouteAll()
		).map(
			PickupRouteModelImpl.toMultiSelectOption,
		);

		const reports = (
			await getPickupRouteReportGeneralAll()
		).map(PickupRouteReportModelImpl.toEntry);

		const reportEntries = (
			await Promise.all(reports)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			reportEntries,
			routeMultiSelectOptions,
			topicMultiSelectOptions,
		};
		return loaderData;
	};
