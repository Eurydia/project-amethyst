import {
	json,
	LoaderFunction,
} from "react-router-dom";
import {
	getDriverWithId,
	getTopicAll,
} from "$backend/database/get";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models";
import dayjs from "dayjs";

export type DriverInfoReportGeneralPageLoaderData =
	{
		driver: DriverModel;
		topics: string[];
		initFormData: DriverReportFormData;
	};
export const driverInfoReportGeneralPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;
		if (driverId === undefined) {
			throw json(
				{ message: "ข้อมูลคนขับรถไม่ถูกต้อง" },
				{ status: 400 },
			);
		}

		const driver = await getDriverWithId(
			driverId,
		);
		if (driver === null) {
			throw json(
				{ message: "ไม่พบข้อมูลคนขับรถ" },
				{ status: 404 },
			);
		}
		const topics = await getTopicAll();

		const initFormData: DriverReportFormData = {
			content: "",
			datetime_iso: dayjs().locale("th").format(),
			driver_id: driver.id,
			driver_name: driver.name,
			driver_surname: driver.surname,
			title: "",
			topics: "",
		};
		const loaderData: DriverInfoReportGeneralPageLoaderData =
			{
				initFormData,
				topics,
				driver,
			};

		return loaderData;
	};
