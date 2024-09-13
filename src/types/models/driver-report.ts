import { DriverModel } from "./driver";

export type DriverReportModel = {
	id: number;
	driver_id: number;

	datetime: string;
	title: string;
	content: string;
	topics: string;
};
export type DriverReportEntry = {
	id: number;
	datetime: string;
	title: string;
	topics: string[];

	driverId: number;
	driverName: string;
	driverSurname: string;
};
export type DriverReportFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	driver: DriverModel;
};
