import { getDriver } from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	DriverFormData,
	DriverModel,
} from "$types/models/driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
	driver: DriverModel;
	initFormData: DriverFormData;
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.driverId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.driverIdIsMissingFromParams,
				},
			);
		}
		const driverId = Number.parseInt(
			params.driverId,
		);
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.errorDriverIsMissingFromDatabase,
				},
			);
		}
		const initFormData: DriverFormData = {
			contact: driver.contact,
			licenseType: driver.license_type,
			name: driver.name,
			surname: driver.surname,
		};
		const loaderData: EditPageLoaderData = {
			driver,
			initFormData,
		};
		return loaderData;
	};
