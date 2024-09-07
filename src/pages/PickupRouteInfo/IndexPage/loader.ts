import {
	getDriverAll,
	getOperationLogAll,
	getPickupRoute,
	getPickupRouteReportGeneralAll,
	getTopicAll,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { MultiSelectOption } from "$types/generics";
import { DriverModelImpl } from "$types/impl/Driver";
import { OperationalLogModelImpl } from "$types/impl/OperationalLog";
import {
	PickupRouteModelImpl,
	PickupRouteReportModelImpl,
} from "$types/impl/PickupRoute";
import { VehicleModelImpl } from "$types/impl/Vehicle";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import {
	PickupRouteModel,
	PickupRouteReportEntry,
} from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type IndexPageLoaderData = {
	route: PickupRouteModel;

	logEntries: OperationalLogEntry[];
	reportEntries: PickupRouteReportEntry[];

	routeMultiSelectOptions: MultiSelectOption[];
	vehicleMultiSelectOptions: MultiSelectOption[];
	driverMultiSelectOptions: MultiSelectOption[];
	topicMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;
		if (routeId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const route = await getPickupRoute(
			Number.parseInt(routeId),
		);
		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const topicMultiSelectOptions: MultiSelectOption[] =
			(await getTopicAll()).map((topic) => ({
				label: topic,
				value: topic,
			}));

		const logs = (await getOperationLogAll())
			.filter(
				({ route_id }) => route_id === route.id,
			)
			.map(OperationalLogModelImpl.toEntry);

		const reports = (
			await getPickupRouteReportGeneralAll()
		)
			.filter(
				({ route_id }) => route_id === route.id,
			)
			.map(PickupRouteReportModelImpl.toEntry);

		const reportEntries = (
			await Promise.all(reports)
		).filter((report) => report !== null);
		const logEntries = (
			await Promise.all(logs)
		).filter((entry) => entry !== null);

		const vehicleMultiSelectOptions = (
			await getVehicleAll()
		).map(VehicleModelImpl.toMultiSelectOption);
		const driverMultiSelectOptions = (
			await getDriverAll()
		).map(DriverModelImpl.toMultiSelectOption);
		const routeMultiSelectOptions = [
			PickupRouteModelImpl.toMultiSelectOption(
				route,
			),
		];

		const loaderData: IndexPageLoaderData = {
			route,

			logEntries,
			reportEntries,

			driverMultiSelectOptions,
			vehicleMultiSelectOptions,
			routeMultiSelectOptions,
			topicMultiSelectOptions,
		};

		return loaderData;
	};
