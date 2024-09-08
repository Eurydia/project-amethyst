import { SnakeCaseToCamelCase } from "$types/generics";

//#region Vehicle
export type VehicleModel = {
	id: number;

	license_plate: string;
	vendor: string;
	vehicle_class: string;
	registered_city: string;
};

export type VehicleFormData =
	SnakeCaseToCamelCase<Omit<VehicleModel, "id">>;

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

export type VehicleReportGeneralFormData = {
	datetime: string;
	title: string;
	content: string;
	topics: string[];
	vehicle: VehicleModel;
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

export type VehicleReportInspectionFormData = {
	datetime: string;
	content: string;
	topics: string[];
	vehicle: VehicleModel;

	frontCamera: string;
	overheadFan: string;
	windows: string;
	frame: string;
	seatbelts: string;
	seats: string;
	headlights: string;
	turnSignals: string;
	brakeLight: string;
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
