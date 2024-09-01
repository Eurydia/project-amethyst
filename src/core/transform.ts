import {
	DriverReportModel,
	DriverModel,
	DriverReportEntry,
} from "$types/models/Driver";

export const transformDriverReportModelToEntry = (
	model: DriverReportModel,
	driver: DriverModel,
) => {
	const entry: DriverReportEntry = {
		id: model.id,
		datetime: model.datetime,
		title: model.title,
		topics: model.topics
			.split(",")
			.map((topic) => topic.trim())
			.filter((topic) => topic.length > 0),
		driverId: driver.id,
		driverName: driver.name,
		driverSurname: driver.surname,
	};
	return entry;
};
