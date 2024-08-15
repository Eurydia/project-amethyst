import {
	DriverModel,
	DriverReportModel,
} from "$types/models";
import { Dayjs } from "dayjs";
import { getDriverWithId } from "./get";

export const postDriverReport = async (
	localeDateTime: string,
	title: string,
	content: string,
	driverId: string,
	driverName: string,
	driverSurname: string,
) => {
	return;
};
