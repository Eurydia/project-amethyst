import {
	DriverModel,
	DriverReportModel,
} from "./models";

export type DriverFormData = Omit<
	DriverModel,
	"id" | "images"
>;

export type DriverReportFormData = Omit<
	DriverReportModel,
	"id"
>;
