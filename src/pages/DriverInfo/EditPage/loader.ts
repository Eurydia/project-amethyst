import { getDriver } from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverFormData } from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
	driverId: number;
	initFormData: DriverFormData;
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.driverId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const driverId = Number.parseInt(
			params.driverId,
		);
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{
					message:
						TRANSLATION.driverIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const initFormData: DriverFormData = {
			contact: driver.contact,
			licenseType: driver.license_type,
			name: driver.name,
			surname: driver.surname,
		};
		const loaderData: EditPageLoaderData = {
			driverId,
			initFormData,
		};
		return loaderData;
	};
