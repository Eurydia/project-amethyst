//#region Vehicle
export type VehicleModel = {
	id: number;

	license_plate: string;
	vendor: string;
	vehicle_class: string;
	registered_city: string;
};

export type Vehicle = {
	id: number;

	licensePlate: string;
	registeredCity: string;
	vehicleClass: string;
	vendor: string;
};

export type VehicleEntry = {
	id: number;
	licensePlate: string;

	drivers: {
		id: number;
		name: string;
		surname: string;
	}[];

	routes: {
		id: number;
		name: string;
	}[];
};

export type VehicleFormData = {
	licensePlate: string;
	vendor: string;
	vehicleClass: string;
	registeredCity: string;
};
//#endregion

//#region General Report
export type VehicleReportGeneralModel = {
	id: number;
	datetime: string;
	title: string;
	content: string;
	topics: string;

	vehicle_id: number;
};

export type VehicleReportGeneral = {
	id: number;
	datetime: string;
	title: string;
	content: string;
	topics: string[];

	vehicleId: number;
	vehicleLicensePlate: string;
};

export type VehicleReportGeneralFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	vehicle: VehicleModel | null;
};

export type VehicleReportGeneralEntry = {
	id: number;
	datetime: string;
	title: string;
	topics: string[];

	vehicleId: number;
	vehicleLicensePlate: string;
};
//#endregion

//#region Inspection Reports
export type VehicleReportInspectionModel = {
	id: number;
	vehicle_id: number;
	datetime: string;
	content: string;
	topics: string;

	front_camera: string;
	overhead_fan: string;
	windows: string;
	seatbelts: string;
	seats: string;
	headlights: string;
	turn_signals: string;
	brake_light: string;
	frame: string;
	rearview_mirror: string;
	sideview_mirror: string;
	tires: string;
};

export type VehicleReportInspection = {
	id: number;
	datetime: string;
	content: string;
	topics: string[];
	vehicleId: number;
	vehicleLicensePlate: string;
	inspectionRoundNumber: string;

	frontCamera: string;
	overheadFan: string;
	windows: string;
	frame: string;
	seatbelts: string;
	seats: string;
	headlights: string;
	turnSignals: string;
	brakeLights: string;
	rearviewMirror: string;
	sideviewMirror: string;
	tires: string;
};

export type VehicleReportInspectionFormData = {
	datetime: string;
	content: string;
	topics: string[];
	vehicle: VehicleModel | null;

	frontCamera: string;
	overheadFan: string;
	windows: string;
	frame: string;
	seatbelts: string;
	seats: string;
	headlights: string;
	turnSignals: string;
	brakeLights: string;
	rearviewMirror: string;
	sideviewMirror: string;
	tires: string;
};

export type VehicleReportInspectionEntry = {
	id: number;
	inspectionRoundNumber: number;
	vehicleId: number;

	datetime: string;
	topics: string[];
	vehicleLicensePlate: string;
};
//#endregion
