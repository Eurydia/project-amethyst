//#region Vehicle
export type VehicleModel = {
	id: string;

	license_plate: string;
	vendor: string;
	vehicle_class: string;
	registered_city: string;
};

export type Vehicle = {
	id: string;
	licensePlate: string;
	registeredCity: string;
	vehicleClass: string;
	vendor: string;
	images: string[];
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
	id: string;
	datetime: string;
	title: string;
	content: string;
	topics: string;

	vehicle_id: string;
};

export type VehicleReportGeneral = {
	id: string;
	datetime: string;
	title: string;
	content: string;
	topics: string[];

	vehicleId: string;
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
	id: string;
	datetime: string;
	title: string;
	topics: string[];

	vehicleId: string;
	vehicleLicensePlate: string;
};
//#endregion

//#region Inspection Reports
export type VehicleReportInspectionModel = {
	inspection_round_number: string;
	id: string;
	datetime: string;
	front_camera: string;
	fan_overhead: string;
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

	content: string;
	topics: string;

	vehicle_id: string;
};

export type VehicleReportInspection = {
	id: string;
	datetime: string;
	content: string;
	topics: string[];
	vehicleId: string;
	vehicleLicensePlate: string;

	cameraFrontCam: string;
	fanOverhead: string;
	bodyWindow: string;
	bodyFrame: string;
	seatSeatbelts: string;
	seatSeats: string;
	lightHeadlights: string;
	lightTurnSignals: string;
	lightBrakeLight: string;
	mirrorRearview: string;
	mirrorSideview: string;
	tires: string;
};

export type VehicleReportInspectionFormData = {
	datetime: string;
	content: string;
	topics: string[];
	vehicle: VehicleModel;

	cameraFrontCam: string;
	fanOverhead: string;
	bodyWindow: string;
	bodyFrame: string;
	seatSeatbelts: string;
	seatSeats: string;
	lightHeadlights: string;
	lightTurnSignals: string;
	lightBrakeLight: string;
	mirrorRearview: string;
	mirrorSideview: string;
	tires: string;
};

export type VehicleReportInspectionEntry = {
	id: string;
	inspectionRoundNumber: string;
	datetime: string;
	topics: string[];
	vehicleId: string;
	vehicleLicensePlate: string;
};
//#endregion
