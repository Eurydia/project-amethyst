//#region Driver
export type DriverModel = {
	id: number;

	name: string;
	surname: string;
	contact: string;
	license_type: string;
};
export type DriverEntry = {
	id: number;
	name: string;
	surname: string;

	vehicles: {
		id: number;
		licensePlate: string;
	}[];

	routes: {
		id: number;
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
	id: number;
	driverId: number;
	driverName: string;
	driverSurname: string;

	datetime: string;
	title: string;
	content: string;
	topics: string[];
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
	driver: DriverModel | null;
};
//#endregion
