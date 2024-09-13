import { VehicleModel } from "./vehicle";

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
