import {
	getVehicle,
	getVehicleAll,
} from "$backend/database/get";
import { VehicleFormData } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

const getVendorOptions = async () => {
	const vehicles = await getVehicleAll();
	const vendors = new Set<string>();
	for (const vehicle of vehicles) {
		vendors.add(vehicle.vendor);
	}
	return [...vendors];
};

export type EditPageLoaderData = {
	vehicleId: string;
	initFormData: VehicleFormData;
	vendorOptions: string[];
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		const { vehicleId } = params;
		if (vehicleId === undefined) {
			throw json(
				{ message: "ข้อมูลไม่ครบ" },
				{ status: 400 },
			);
		}
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{ message: "ไม่พบคนขับรถในระบบ" },
				{ status: 404 },
			);
		}
		const initFormData: VehicleFormData = {
			licensePlate: vehicle.license_plate,
			registeredCity: vehicle.registered_city,
			vehicleClass: vehicle.vehicle_class,
			vendor: vehicle.vendor,
		};

		const vendorOptions =
			await getVendorOptions();
		const loaderData: EditPageLoaderData = {
			vehicleId,
			initFormData,
			vendorOptions,
		};
		return loaderData;
	};
