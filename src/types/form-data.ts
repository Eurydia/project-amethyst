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
