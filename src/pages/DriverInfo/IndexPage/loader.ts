import {
	BaseDirectory,
	readDir,
} from "@tauri-apps/api/fs";
import {
	getDriver,
	getDriverGeneralReportAllWithDriverId,
	getDriverMedicalReportAllWithDriverId,
	getOperationLogAllWithDriverId,
} from "$backend/database/get";
import { operationalLogModelToEntry } from "$core/modelToEntry";
import {
	DriverModel,
	DriverReportEntry,
} from "$types/models/Driver";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import {
	json,
	LoaderFunction,
} from "react-router-dom";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { join } from "@tauri-apps/api/path";
import { transformDriverReportModelToEntry } from "$core/transform";

export type IndexPageLoaderData = {
	driver: DriverModel;
	images: string[];
	generalEntries: DriverReportEntry[];
	medicalEntries: DriverReportEntry[];
	logEntries: OperationalLogEntry[];
};

export const getDriverImages = async (
	driverId: string,
) => {
	const driverDir = await join(
		"drivers",
		driverId,
		"images",
	);
	const images = await readDir(driverDir, {
		dir: BaseDirectory.AppData,
	}).then(
		(result) => result,
		() => [],
	);
	const imageRequests = images.map(
		async (image) => convertFileSrc(image.path),
	);

	return await Promise.all(imageRequests);
};

export const indexPageLoader: LoaderFunction =
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
		const generalEntries = (
			await getDriverGeneralReportAllWithDriverId(
				driverId,
			)
		).map((model) =>
			transformDriverReportModelToEntry(
				model,
				driver,
			),
		);
		const medicalEntries = (
			await getDriverMedicalReportAllWithDriverId(
				driverId,
			)
		).map((model) =>
			transformDriverReportModelToEntry(
				model,
				driver,
			),
		);
		const logModels = (
			await getOperationLogAllWithDriverId(
				driver.id,
			)
		).map(operationalLogModelToEntry);

		const logEntries = (
			await Promise.all(logModels)
		).filter((entry) => entry !== null);

		const images = await getDriverImages(
			driverId,
		);

		const loaderData: IndexPageLoaderData = {
			driver,
			images,
			logEntries,
			generalEntries,
			medicalEntries,
		};

		return loaderData;
	};
