import { DriverModel } from "./models";

export type DriverFormData = Omit<
	DriverModel,
	"id" | "images"
>;

export type DriverReportFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	driver: DriverModel | null;
};

export type DriverReport = {
	id: string;
	datetime_iso: string;
	title: string;
	content: string;
	topics: string[];

	driver_id: string;
	driver_name: string;
	driver_surname: string;
};
