import { getDriver } from "$backend/database/get";
import { DriverFormData } from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
	driverId: string;
	initFormData: DriverFormData;
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;

		if (driverId === undefined) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing driverId in params)",
				},
				{ status: 400 },
			);
		}
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{
					message:
						"ไม่พบข้อมูลคนขับที่ต้องการฐานข้อมูล (Cannot find driver with given ID)",
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
