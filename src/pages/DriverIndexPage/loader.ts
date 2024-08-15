import {
	getDriverAll,
	getVehicleWithId,
} from "$backend/database/get";
import { DriverModel } from "$types/models";
import { LoaderFunction } from "react-router-dom";

export type PreparedDriverData = {
	id: string;
	name: string;
	surname: string;
	contact: string;

	license_plate: string;
};
export type DriverIndexPageLoaderData = {
	driverData: PreparedDriverData[];
};

export const driverIndexPageLoader: LoaderFunction =
	async () => {
		const drivers: DriverModel[] =
			await getDriverAll();

		// Slight optimization: Fetch all vehicle data in parallel
		const driverDataRequets: Promise<PreparedDriverData>[] =
			drivers.map(async (driver) => {
				const vehicle = await getVehicleWithId(
					driver.current_vehicle,
				);

				let license_plate = "";
				if (vehicle !== null) {
					license_plate = vehicle.license_plate;
				}

				return {
					id: driver.id,
					name: driver.name,
					surname: driver.surname,
					contact: driver.contact,
					license_plate,
				};
			});

		const driverData = await Promise.all(
			driverDataRequets,
		);

		const loaderData: DriverIndexPageLoaderData =
			{
				driverData,
			};
		return loaderData;
	};
