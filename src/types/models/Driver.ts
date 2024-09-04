//#region Driver
export type DriverModel = {
	id: number;

	name: string;
	surname: string;
	contact: string;
	license_type: string;
};
export type DriverEntry = {
	id: string;
	name: string;
	surname: string;

	vehicles: {
		id: string;
		licensePlate: string;
	}[];

	routes: {
		id: string;
		name: string;
	}[];
};
export type DriverFormData = {
	name: string;
	surname: string;
	contact: string;
	licenseType: string;
};
//#endregion

//#region Generic Report
export type DriverReportModel = {
	id: number;
	driver_id: number;

	datetime: string;
	title: string;
	content: string;
	topics: string;
};
export type DriverReport = {
	id: string;
	driverId: string;
	driverName: string;
	driverSurname: string;

	datetime: string;
	title: string;
	content: string;
	topics: string[];
};
export type DriverReportEntry = {
	id: string;
	datetime: string;
	title: string;
	topics: string[];

	driverId: string;
	driverName: string;
	driverSurname: string;
};
export type DriverReportFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	driver: DriverModel | null;
};
//#endregion
